define(['app','jqueryui','backbone','marionette','hbs!templates/square'], function(app, jqueryui, Backbone, Marionette, square){

  var SquareView = Backbone.Marionette.ItemView.extend({
    template: square,
    tagName: 'td',
    className: 'center GameSquare',

    initialize: function(){
      this.$el.addClass(this.model.attributes.classes);
      this.render();
      $(this.$el.children()[0]).droppable({
        drop: this.handleDrop
      });
    },

    onRender: function(){
      this.$el.fadeIn(900);
    },

    handleDrop: function(e, ui){
      e.preventDefault();
      e.stopPropagation();
      var uid = ui.draggable.children()[0].dataset.uid;
      var x = +e.target.dataset.col;
      var y = +e.target.dataset.row;
      app.vent.trigger('dropped:'+ uid, x, y);
    }
  });



  return SquareView;
});