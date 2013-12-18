define(['backbone','marionette','hbs!templates/square'], function(Backbone, Marionette, square){

  var SquareView = Backbone.Marionette.ItemView.extend({
    template: square,
    tagName: 'td',
    className: 'center',

    initialize: function(){
      this.$el.addClass(this.model.attributes.classes);
      this.render();
    },

    onRender: function(){
      this.$el.fadeIn(900);
    },

    onDrag: function(event){
      console.log('im being draggeeeddd');
    }
  });

  return SquareView;
});

