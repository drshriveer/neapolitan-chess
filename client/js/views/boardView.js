this.Neapolitan.module("GameBoard", function(GameBoard, App, Backbone, Marionette, $, _){

  // GameBoard.BoardView = Backbone.Marionette.itemView({
  //   template: "templates/board"
  // });

  // GameBoard.RowView = Backbone.Marionette.CollectionView.extend({
  //   itemView: GameBoard.AlertView,
  //   emptyView: GameBoard.SaveView
  // });


  GameBoard.SquareView = Backbone.Marionette.ItemView.extend({
    template: "templates/square",
    events: {
      'drag img': 'onDrag'
    },

    initialize: function(){

    },

    onDrag: function(event){
      console.log('im being draggeeeddd');
    }
  });

});

