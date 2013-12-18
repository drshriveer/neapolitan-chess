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
      app.vent.trigger('highlightAttacks',this.pz.calculateCaptureZones());
    },
    quit: function(){
      //reset game
    },
    start: function(){
      //trigger load game
      this.pz = new Pieces();
      this.pz.makeTeam("white", 1, 0);
      this.pz.makeTeam("black", 6, 7);
      this.pz.init();

      // app.vent.trigger('startGame');
    },

    onRender: function(){
      this.$el.fadeIn(900);
    }


  });

  return ControlView;
});
