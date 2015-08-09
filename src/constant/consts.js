/** Constants */
var BOARD_SIZE = 8;
var CLOSE_ROW_START = 6;
var FAR_ROW_START = 1;


var Direction = {
  N:-1, S:1,
  E:1, W:-1,
  NONE:0
};

var Threats = {
  // Jumpers
  ATTACK: "attack",
  // King, Synchronizer, Queen
  ASSASSINATION: "assassination",
  // Pawns
  TRAP: "trap",
  // Paralyzer
  PARALYSIS: "paralysis",
  // King
  NONE: "none"
};

var Colors = {
  BLACK: "Black",
  BROWN: "Brown",
  BLUE: "Blue",
  CLEAR_WHITE: "Clear_white",
  WHITE: "White",
  YELLOW: "Yellow"
};

var Pieces = {
  CHAMELEON: "Chameleon",
  KING: "King",
  JUMPER: "Jumper",
  PARALYZER: "Paralyzer",
  PAWN: "Pawn",
  RETRACTOR: "Retractor",
  SYNCHRONIZER: "Synchronizer"
};

