define(['app', 'backbone', 'marionette', 'views/landingView', 'views/rulesView', 'views/boardView', 'views/aboutView'], function( app, Backbone, Marionette, LandingView, RulesView, BoardView, AboutView){
 
  var AppRouter;

  AppRouter =  Backbone.Marionette.AppRouter.extend({
    routes: {
      "landing": "landing",
      "board": "board",
      "about": "about",
      "rules": "rules",
      "": "landing"
    },
    initialize: function(){
      // app.useLayout('layout');
    },

    landing: function(){
      app.content.show(new LandingView());
    },
    board: function(){
      app.content.show(new BoardView());
    },
    about: function(){
      app.content.show(new AboutView());
    },
    rules: function(){
      app.content.show(new RulesView());
    }

  });

  return AppRouter;
});