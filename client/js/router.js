define(['app', 'backbone', 'marionette', 'views/landingView', 'views/rulesView', 'views/boardView', 'views/aboutView', 'models/board', 'views/controlView'], function( app, Backbone, Marionette, LandingView, RulesView, BoardView, AboutView, Board, ControlView){
 
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
      var board = new Board();
      app.content.show(new BoardView({collection: board}));
      app.controler.show(new ControlView());
    },
    about: function(){
      app.info.show(new AboutView());
    },
    rules: function(){
      app.info.show(new RulesView());
    }

  });

  return AppRouter;
});