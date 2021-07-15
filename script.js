$(window).on('load', function() {
    $(".load").fadeOut('slow')
})

$(document).ready(function() {
    $('.togge-button').click(function(event) {
        $('nav ul').slideToggle()
    });
});