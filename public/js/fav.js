// $("#favbut").click(function (event) {
  
// });

$('.love').click(function () {
  event.preventDefault();
  $(this).closest('div').find('#saved,.love').toggleClass("press", 1000);
});