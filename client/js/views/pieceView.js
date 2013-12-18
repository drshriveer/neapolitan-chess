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

      app.vent.on('dropped:'+this.model.attributes.uid, this.moveToSquare, this);
      app.vent.on('moved:'+this.model.attributes.uid, this.render, this);
    },

    moveToSquare: function(x,y){
      this.removeHighlights();
      console.log("move to ", x, y);
      if(this.model.collection.isValidMove(x,y,this.model)){
        console.log('its a valid move... moving piece..');
        this.model.setPos(x,y);
      }else{
        console.log('cannot move here, resetting...');
        this.render();
      }
    },

    highlightSquares: function(e, ui){
      var moveableSquares = this.model.collection.canMoveTo(this.model);
      console.log('moveableSquares', moveableSquares);
      for (var i = 0; i < moveableSquares.length; i++) {
        var square = this.findSquare(moveableSquares[i]['x'], moveableSquares[i]['y']);
        square.parent().addClass(moveableSquares[i]['highlightClass']);
      };
    },

    removeHighlights: function(){
      var moveableSquares = this.model.collection.canMoveTo(this.model);
      for (var i = 0; i < moveableSquares.length; i++) {
        var square = this.findSquare(moveableSquares[i]['x'], moveableSquares[i]['y']);
        square.parent().removeClass(moveableSquares[i]['highlightClass']);
      }
    },


    findSquare: function(x,y){
      return $(".GameBoard [data-row='" + y + "'][data-col='" + x + "']");
    },

    render: function(){
      //use jquery to find the correct square...
      var uid = this.model.attributes.uid;
      var img_src = this.model.attributes.img_src;
      var y = this.model.attributes.y;
      var x = this.model.attributes.x;
      //reset style:
      this.$el.attr({style:'position: relative'});      
      this.$el.html('<img data-uid="'+uid+'" src="'+img_src+'"/>');
      this.findSquare(x,y).append(this.$el);
    }

  });

  return PieceView;
});
