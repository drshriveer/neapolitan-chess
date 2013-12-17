Router = Backbone.Marionette.AppRouter.extend({
  
  // controller routes....
  // appRoutes: {
  //   "some/route": "someMethod"
  // },

  /* standard routes can be mixed with appRoutes/Controllers above */
  routes: {
    "landing": "landing",
    "board": "board",
    "about": "about",
    "rules": "rules"
  },

  landing: function(){
    Neapolitan.layout.setView('#main', new BoardView()).render();
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