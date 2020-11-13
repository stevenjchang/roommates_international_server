String.prototype.nthLastIndexOf = function (searchString, n) {
  var url = this;
  if (url === null) {
    return -1;
  }
  if (!n || isNaN(n) || n <= 1) {
    return url.lastIndexOf(searchString);
  }
  n--;
  return url.lastIndexOf(searchString, url.nthLastIndexOf(searchString, n) - 1);
};

exports.logError = (fileName, error) => {
  const shortFileName = fileName.slice(
    fileName.nthLastIndexOf("/", 2),
    fileName.length
  );
  console.log("*** Error in:", shortFileName);
  console.log("*** Error message:", error.message);
};
