// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

// This file is only used to start on load methods for all instances, other methods should go to utils.js and specific methods should be in separate files

jQuery.noConflict();

jQuery(document).ready(function($) {
  $.preloadCssImages();
  $('nav ul').Touchdown();
});
