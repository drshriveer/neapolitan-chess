define(['jqueryui','backbone','marionette','hbs!templates/piece', 'app'], function(JqueryUI, Backbone, Marionette, piecetemplate, app){
  var PieceView = Backbone.Marionette.ItemView.extend({
    className: 'center pieceDiv',

   initialize: function(){
      // app.vent.trigger('startGame');
      this.$el.draggable({
        containment: '.GameBoard',
        start: _.bind(this.highlightSquares, this)
        // snap: '.GameSquare'
      });

      this.render();
      // this.attributes['data-uid'] = this.model.attributes.uid;
      // debugger;
      // console.log('the event: ','dropped:'+this.model.attributes.uid);
      app.vent.on('dropped:'+this.model.attributes.uid, this.moveToSquare, this);
    },

    moveToSquare: function(x,y){
      this.removeHighlights();
      console.log("the xy is ", x, y);
      console.log("hooray!")
      if(this.model.isValidMove(x,y)){
        console.log('its a valid move');
        this.model.moveTo(x,y);
        this.render();
      }
      this.render();
    },

    highlightSquares: function(e, ui){
      var moveableSquares = this.model.canMoveTo();
      for (var i = 0; i < moveableSquares.length; i++) {
        var square = this.findSquare(moveableSquares[i][0], moveableSquares[i][1]);
        square.addClass('highlight-square');
      };
    },

    removeHighlights: function(){
      var moveableSquares = this.model.canMoveTo();
      for (var i = 0; i < moveableSquares.length; i++) {
        var square = this.findSquare(moveableSquares[i][0], moveableSquares[i][1]);
        square.removeClass('highlight-square');
      }
    },


    findSquare: function(x,y){
      y = y || this.model.attributes.y;
      x = x || this.model.attributes.x;
      return $(".GameBoard [data-row='" + y + "'][data-col='" + x + "']");
    },

    render: function(){
      //use jquery to find the correct square...
      this.$el.html('<img data-uid="'+this.model.attributes.uid+'" src="'+this.model.attributes.img_src+'"/>');
      this.findSquare().append(this.$el);
    }

  });

  return PieceView;
});
