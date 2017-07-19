$(document).ready(function(){
  var name = $('.prof-image').text();
  console.log("getting called");
  var intials = $('.prof-image').text().charAt(0);
  $('.prof-image').text(intials);
});