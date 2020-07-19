  $(function() {
    $('.love').click(function() {
      $(this).parents('div').find('#saved,.love').toggleClass( "press", 1000 );
    });
  });