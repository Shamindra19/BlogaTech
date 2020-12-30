//jshint esversion:6
//module.exports is replaced by exports
exports.getdate=function()
{
var today = new Date()
var options = {weekday: "long",day: "numeric",month: "long",year: "numeric"}
var day = today.toLocaleDateString("en-US", options)
//var time = today.toLocaleTimeString()
return day
}
exports.gettime=function()
{
  var today = new Date()
  var time = today.toLocaleTimeString()
  return time
}
console.log(module.exports);
