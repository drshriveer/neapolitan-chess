define(['backbone','marionette','hbs!templates/square'], function(Backbone, Marionette, square){

  var SquareView = Backbone.Marionette.ItemView.extend({
    template: square,
    events: {
      'drag img': 'onDrag'
    },

    initialize: function(){

    },

    onDrag: function(event){
      console.log('im being draggeeeddd');
    }
  });

  return SquareView;
});


  // GameBoard.BoardView = Backbone.Marionette.itemView({
  //   template: "templates/board"
  // });

  // GameBoard.RowView = Backbone.Marionette.CollectionView.extend({
  //   itemView: GameBoard.AlertView,
  //   emptyView: GameBoard.SaveView
  // });




