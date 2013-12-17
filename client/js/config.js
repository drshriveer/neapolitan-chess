// Filename: config.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  // deps: ["main"],
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    marionette: 'libs/marionette/lib/backbone.marionette.min',
    handlebars: 'libs/handlebars/handlebars.runtime.min'
  },
  shim: {
    handlebars: {
      exports: 'Handlebars',
      init: function(){
        this.Handlebars = Handlebars;
      }
    }
  }
});
