module.exports = {
  parseJSON: function(str) {
    try {
      return JSON.parse(str);
    }
    catch (e) {
      console.log(`Error parsing json: ${e}`);
    }
  }
}
