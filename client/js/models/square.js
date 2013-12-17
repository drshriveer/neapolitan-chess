this.Neapolitan.module("GameBoard", function(GameBoard, App, Backbone, Marionette, $, _){
  GameBoard.Square = Backbone.Model.extend({
    defaults: {
      row: 0,
      col: 0,
      val: '',
      color: 'black'
    }
  });
});