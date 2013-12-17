Neapolitan.Board = Backbone.Marionette.Collection.extend({
  model: Square,
  defaults: {
    myColor: 'white',
    enemyColor: 'black',
  },
  initialize: function(options){
    //options expects
    //options.myColor, options.enemyColor
    buildBoard();
  },

  buildBoard: function(){
    
  }

});



Neapolitan.Square = Backbone.Marionette.Model.extend({

})