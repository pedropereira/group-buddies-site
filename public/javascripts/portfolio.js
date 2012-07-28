jQuery.noConflict();

jQuery(document).ready(function($) {

    current_project = window.location.pathname.split('/')[2];

    $("a.current").each(function(){
      $(this).removeClass("current");
    });

    $("#nav-" + current_project).addClass("current");
});