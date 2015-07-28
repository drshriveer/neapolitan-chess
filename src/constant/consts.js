/** Constants */

var Direction = {
  N:-1, S:1,
  E:1, W:-1,
  NONE:0
};

var Threats = {
  // Jumpers
  ATTACK: "ATTACK",
  // King, Synchronizer, Queen
  ASSASINATE: "ASSASINATE",
  // Pawns
  BLOCKING_TRAP: "BLOCKING_TRAP",
  // Paralyzer
  PARALYZE: "PARALYZE"
};

