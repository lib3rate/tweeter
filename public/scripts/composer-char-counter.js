$(document).ready(function() {

  // Updating the remaining character count for the new tweet

  $('#tweet-text').on('keyup', function() {

    let charactersRemaining = 140 - this.value.length;
    let characterCounter = $(this).closest('form').find('.counter')[0];
    
    $(characterCounter).val(charactersRemaining);
    
    if ($(characterCounter).val() < 0) {
      $(characterCounter).addClass('negative');
    }
    if ($(characterCounter).val() >= 0) {
      $(characterCounter).removeClass('negative');
    }
    
  })

});