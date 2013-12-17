describe("Pieces", function() {

  it("should have correct methods and variables", function(){
    var piece = new Piece();

    expect(Piece.makeBlankBoard).toEqual(jasmine.any(Function));
    expect(piece.setPos).toEqual(jasmine.any(Function));
    expect(piece.getPos).toEqual(jasmine.any(Function));
    expect(piece.moveTo).toEqual(jasmine.any(Function));
    expect(piece.isValidMove).toEqual(jasmine.any(Function));
    expect(piece.canMoveTo).toEqual(jasmine.any(Function));
    expect(piece.x).toEqual(jasmine.any(Number));
    expect(piece.y).toEqual(jasmine.any(Number));
    expect(piece.movementLimit).toEqual(jasmine.any(Number));
    expect(typeof piece.movesDiagonally).toEqual('boolean');
    expect(typeof piece.movesForwardAndBack).toEqual('boolean');
    expect(typeof piece.movesLeftAndRight).toEqual('boolean');

  });

  it("setPos should set the position", function() {
    var piece = new Piece();

    piece.setPos(1,2);
    expect(piece.x).toEqual(1);
    expect(piece.y).toEqual(2);
  });

  it("getPos should return the position", function() {
    var piece = new Piece();

    var currentPos = piece.getPos();
    expect(currentPos.x).toEqual(0);
    expect(currentPos.y).toEqual(0);
    piece.setPos(4,4);
    var currentPos = piece.getPos();
    expect(currentPos.x).toEqual(4);
    expect(currentPos.y).toEqual(4);
  });


  //
  //  PAWN TEST
  //
  describe("Pawns", function() {
    beforeEach(function() {
      var pawn = new Pawn(4,4);
    });

    it("should have the correct properties", function() {
      var pawn = new Pawn(4,4);

      var currentPos = pawn.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(pawn.movesDiagonally).toBeFalsy();
      expect(pawn.movementLimit).toEqual(2);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var pawn = new Pawn(4,4);
      
      var currentPos = pawn.getPos();
      var movePositions = pawn.canMoveTo();
      expect(movePositions[currentPos.y][currentPos.x-2]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeTruthy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeTruthy();


      expect(movePositions[currentPos.y+3][currentPos.x]).toBeFalsy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeFalsy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeFalsy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeFalsy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeFalsy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeFalsy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeFalsy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var pawn = new Pawn(4,4);

      var currentPos = pawn.getPos();
      var moved = pawn.moveTo(4,3);
      expect(moved).toBeTruthy();
      moved = pawn.moveTo(6,6);
      expect(moved).toBeFalsy();
    });

  });


  //
  //  Paralyzer TEST
  //
  describe("Paralyzers", function() {
    beforeEach(function() {
      var paralyzer = new Paralyzer(4,4);
    });

    it("should have the correct properties", function() {
      var paralyzer = new Paralyzer(4,4);

      var currentPos = paralyzer.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(paralyzer.movesDiagonally).toBeFalsy();
      expect(paralyzer.movementLimit).toEqual(7);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var paralyzer = new Paralyzer(4,4);

      var currentPos = paralyzer.getPos();
      var movePositions = paralyzer.canMoveTo();

      expect(movePositions[currentPos.y][currentPos.x-2]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeTruthy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeTruthy();

      expect(movePositions[currentPos.y+3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeFalsy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeFalsy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeFalsy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var paralyzer = new Paralyzer(4,4);

      var currentPos = paralyzer.getPos();
      var moved = paralyzer.moveTo(4,3);
      expect(moved).toBeTruthy();
      moved = paralyzer.moveTo(6,6);
      expect(moved).toBeFalsy();
    });

  });



  //
  //  Chameleon TEST
  //
  describe("Paralyzers", function() {
    beforeEach(function() {
      var chameleon = new Chameleon(4,4);
    });

    it("should have the correct properties", function() {
      var chameleon = new Chameleon(4,4);

      var currentPos = chameleon.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(chameleon.movesDiagonally).toBeTruthy();
      expect(chameleon.movementLimit).toEqual(7);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var chameleon = new Chameleon(4,4);

      var currentPos = chameleon.getPos();
      var movePositions = chameleon.canMoveTo();
      expect(movePositions[currentPos.y][currentPos.x-2]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeTruthy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeTruthy();


      expect(movePositions[currentPos.y+3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+3]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var chameleon = new Chameleon(4,4);

      var currentPos = chameleon.getPos();
      var moved = chameleon.moveTo(4,3);
      expect(moved).toBeTruthy();

      moved = chameleon.moveTo(6,5);
      expect(moved).toBeTruthy();

      moved = chameleon.moveTo(1,6);
      expect(moved).toBeFalsy();
    });

  });

  //
  //  Retractor TEST
  //
  describe("Retractors", function() {
    beforeEach(function() {
      var retractor = new Retractor(4,4);
    });

    it("should have the correct properties", function() {
      var retractor = new Retractor(4,4);

      var currentPos = retractor.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(retractor.movesDiagonally).toBeTruthy();
      expect(retractor.movementLimit).toEqual(7);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var retractor = new Retractor(4,4);

      var currentPos = retractor.getPos();
      var movePositions = retractor.canMoveTo();
      expect(movePositions[currentPos.y][currentPos.x-2]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeTruthy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeTruthy();


      expect(movePositions[currentPos.y+3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+3]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var retractor = new Retractor(4,4);

      var currentPos = retractor.getPos();
      var moved = retractor.moveTo(4,3);
      expect(moved).toBeTruthy();

      moved = retractor.moveTo(6,5);
      expect(moved).toBeTruthy();

      moved = retractor.moveTo(1,6);
      expect(moved).toBeFalsy();
    });

  });

  //
  //  synchronizer TEST
  //
  describe("synchronizers", function() {
    beforeEach(function() {
      var synchronizer = new Synchronizer(4,4);
    });

    it("should have the correct properties", function() {
      var synchronizer = new Synchronizer(4,4);

      var currentPos = synchronizer.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(synchronizer.movesDiagonally).toBeTruthy();
      expect(synchronizer.movementLimit).toEqual(7);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var synchronizer = new Synchronizer(4,4);

      var currentPos = synchronizer.getPos();
      var movePositions = synchronizer.canMoveTo();
      expect(movePositions[currentPos.y][currentPos.x-2]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeTruthy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeTruthy();


      expect(movePositions[currentPos.y+3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+3]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var synchronizer = new Synchronizer(4,4);

      var currentPos = synchronizer.getPos();
      var moved = synchronizer.moveTo(4,3);
      expect(moved).toBeTruthy();

      moved = synchronizer.moveTo(6,5);
      expect(moved).toBeTruthy();

      moved = synchronizer.moveTo(1,6);
      expect(moved).toBeFalsy();
    });

  });


  //
  //  synchronizer TEST
  //
  describe("Jumpers", function() {
    beforeEach(function() {
      var jumper = new Jumper(4,4);
    });

    it("should have the correct properties", function() {
      var jumper = new Jumper(4,4);

      var currentPos = jumper.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(jumper.movesDiagonally).toBeTruthy();
      expect(jumper.movementLimit).toEqual(7);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var jumper = new Jumper(4,4);

      var currentPos = jumper.getPos();
      var movePositions = jumper.canMoveTo();
      expect(movePositions[currentPos.y][currentPos.x-2]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeTruthy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeTruthy();


      expect(movePositions[currentPos.y+3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+3]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var jumper = new Jumper(4,4);

      var currentPos = jumper.getPos();
      var moved = jumper.moveTo(4,3);
      expect(moved).toBeTruthy();

      moved = jumper.moveTo(6,5);
      expect(moved).toBeTruthy();

      moved = jumper.moveTo(1,6);
      expect(moved).toBeFalsy();
    });

  });


  //
  //  king TEST
  //
  describe("kings", function() {
    beforeEach(function() {
      var king = new King(4,4);
    });

    it("should have the correct properties", function() {
      var king = new King(4,4);

      var currentPos = king.getPos();
      expect(currentPos.x).toEqual(4);
      expect(currentPos.y).toEqual(4);
      expect(king.movesDiagonally).toBeTruthy();
      expect(king.movementLimit).toEqual(1);
    });

    it("canMoveTo should give a board with valid movements", function() {
      var king = new King(4,4);

      var currentPos = king.getPos();
      var movePositions = king.canMoveTo();
      expect(movePositions[currentPos.y][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x]).toBeTruthy();

      expect(movePositions[currentPos.y+1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x-1]).toBeTruthy();
      expect(movePositions[currentPos.y-1][currentPos.x+1]).toBeTruthy();
      expect(movePositions[currentPos.y+1][currentPos.x-1]).toBeTruthy();

      expect(movePositions[currentPos.y][currentPos.x-2]).toBeFalsy();
      expect(movePositions[currentPos.y][currentPos.x-3]).toBeFalsy();
      expect(movePositions[currentPos.y][currentPos.x+2]).toBeFalsy();
      expect(movePositions[currentPos.y][currentPos.x+3]).toBeFalsy();
      expect(movePositions[currentPos.y-2][currentPos.x]).toBeFalsy();
      expect(movePositions[currentPos.y-3][currentPos.x]).toBeFalsy();
      expect(movePositions[currentPos.y+2][currentPos.x]).toBeFalsy();
      expect(movePositions[currentPos.y+3][currentPos.x]).toBeFalsy();
      expect(movePositions[currentPos.y+1][currentPos.x+3]).toBeFalsy();

    });

    it("should be able to moveTo a valid location", function() {
      var king = new King(4,4);

      var currentPos = king.getPos();
      var moved = king.moveTo(4,3);
      expect(moved).toBeTruthy();

      moved = king.moveTo(6,5);
      expect(moved).toBeFalsy();

      moved = king.moveTo(1,6);
      expect(moved).toBeFalsy();
    });

  });

  


});