define(['backbone','marionette','hbs!templates/piece'], function(Backbone, Marionette, piecetemplate){
  var PieceView = Backbone.Marionette.ItemView.extend({
    // template: piecetemplate,
    className: 'center',

   initialize: function(){
      this.render();
    },

    events: {
      'dragstart': 'highlightSquares',
      'dragStart': 'onDrag',
      'dragend': 'dropped'
    },

    onDrag: function(e){
      console.log("someone's dragging me!");
    },

    highlightSquares: function(){
      var moveableSquares = this.model.canMoveTo();
      for (var i = 0; i < moveableSquares.length; i++) {
        var square = this.findSquare(moveableSquares[i][0], moveableSquares[i][1]);
        square.addClass('highlight-square');
        // if(sqaure.children().length > 0){
        //   //do something
        // }else{
        // }
      };
    },

    removeHighlights: function(){
      var moveableSquares = this.model.canMoveTo();
      for (var i = 0; i < moveableSquares.length; i++) {
        var square = this.findSquare(moveableSquares[i][0], moveableSquares[i][1]);
        square.removeClass('highlight-square');
      }
    },

    dropped: function(e, ui){
      // e.preventDefault();
      console.log('it was dropped!', e);
      console.log('ui', ui);
      this.removeHighlights();
      //find div dropped on

      //set new position to that, re-render

    },

    findSquare: function(x,y){
      y = y || this.model.attributes.y;
      x = x || this.model.attributes.x;
      x++;
      return $('.GameBoard tr:eq('+y+') td:eq('+x+')');
    },

    render: function(){
      //use jquery to find the correct square...
      this.$el.html('<img draggable="true" src="'+this.model.attributes.img_src+'"/>');
      this.findSquare().append(this.$el);
    }

  });

  return PieceView;
});
