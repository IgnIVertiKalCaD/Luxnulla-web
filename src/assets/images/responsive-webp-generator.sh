set -Eeuo pipefail
trap 'echo "[ERROR] $(basename "$0") failed at line $LINENO." >&2' ERR

# ---------- helpers ----------
log() { printf "[%s] %s\n" "$(date +%H:%M:%S)" "$*"; }
usage() {
  cat >&2 <<EOF
Usage: $(basename "$0") <input_path> ["320 640 960 1280 1920"] [quality]

  input_path – файл изображения или директория (обязательно)
  widths     – список целевых ширин (опционально, по умолчанию 320 640 960 1280 1920)
  quality    – целое 0‑100, качество WebP (опционально, по умолчанию 85)

Скрипт удалит все файлы вида *-<width>w.webp, если <width> не присутствует в
текущем списке WIDTHS.
EOF
  exit 1
}

# ---------- defaults ----------
DEFAULT_WIDTHS=(320 640 960 1280 1920)
QUALITY=85

# ---------- parse args ----------
[[ $# -lt 1 || $1 == "-h" || $1 == "--help" ]] && usage
INPUT_PATH="$1"; shift || true

WIDTHS=("${DEFAULT_WIDTHS[@]}")
if [[ ${1:-} ]]; then
  IFS=', ' read -r -a WIDTHS <<< "$1"
  shift || true
fi

if [[ ${1:-} ]]; then
  QUALITY="$1"
fi

# ---------- validate args ----------
if ! [[ "$QUALITY" =~ ^[0-9]{1,3}$ ]] || (( QUALITY < 0 || QUALITY > 100 )); then
  echo "Quality must be integer 0‑100 (got $QUALITY)" >&2; exit 1; fi
for w in "${WIDTHS[@]}"; do
  if ! [[ "$w" =~ ^[0-9]+$ ]] || (( w <= 0 )); then
    echo "Width values must be positive integers (got $w)" >&2; exit 1; fi
done

# ---------- choose ImageMagick command ----------
if command -v magick >/dev/null 2>&1; then
  IM_CMD=(magick)
  FORMAT_CMD=(magick identify -list format)
else
  IM_CMD=(convert)
  FORMAT_CMD=(convert -list format)
fi
log "Using ImageMagick command: ${IM_CMD[*]}" >&2

# ---------- check WebP support ----------
if ! ${FORMAT_CMD[@]} | grep -qi ' WEBP '; then
  echo "ImageMagick собран без поддержки WebP. Проверьте, что nix-shell тянет imagemagickBig и libwebp." >&2; exit 1; fi

# ---------- core function ----------
process_file() {
  local file="$1"
  local dir="$(dirname "$file")"
  local base="$(basename "$file")"
  local name="${base%.*}"

  # skip already‑generated derivative files (…‑<w>w.webp)
  if [[ "$name" =~ -[0-9]+w$ ]]; then
    log "skip  $file (derived)" >&2
    return
  fi

  # --- cleanup old derivatives not in WIDTHS ---
  shopt -s nullglob
  for old in "${dir}/${name}-"*w.webp; do
    [[ -e "$old" ]] || continue
    local old_w=${old##*-}
    old_w=${old_w%w.webp}
    if [[ ! " ${WIDTHS[*]} " =~ " ${old_w} " ]]; then
      log "rm    $old" >&2
      rm -f -- "$old"
    fi
  done
  shopt -u nullglob

  # --- generate requested widths ---
  for w in "${WIDTHS[@]}"; do
    local out="${dir}/${name}-${w}w.webp"
    if [[ -f "$out" && "$out" -nt "$file" ]]; then
      log "skip  $file (up‑to‑date ${w}w)" >&2
      continue
    fi
    log "make  $file → ${out}" >&2
    if ! ${IM_CMD[@]} "$file" -auto-orient -resize "${w}x" -quality "$QUALITY" "$out"; then
      echo "Error converting $file to ${w}px" >&2
    fi
  done
}
export -f process_file
export QUALITY
export WIDTHS
export IM_CMD

# ---------- find expression ----------
ext_arr=( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.tif' -o -iname '*.tiff' -o -iname '*.webp' )

# ---------- dispatch ----------
if [[ -f "$INPUT_PATH" ]]; then
  process_file "$INPUT_PATH"
elif [[ -d "$INPUT_PATH" ]]; then
  if command -v parallel >/dev/null 2>&1; then
    find "$INPUT_PATH" -type f \( "${ext_arr[@]}" \) -print0 | parallel --null process_file {}
  else
    log "GNU parallel not found – processing sequentially" >&2
    while IFS= read -r -d '' img; do
      process_file "$img"
    done < <(find "$INPUT_PATH" -type f \( "${ext_arr[@]}" \) -print0)
  fi
else
  echo "Error: '$INPUT_PATH' is not a file or directory" >&2; exit 1
fi

log "Done."
