define(['backbone', 'marionette', 'models/square'], function(Backbone, Marionette, Square){

  var Board = Backbone.Collection.extend({
    model: Square,

    initialize: function(options){
      this.buildBoard();
      console.log('theBoard looks like:', this);
    },

    buildBoard: function(){
      var letters = ["A","B","C","D","E","F","G","H",""];
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          if(col === 0){
            var classes = (row+col)%2 === 0 ? 'light-gray' : 'dark-gray';
            this.add(new Square({classes:classes, row:row, col:"", val:letters[row]}));
          } else if(row === 8){
            var classes = (row+col)%2 === 0 ? 'light-gray' : 'dark-gray';
            this.add(new Square({classes:classes, row:row, col:"", val:col-1}));
          }else{
            var classes = (row+col)%2 === 0 ? 'black' : 'white';
            classes += " boardSquare";
            this.add(new Square({classes:classes, row:row, col:col-1}));
          }
        };
      };
    }
  });

  return Board;
});
