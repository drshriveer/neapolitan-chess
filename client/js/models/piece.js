define(['app', 'backbone', 'marionette'], function(app, Backbone, Marionette){

  // static variable setup;
  var typeAttributes = {
    pawn: {
      movesDiagonally: false,
      movementLimit: 2,
      img_src: {
        'black': "images/pieces/Black_P.png",
        'blue': "images/pieces/Blue_P.png",
        'brown': "images/pieces/Brown_P.png",
        'clear': "images/pieces/Clear_white_P.png",
        'white': "images/pieces/White_P.png",
        'yellow': "images/pieces/Yellow_P.png"
      }
    },
    paralyzer: {
      movesDiagonally: false,
      img_src: {
        black: "images/pieces/Black_UR.png",
        blue: "images/pieces/Blue_UR.png",
        brown: "images/pieces/Brown_UR.png",
        clear: "images/pieces/Clear_white_UR.png",
        white: "images/pieces/White_UR.png",
        yellow: "images/pieces/Yellow_UR.png"
      }
    },
    chameleon: {
      movesDiagonally: true,
      img_src: {
        black: "images/pieces/Black_B.png",
        blue: "images/pieces/Blue_B.png",
        brown: "images/pieces/Brown_B.png",
        clear: "images/pieces/Clear_white_B.png",
        white: "images/pieces/White_B.png",
        yellow: "images/pieces/Yellow_B.png"
      }
    },
    retractor: {
      movesDiagonally: true,
      img_src: {
        black: "images/pieces/Black_Q.png",
        blue: "images/pieces/Blue_Q.png",
        brown: "images/pieces/Brown_Q.png",
        clear: "images/pieces/Clear_white_Q.png",
        white: "images/pieces/White_Q.png",
        yellow: "images/pieces/Yellow_Q.png"
      }
    },
    king: {
      movementLimit: 1,
      movesDiagonally: true,
      img_src: {
        black: "images/pieces/Black_K.png",
        blue: "images/pieces/Blue_K.png",
        brown: "images/pieces/Brown_K.png",
        clear: "images/pieces/Clear_white_K.png",
        white: "images/pieces/White_K.png",
        yellow: "images/pieces/Yellow_K.png"
      }
    },
    sychronizer: {
      movesDiagonally: true,
      img_src: {
        black: "images/pieces/Black_R.png",
        blue: "images/pieces/Blue_R.png",
        brown: "images/pieces/Brown_R.png",
        clear: "images/pieces/Clear_white_R.png",
        white: "images/pieces/White_R.png",
        yellow: "images/pieces/Yellow_R.png"
      }
    },
    jumper: {
      movesDiagonally: true,
      img_src: {
        black: "images/pieces/Black_N.png",
        blue: "images/pieces/Blue_N.png",
        brown: "images/pieces/Brown_N.png",
        clear: "images/pieces/Clear_white_N.png",
        white: "images/pieces/White_N.png",
        yellow: "images/pieces/Yellow_N.png"
      }
    }
  };

  // the model!
  var Piece = Backbone.Model.extend({
    defaults: {
      color: 'black',
      x: 0,
      y: 0,
      isEnemy: true,
      movesDiagonally: true,
      movesForwardAndBack: true,
      movesLeftAndRight: true,
      movementLimit: 7,
      type: 'pawn',
      img_src: typeAttributes['pawn'].img_src['black']

    },
    initialize: function(options){
      //options expects: 
      // options.x, options.y, options.type, options.color
      this.attributes.movesDiagonally = typeAttributes[this.attributes.type].movesDiagonally;
      this.attributes.movementLimit = typeAttributes[this.attributes.type].movementLimit || 7;
      this.attributes.img_src = typeAttributes[this.attributes.type].img_src[this.attributes.color];
      this.attributes.uid = (new Date()).valueOf().toString(11) + '-' + (Math.random()*100000000).toString(24);
    },

    setPos: function(x,y){
      this.attributes.x = x || this.attributes.x;
      this.attributes.y = y || this.attributes.y;
      app.vent.trigger("moved:"+this.attributes.uid);
      //trigger movement?
    },

    getPos: function(){
      return {'x':this.attributes.x, 'y':this.attributes.y};
    }

  });

  return Piece
});

