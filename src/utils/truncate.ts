function truncateText(text: string, length: number = 1000, suffix: string = "<...>") {
  if (text.length > length) return `${text.substring(0, length)} ${suffix}`;
  return text;
}

export default truncateText;
