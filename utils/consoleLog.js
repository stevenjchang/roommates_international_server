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

// error can be 'string' or error object
exports.logError = (fileName, error) => {
  const errorMessage = typeof error === "string" ? error : error.message;
  const shortFileName = fileName.slice(
    fileName.nthLastIndexOf("/", 2),
    fileName.length
  );
  console.log(
    "\n",
    "*** Error in:",
    shortFileName,
    "*** Error message:",
    errorMessage,
    "\n"
  );
};
