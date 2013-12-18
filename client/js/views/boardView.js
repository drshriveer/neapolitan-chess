define(['app','backbone','marionette', 'views/squareView'], function(app, Backbone, Marionette, SquareView){


  var BoardView = Backbone.Marionette.CollectionView.extend({
    itemView: SquareView,
    tagName: 'table',
    className: 'GameBoard',

    initialize: function(){
      app.vent.on('highlightValidMoves', this.highlightValidMoves, this);
      app.vent.on('unHighlightValidMoves', this.unHighlightValidMoves, this);

      app.vent.on('highlightAttacks', this.highlightAttacks, this);
      app.vent.on('unHighlightAttacks', this.unHighlightAttacks, this);

      app.vent.on('unHighlightAll', this.unHighlightAll, this);
    },

    unHighlightAll: function(){
      this.unHighlightAttacks();
      this.unHighlightValidMoves();
    },

    highlightValidMoves: function(validMoves){
      for (var i = 0; i < validMoves.length; i++) {
        var square = this.findSquare(validMoves[i]['x'], validMoves[i]['y']);
        square.parent().addClass('highlight-move');
      };
    },

    unHighlightValidMoves: function(){
      $('.highlight-move').each(function(index, node){
        $(node).removeClass('highlight-move');
      });

    },
    highlightAttacks: function(validAttacks){
      this.unHighlightAttacks();
      for (var i = 0; i < validAttacks.length; i++) {
        var square = this.findSquare(validAttacks[i]['x'], validAttacks[i]['y']);
        square.parent().addClass('highlight-attack');
      };
    },

    unHighlightAttacks: function(){
      $('.highlight-attack').each(function(index, node){
        $(node).removeClass('highlight-attack');
      });
    },

    findSquare: function(x,y){
      return $(".GameBoard [data-row='" + y + "'][data-col='" + x + "']");
    },


    render: function(junk){
      for (var i = 0; i < 9; i++) {
        var rowItems = this.collection.where({row: i})
        var $row = $('<tr></tr>');
        _(rowItems).each(function(model){
          $row.append(new SquareView({model: model}).$el);
        });
       this.$el.append($row);        
      }; 
    },

  });

  return BoardView;
});
