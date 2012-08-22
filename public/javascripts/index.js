jQuery.noConflict();

jQuery(document).ready(function($) {

  // Newsletter
  $('.subscribe-to-us').on('click', 'button', function() {
    var email = $(".subscribe-to-us input").val();
    var data = 'email='+ email;

    $.ajax({
      type: "POST",
      url: "/newsletter",
      data: data,
      success: function() {
        $('.subscribe-to-us button').text('Added!');
      }
    });

    return false;
  });

  var header_logo = {
    change_at: $("#who-we-are").offset().top - 700,
    from: "logo",
    to: "lettering",
    current: "logo",

    change_to_lettering: function(){
      $("#logo").stop().animate({"opacity": "0"}, 300, function() {
        $(this).css({"background-image": "url('/images/logo_min.png')", "width": "190px"})
          .animate({"opacity": "1"}, {queue: false, duration: 300})
          .animate({"padding-bottom": "13px", "height": "45px"}, {duration: 300});
        $(this).css({"background-position": "0 12px"});
      });
      $("#slogan").fadeOut(300);

      header_logo.from = "lettering";
      header_logo.to   = "logo";
      header_logo.current = "lettering";
    },

    change_to_logo: function(){
      $("#logo").stop().animate({"opacity": "0"}, 300, function() {
        $(this).css({"background-image": "url('/logo.png')", "background-position": "0", "padding-bottom": "0", "width": "130px"})
          .animate({"height": "92px"}, {duration: 300})
          .animate({"opacity": "1"}, {duration: 300});
      });
      $("#slogan").delay(500).fadeIn(300);

      header_logo.from = "logo";
      header_logo.to   = "lettering";
      header_logo.current = "logo";
    },

    init : function(){
      $(window).scroll(function(){
        var current_pos = window.pageYOffset;
        if(current_pos >= header_logo.change_at && header_logo.current === "logo")
        {
           header_logo.change_to_lettering();
        }
        else if(current_pos < header_logo.change_at && header_logo.current === "lettering")
        {
           header_logo.change_to_logo();
        }
      });
    }
  };

  var first_arrow = {
    scroll_to_page: function(){
      $("body").animate({scrollTop:$("#who-we-are").offset().top - 40}, 1000);
    },

    init : function() {
      $("#arrow").on('click',function(event) {
        first_arrow.scroll_to_page();
        event.preventDefault();
      });
    }
  };

  var header_nav = {
    home: $("#home").offset().top - 40,
    who_we_are: $("#who-we-are").offset().top - 40,
    what_we_do: $("#what-we-do").offset().top - 40,
    what_we_did: $("#our-work").offset().top - 40,
    contact: $("#hire-us").offset().top - 40,
    footer: $("footer").offset().top - 40,

    add_class_to_one: function(classable_item,class_name){
      $("a."+class_name).each(function(){
        $(this).removeClass(class_name);
      });
      $(classable_item).addClass(class_name);
    },

    change_to_select_menu: function() {
      var window_width = $(window).width();
      if(window_width <= 480) {

        var navigation = $('nav').clone();

        $('nav').html('<select></select>');
        var select_menu = $('select');

        $(navigation).children('ul').children('li').each(function() {
          /* Get top-level link and text */
          var href = $(this).children('a').attr('href');
          var text = $(this).children('a').text();

          /* Append this option to our "select" */
          $(select_menu).append('<option value="'+href+'">'+ text +'</option>');
        });

        $('nav').html(select_menu);
      }

      /* When our select menu is changed, change the window location to match the value of the selected option. */
      $(select_menu).change(function() {
        location = this.options[this.selectedIndex].value;
        this.options[this.selectedIndex].addClass('current');
      });
    },

    current_page: function() {
      $(window).scroll(function(){
        if(window.pageYOffset >= header_nav.home && window.pageYOffset < header_nav.who_we_are)             // Intro
          header_nav.add_class_to_one("#nav-home","current");
        else if(window.pageYOffset >= header_nav.who_we_are && window.pageYOffset < header_nav.what_we_do)  // Who we are
          header_nav.add_class_to_one("#nav-who-we-are","current");
        else if(window.pageYOffset >= header_nav.what_we_do && window.pageYOffset < header_nav.what_we_did) // What we do
          header_nav.add_class_to_one("#nav-what-we-do","current");
        else if(window.pageYOffset >= header_nav.what_we_did && window.pageYOffset < header_nav.contact)    // What we did
          header_nav.add_class_to_one("#nav-our-work","current");
        else if(window.pageYOffset >= header_nav.contact && window.pageYOffset < header_nav.footer)         // Contact
          header_nav.add_class_to_one("#nav-hire-us","current");
        else if(window.pageYOffset >= header_nav.footer)                                                    // footer
          header_nav.add_class_to_one("#nav-contact-us","current");
      });
    },

    scroll_to_page: function(){
      $("nav").on("click","a",function(event){
        var new_pos = header_nav.home;
        switch($(this).attr("id")) {
          case "nav-home":
            new_pos = header_nav.home;
            break;
          case "nav-who-we-are":
            new_pos = header_nav.who_we_are;
            break;
          case "nav-what-we-do":
            new_pos = header_nav.what_we_do;
            break;
          case "nav-our-work":
            new_pos = header_nav.what_we_did;
            break;
          case "nav-hire-us":
            new_pos = header_nav.contact;
            break;
          case "nav-contact-us":
            new_pos = header_nav.footer;
            break;
          default:
            new_pos = header_nav.home;
        }
        $("body,html").animate({scrollTop:new_pos+1}, 1000);

        event.preventDefault();
      });
    },

    init: function(){
      $("#nav-home").addClass("current");
      header_nav.current_page();
      header_nav.scroll_to_page();
    }
  };

  var key_navigation = {
    page_order: ["home", "who-we-are", "what-we-do", "our-work", "hire-us", "contact-us"],

    up_action: function(current_page,event){
      event.preventDefault();
      var current_page_pos = key_navigation.page_order.indexOf(current_page);
      if(current_page_pos >= 1)
      {
        var new_page_name = key_navigation.page_order[current_page_pos - 1];
        var new_page_offset = $("#"+new_page_name).offset().top - 30;
        $("body,html").stop().animate({scrollTop: new_page_offset}, 500);
      }
      else
        $("body,html").stop().animate({scrollTop: 0}, 500);
    },

    down_action: function(current_page,event){
      event.preventDefault();
      var current_page_pos = key_navigation.page_order.indexOf(current_page);
      if(current_page_pos <= key_navigation.page_order.length-1)
      {
        var new_page_name = key_navigation.page_order[current_page_pos + 1];
        if(new_page_name != "contact-us")
          new_page_name = "#"+new_page_name;
        else
          new_page_name = "footer";
        var new_page_offset = $(new_page_name).offset().top - 30;
        $("body,html").stop().animate({scrollTop: new_page_offset}, 500);
      }
      else
        $("body,html").stop().animate({scrollTop: header_nav.footer}, 500);
    },

    up_or_down: function(){
      $(document).on("keydown", function(event){
        var current_page = $("nav .current").attr("id").replace("nav-","");
        if(event.keyCode === 38 && current_page != "home") // Up arrow
        {
          key_navigation.up_action(current_page,event);
          event.preventDefault();
        }
        else if(event.keyCode === 40 && current_page != "contact-us") // Down arrow
        {
          key_navigation.down_action(current_page,event);
          event.preventDefault();
        }
      });
    },

    init: function(){
      key_navigation.up_or_down();
    }
  };

  header_logo.init();
  header_nav.init();
  header_nav.change_to_select_menu();
  first_arrow.init();
  key_navigation.init();
});
