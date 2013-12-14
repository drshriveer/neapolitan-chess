neapolitan-chess
================

Online multiplayer variant of the ever famous game of chess; Neapolitan chess

## Disclamer:
I'm really not sure where this version of chess came from. It was taught to me by my father who learnt it while at a chess championship in Thailand. Because it has only been passed word to mouth, it is very possible that some of the rules are incorrect. If you know the origins or a variation of the rules I have provided please send me an [email](mailto:gavin.shriver@gmail.com)!

## Rules
###### Please read disclamer above!

### Objective:
Capture the king. There is no check or check-mate in this version of chess. Simply capture the king to win.

### Piece movement:

####Pawns (a.k.a. pawns):

##### movement:
Pawns move foward, backward, left, or right. Up to two spaces at a time. 
s
##### capturing:
They capture by pinning an enimy piece between two of them either horizontally or stacked on top of eachother. But ever by diagonals. 
###### Valid Captures (`P` is a Pawn, `E` is an enemy piece.)
                   |      [P]
    [P][E][P]      |      [E]
                   |      [P]
###### Invalid Captures
    [P]          |          [P]
      [E]        |        [E]
        [P]      |      [P]
####Jumpers (a.k.a. knights):
##### movement:
Jumpers can move like queens of the original game. All directions any number of spaces.
##### capturing:
To capture they can travel any number of spaces but must jump into an empty space behind the piece they are trying to capture. (Just like one takes a piece in checkers-- by jumping.) They cannot do mutliple jumps or jump through their own pieces.
####Chameleons (a.k.a. Bishops):
##### movement:
Chameleons move like queens as well. All directions any number of spaces.
##### capturing:
Chameleons can only capture the way that the piece they want to capture captures. In other words it must mimic the enemy it is trying to capture. 
- When capturing a pawn it must work in tandom with another pawn or chameleon who is also trying to the enemy pawn. 
- When capturing a jumper, the chameleon must jump it.
- When capturing a retractor it must retract.
- When capturing a Synchronizer, it must work in tandom with the King (read Synchronizer).
- Chameleons cannot capture kings or other chameleons.
- Something strange happens when chameleons come in contact with paralizers. They become stuck, but also prevent the paralizer from moving. They do not extend the range of the paralizer though.

####Retractor (a.k.a. Queen):
##### movement:
  Retractors move just like any queen, all directions any number of spaces.
##### capturing:
  In order to capture a retractor must first be next to the piece it wants to take. Then move <u>directly</u> backwards from it. They can move away any number of spaces.

####Paralizer (a.k.a. Queen's Rook):
##### Special:
  When playing the game in real life a rook is signified by fliping the piece upside down. 
##### movement:
  The Paralizer moves like a rook in the normal game, that is up, down, left, right any number of pieces.
##### capturing:
  This piece never actually captures anything. Rather, any enemy piece within one square of it in any direction becomes paralized and cannot move. When two paralizers come in contact with eachother both are paralized and both cannot move. In addition ANY piece within one square of either of them becomes paralized.  
####King:
##### movement:
  Kings move like a normal king, one square at a time in any direction.
##### capturing:
  They cannot capture on their own, but rather depend on a Synchronizer to assasinate enemy pieces.
####Synchronizer/Assasin (a.k.a. King's Rook):
##### movement:
  This piece moves like a queen in normal chess. All directions any number of spaces.
##### capturing:
  This piece cannot capture on its own. It works in tandom with the King to create right angles. At the corners of the right angles enemy pieces are captured, regardless of their distance from the king or the Synchronizer.  