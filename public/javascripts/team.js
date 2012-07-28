jQuery.noConflict();

jQuery(document).ready(function($) {

    current_member = window.location.pathname.split('/')[2];

    $("a.current").each(function(){
      $(this).removeClass("current");
    });

    $("#nav-" + current_member).addClass("current");
});
