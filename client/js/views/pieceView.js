define(['backbone','marionette','hbs!templates/piece'], function(Backbone, Marionette, piece){

  var PieceView = Backbone.Marionette.ItemView.extend({
    template: piece,
    tagName: 'div',
    className: 'center',

    events: {
      'drag': 'onDrag'
      'dragStart': 'onDrag'
      'drop': 'dropped'
    },

    onDrag: function(e){
      console.log("someone's dragging me!");
    },

    dropped: function(e){

    }

  });

  return PieceView;
});
