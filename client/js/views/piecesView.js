define(['app', 'backbone','marionette','models/pieceView'], function(app, Backbone, Marionette, PieceView){

   var Pieces = Backbone.Collection.extend({
    itemVeiw: PieceView
   });

   return Pieces;
});