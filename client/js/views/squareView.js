define(['jqueryui','backbone','marionette','hbs!templates/square'], function(jqueryui, Backbone, Marionette, square){

  var SquareView = Backbone.Marionette.ItemView.extend({
    template: square,
    tagName: 'td',
    className: 'center GameSquare',
    attributes: {
      'data-x': 0,
      'data-y': 0
    },

    initialize: function(){
      this.$el.addClass(this.model.attributes.classes);
      this.attributes['data-x'] = this.model.attributes.col;
      this.attributes['data-y'] = this.model.attributes.row;
      this.render();
      this.$el.droppable({
        drop: this.handleDrop
      });
    },

    onRender: function(){
      this.$el.fadeIn(900);
    },

    handleDrop: function(e, ui){
      console.log('was dropped on this sqare!');
      console.log(e);
      console.log(ui);
      // img must contain unique ID
      // trigger event on model listening for that uniqueID, with data:
      //    unique ID of any current residents ie: enemies, 
      //    current squre
      // the event should check if the movement is valid, 
    }
  });



  return SquareView;
});