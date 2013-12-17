define(['marionette','backbone'], function(Backbone, Marionette){

  var Square = Backbone.Model.extend({
    defaults: {
      row: 0,
      col: 0,
      val: '',
      color: 'black'
    }
  });

  var Board = Backbone.Collection.extend({
    model: Square,

    initialize: function(options){
      buildBoard();
    },

    buildBoard: function(){
      var letters = ["A","B","C","D","E","F","G","H",""];
      for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
          if(col === 0){
            var color = (row+col)%2 === 0 ? 'light-gray' : 'dark-gray';
            this.add(new Square({color:color, row:row, col:col, val:letters[row]}));

          } else if(row === 8){
            var color = (row+col)%2 === 0 ? 'light-gray' : 'dark-gray';
            this.add(new Square({color:color, row:row, col:col, val:col-1}));

          }else{
            var color = (row+col)%2 === 0 ? 'black' : 'white';
            this.add(new Square({color:color, row:row, col:col}));
          }
        };
      };
    }
  });

});