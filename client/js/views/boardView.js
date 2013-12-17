define(['marionette','backbone'], function(Backbone, Marionette){


  var SquareView = Backbone.Marionette.ItemView.extend({
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


  // GameBoard.BoardView = Backbone.Marionette.itemView({
  //   template: "templates/board"
  // });

  // GameBoard.RowView = Backbone.Marionette.CollectionView.extend({
  //   itemView: GameBoard.AlertView,
  //   emptyView: GameBoard.SaveView
  // });




