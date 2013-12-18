define(['app', 'backbone','marionette', 'hbs!templates/control', 'models/pieces'], function(app, Backbone, Marionette, control, Pieces){

  var ControlView = Backbone.Marionette.ItemView.extend({
    template: control,
    events:{
      'click #help': 'help',
      'click #cheat': 'cheat',
      'click #quit': 'quit',
      'click #start': 'start'
    },

    help: function(){
      //display rules
    },
    cheat: function(){
      //display helpers
    },
    quit: function(){
      //reset game
    },
    start: function(){
      //trigger load game
      var pz = new Pieces();
      pz.makeTeam("white", 1, 0);
      pz.makeTeam("black", 6, 7);
      pz.init();

      // app.vent.trigger('startGame');
    },

    onRender: function(){
      this.$el.fadeIn(900);
    }


  });

  return ControlView;
});
