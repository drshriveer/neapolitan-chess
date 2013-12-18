define(['backbone','marionette','hbs!templates/square'], function(Backbone, Marionette, square){

  var SquareView = Backbone.Marionette.ItemView.extend({
    template: square,
    tagName: 'td',
    className: 'center',
    attributes: {
      'data-x': 0,
      'data-y': 0
    },

    initialize: function(){
      this.$el.addClass(this.model.attributes.classes);
      this.attributes['data-x'] = this.model.attributes.col;
      this.attributes['data-y'] = this.model.attributes.row;
      this.render();
    },

    onRender: function(){
      this.$el.fadeIn(900);
    }

  });

  return SquareView;
});

    window.dropped = function(e,ui){
      console.log('say whot?',e,ui);
    };
