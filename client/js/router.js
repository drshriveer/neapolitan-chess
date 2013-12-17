define(['app', 'views/landingView', 'views/rulesView', 'views/boardView', 'view/aboutView'], function(app, LandingView, RulesView, AboutView, BoardView){
"use strict"
  var Router = Backbone.Marionette.AppRouter.extend({
    
    routes: {
      "landing": "landing",
      "board": "board",
      "about": "about",
      "rules": "rules",
      "": "landing"
    },

    landing: function(){
      console.log('trying to render landing');
      Neapolitan.layout.setView('#main', new Landing.LandingView()).render();
    },
    board: function(){
      Neapolitan.layout.setView('#main', new BoardView()).render();
    },
    about: function(){
      Neapolitan.layout.setView('#main', new AboutView()).render();
    },
    rules: function(){
      Neapolitan.layout.setView('#main', new BoardView()).render();
    }

  });

  })

});