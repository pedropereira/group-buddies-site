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

        $("#"+the_team.current_member).fadeOut(1000);
        $("#"+section_id).fadeIn(1000);

        the_team.set_current_class(section_id);
        event.preventDefault();
      });
    },

    init: function(){
      the_team.set_current_class(the_team.current_member);
      the_team.nav_click();
    }
  };

  the_team.init();

});