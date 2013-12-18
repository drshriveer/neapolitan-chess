define(['app', 'backbone', 'marionette', 'models/piece'], function( app, Backbone, Marionette, Piece){

// the collection!
  var Pieces = Backbone.Collection.extend({
    model: Piece
  });

  return Pieces;
});