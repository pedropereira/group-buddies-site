jQuery.noConflict();

jQuery(document).ready(function($) {

  var the_team = {
    current_member: "andre",

    set_current_class: function(name){
      $("a.current").each(function(){
        $(this).removeClass("current");
      });

      $("#nav-"+name).addClass("current");
      the_team.current_member = name;
    },

    nav_click: function(){
      $("nav").on("click","a",function(event){
        var section_id = $(this).attr("id").replace("nav-","");

        if(section_id != 'home') {
          $("#"+the_team.current_member).fadeOut(600);
          $("#"+section_id).fadeIn(600);
        }
        else { window.location("/"); }

        the_team.set_current_class(section_id);
        event.preventDefault();
      });
    },

    arrow_click: function() {
      $(".arrow").on("click",function(event){
        if($(this).hasClass("left")) {
          var section_id = $(this).parent().parent().prev().attr("id");
        }
        else if($(this).hasClass("right")) {
          var section_id = $(this).parent().parent().next().attr("id");
        }

        $("#"+the_team.current_member).fadeOut(600);
        $("#"+section_id).stop().fadeIn(600);

        the_team.set_current_class(section_id);
        event.preventDefault();
      });
    },

    init: function(){
      the_team.set_current_class(the_team.current_member);
      the_team.nav_click();
      the_team.arrow_click();
    }
  };

  the_team.init();
});
