const Request = function(url) {
  this.url = url;
};

Request.prototype.get = function (callback) {
  fetch(url)
  .then(response => response.json()
    .then(data => callback(data)))
  .catch(err => console.error(err));
};

module.exports = Request;
