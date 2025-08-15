#!/bin/bash

# Определение переменных
input_dir="$1"
output_dir="$2"

# Проверка наличия аргументов
if [ -z "$input_dir" ] || [ -z "$output_dir" ]; then
  echo "Использование: $0 <исходный_каталог> <каталог_вывода>"
  echo "Пример: $0 ~/media ~/optimized_media"
  exit 1
fi

# Создание выходного каталога, если он не существует
mkdir -p "$output_dir"

# Функция для оптимизации изображений
optimize_image() {
  local input_file="$1"
  local output_file="$2"
  local filename=$(basename "$input_file")
  local extension="${filename##*.}"
  local name="${filename%.*}"

  case "$extension" in
    png)
      echo "Оптимизация PNG: $input_file -> $output_file"
      optipng "$input_file" -out "$output_file"
      ;;
    jpg|jpeg)
      echo "Оптимизация JPEG: $input_file -> $output_file"
      jpegoptim --strip-all "$input_file" --outfile="$output_file"
      ;;
    svg)
      echo "Оптимизация SVG: $input_file -> $output_file"
      svgo "$input_file" -o "$output_file"
      ;;
    gif|png|jpg|jpeg)
      # Конвертация в WebP
      echo "Конвертация в WebP: $input_file -> $output_file.webp"
      cwebp -q 80 "$input_file" -o "$output_file.webp" 2>/dev/null
      ;;
    *)
      echo "Пропускаем изображение: $input_file (неподдерживаемый формат: $extension)"
      ;;
  esac
}

# Функция для оптимизации аудио
optimize_audio() {
  local input_file="$1"
  local output_file="$2"
  local filename=$(basename "$input_file")
  local extension="${filename##*.}"
  local name="${filename%.*}"

  case "$extension" in
    mp3)
      echo "Оптимизация MP3: $input_file -> $output_file"
      ffmpeg -i "$input_file" -map 0:a -b:a 192k "$output_file" 2>/dev/null
      ;;
    wav|flac)
      echo "Конвертация в Opus: $input_file -> $output_file.opus"
      opusenc --bitrate 128 "$input_file" "$output_file.opus" 2>/dev/null
      ;;
    ogg)
      echo "Оптимизация OGG: $input_file -> $output_file"
      ffmpeg -i "$input_file" -map 0:a -b:a 128k "$output_file" 2>/dev/null
      ;;
    *)
      echo "Пропускаем аудио: $input_file (неподдерживаемый формат: $extension)"
      ;;
  esac
}

# Функция для оптимизации видео
optimize_video() {
  local input_file="$1"
  local output_file="$2"
  local filename=$(basename "$input_file")
  local extension="${filename##*.}"
  local name="${filename%.*}"

  case "$extension" in
    mp4|mkv|webm|avi|mov)
      echo "Оптимизация видео: $input_file -> $output_file.mp4"
      ffmpeg -i "$input_file" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart "$output_file.mp4" 2>/dev/null
      ;;
    *)
      echo "Пропускаем видео: $input_file (неподдерживаемый формат: $extension)"
      ;;
  esac
}

# Запуск nix-shell с необходимыми пакетами
nix-shell -p optipng jpegoptim libwebp svgo ffmpeg opusenc --command "
  find \"$input_dir\" -type f -print0 | while IFS= read -r -d $'\0' file; do
    relative_path=\"\${file#\"\$input_dir\"}\"
    output_file_base=\"\$output_dir\${relative_path}\"
    output_dir_for_file=\"\$(dirname \"\$output_file_base\")\"
    mkdir -p \"\$output_dir_for_file\"

    mime_type=\"\$(file -ib \"\$file\")\"
    extension=\"\${file##*.}\"

    case \"\$mime_type\" in
      image/*)
        # Для изображений PNG, JPG, JPEG, SVG оптимизируем, остальные конвертируем в WebP
        case \"\$extension\" in
          png|jpg|jpeg|svg)
            optimize_image \"\$file\" \"\$output_file_base\"
            ;;
          *)
            # Конвертируем в WebP для других форматов (например, GIF)
            echo \"Конвертация в WebP: \$file -> \$output_file_base.webp\"
            cwebp -q 80 \"\$file\" -o \"\$output_file_base.webp\" 2>/dev/null
            ;;
        esac
        ;;
      audio/*)
        optimize_audio \"\$file\" \"\$output_file_base\"
        ;;
      video/*)
        optimize_video \"\$file\" \"\$output_file_base\"
        ;;
      *)
        echo \"Пропускаем файл: \$file (неизвестный тип)\"
        ;;
    esac
  done

  echo \"Обработка завершена.\"
"
