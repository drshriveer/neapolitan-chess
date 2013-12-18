define(['app', 'backbone','marionette', 'hbs!templates/control'], function(app, Backbone, Marionette, control){

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
      app.vent.trigger('startGame');
    },

    onRender: function(){
      this.$el.fadeIn(900);
    }


  });

  return ControlView;
});
