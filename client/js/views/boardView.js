define(['backbone','marionette', 'views/squareView'], function(Backbone, Marionette, SquareView){


  var BoardView = Backbone.Marionette.CollectionView.extend({
    itemView: SquareView,
    tagName: 'table',
    className: 'GameBoard',

    render: function(junk){

      for (var i = 0; i < 9; i++) {
        var $row = $('<tr></tr>');
        for (var j = 0; j < 9; j++) {
          var model = this.collection.models[i*9+j];
          $row.append(new SquareView({model: model}).$el);
        };
       this.$el.append($row);
      };
      
    }

  });

  return BoardView;
});
