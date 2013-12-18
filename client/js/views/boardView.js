define(['backbone','marionette', 'views/squareView'], function(Backbone, Marionette, SquareView){


  var BoardView = Backbone.Marionette.CollectionView.extend({
    itemView: SquareView,
    tagName: 'table',
    className: 'GameBoard',

    render: function(junk){
      console.log(this.collection);
      for (var i = 0; i < 9; i++) {
        var rowItems = this.collection.where({row: i})
        var $row = $('<tr></tr>');
        _(rowItems).each(function(model){
          $row.append(new SquareView({model: model}).$el);
        });
       this.$el.append($row);        
      };

      // for (var i = 0; i < 9; i++) {
      //   var $row = $('<tr></tr>');
      //   for (var j = 0; j < 9; j++) {
      //     var model = this.collection.models[i*8+j];
      //     $row.append(new SquareView({model: model}).$el);
      //   };
      //  this.$el.append($row);
      // };
      
    }

  });

  return BoardView;
});
