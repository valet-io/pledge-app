exports.encodeBrackets = function (string) {
  return string
    .replace(/\[/g, encodeURIComponent('['))
    .replace(/\]/g, encodeURIComponent(']'));
};
