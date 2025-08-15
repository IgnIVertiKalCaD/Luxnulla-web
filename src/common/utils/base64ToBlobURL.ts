import {Buffer} from 'buffer'

export function base64ToBlobURL(base64: string) {
  const blob = new Blob([Buffer.from(base64, 'base64')]);
  return URL.createObjectURL(blob)
}
