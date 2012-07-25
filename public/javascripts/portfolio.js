jQuery.noConflict();

jQuery(document).ready(function($) {

  var portfolio = {
    current_project: window.location.search.slice(6) || "cbfp",

    set_current_class: function(title){
      $('a.current').each(function(){
        $(this).removeClass('current');
      });

      $('#nav-' + title).addClass('current');
      portfolio.current_project = title;
    },

    pop_state: function(){
      $(window).bind('popstate', function(event){
        if(event.originalEvent.state)
        {
          $('#' + portfolio.current_project).fadeOut(600);
          $('#' + event.originalEvent.state.previous).fadeIn(600);
          portfolio.set_current_class(event.originalEvent.state.previous);
        }
      });
    },

    nav_click: function(){
      $('nav').on('click', 'a', function(event) {
        var section_id = $(this).attr('id').replace('nav-', '');

        if(section_id != 'home') {
          $('#' + portfolio.current_project).fadeOut(600);
          $('#' + section_id).fadeIn(600);
          window.history.pushState({previous: section_id},"","/portfolio?name="+section_id);
        }
        else { window.location('/'); }

        portfolio.set_current_class(section_id);
        event.preventDefault();
      });
    },

    init: function() {
      portfolio.set_current_class(portfolio.current_project);
      portfolio.nav_click();
      portfolio.pop_state();
    }
  };

  portfolio.init();
});
