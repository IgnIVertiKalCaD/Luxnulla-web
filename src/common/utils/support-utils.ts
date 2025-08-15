import configs from "@/common/configs";

export function copyIPAddressToClipboard() {
  navigator.clipboard.writeText(configs.ip_address_game_server).then((r) => r);
}

export function customRound(number: number) {
  if (Number.isInteger(number)) {
    return number;
  } else {
    return Math.round(number * 10) / 10;
  }
}
