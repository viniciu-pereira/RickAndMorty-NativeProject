export const extractLastPartAfterSlash = (url) => {
  const regex = /([^/]*)$/;
  const match = regex.exec(url);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}