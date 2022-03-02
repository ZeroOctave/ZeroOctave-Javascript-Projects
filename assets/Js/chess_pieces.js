// piece class
function Piece(position, rank, name){
	this.position = position;
	this.rank     = rank;
	this.name     = name;
	this.color    = this.name.substring(0,5);
	this.img      = document.getElementById(this.name);
}

Piece.prototype.hasRank = function(rank){
	return this.rank == rank;
}

Piece.prototype.changePosition = function(position){
	this.position = parseInt(position);
}

Piece.prototype.getMovesTop = function() {
	var movesTop = [];
	for (var i = this.position+10; i <= 88; i+=10) {
		movesTop.push(i);
	}
	return movesTop;
}

Piece.prototype.getMovesBottom = function(){
	var movesBottom = [];
	for (var i = this.position-10; i >= 11 ; i-=10) {
		movesBottom.push(i);
	}
	return movesBottom;
}

Piece.prototype.getMovesRight = function(){
	var num = this.position+'';
	var movesRight = [];
	for (var i = this.position+1; i <= parseInt(num[0]+'8'); i++) {
		movesRight.push(i);
	}
	return movesRight;
}

Piece.prototype.getMovesLeft = function(){
	var num = this.position+'';
	var movesLeft = [];
	for (var i = this.position-1; i >= parseInt(num[0]+'1'); i--) {
		movesLeft.push(i);
	}
	return movesLeft;
}

Piece.prototype.getMovesTopRight = function() {
	var movesTopRight = [];
	for (var i = this.position+11; i <= 88; i+=11) {
		var firstDigit = (''+i)[1];
		if (firstDigit > 8 || firstDigit < 1) {
			break;
		}
		movesTopRight.push(i);
	}
	return movesTopRight;
}

Piece.prototype.getMovesTopLeft = function() {
	var movesTopLeft = [];
	for (var i = this.position+9; i <= 88; i+=9) {
		var firstDigit = (''+i)[1];
		if (firstDigit > 8 || firstDigit < 1) {
			break;
		}
		movesTopLeft.push(i);
	}
	return movesTopLeft;
}

Piece.prototype.getMovesBottomRight = function() {
	var movesBottomRight = [];
	for (var i = this.position-9; i >= 11 ; i-=9) {
		var firstDigit = (''+i)[1];
		if (firstDigit > 8 || firstDigit < 1) {
			break;
		}
		movesBottomRight.push(i);
	}
	return movesBottomRight;
}

Piece.prototype.getMovesBottomLeft = function() {
	var movesBottomLeft = [];
	for (var i = this.position-11; i >= 11 ; i-=11) {
		var firstDigit = (''+i)[1];
		if (firstDigit > 8 || firstDigit < 1) {
			break;
		}
		movesBottomLeft.push(i);
	}
	return movesBottomLeft;
}

/*Piece.prototype.movePiece = function(square){
	this.position = square.getAttribute('id');
}*/

function Pawn(position, name){
	Piece.call(this, position, 'pawn', name);
}
Pawn.prototype = Object.create(Piece.prototype);

Pawn.prototype.getAllowedMoves = function(){
		var position = this.position;
		var mathSign = (this.color == 'white')? '+': '-';
		var allowedMoves = [eval(position + mathSign +'10' )];
		if ((position >20 && position < 29) || (position >70 && position < 79)) {
			allowedMoves.push(eval(position + mathSign +'20' ));
		}
		var attackMoves = [eval(position + mathSign + '9'), eval(position + mathSign + '11')]
		return [attackMoves, allowedMoves];
}

Pawn.prototype.changePosition = function(position, promote=false){
	this.position = parseInt(position);
	if (promote && (position > 80 || position < 20)) {
		game.promote(this);
	}
}

function King(position, name){
	Piece.call(this, position, 'king', name);
	this.able_to_castle = true;
}
King.prototype = Object.create(Piece.prototype);

King.prototype.getAllowedMoves = function(){
	var position = this.position;
	var allowedMoves = [
		[parseInt(position) + 1],
		[parseInt(position) - 1],
		[parseInt(position) + 10],
		[parseInt(position) - 10],
		[parseInt(position) + 11],
		[parseInt(position) - 11],
		[parseInt(position) + 9],
		[parseInt(position) - 9]
	];

	if (this.able_to_castle) {
		var rook1 = game.getPieceByName(this.color+'Rook1');
		var rook2 = game.getPieceByName(this.color+'Rook2');
		if (rook1 && rook1.able_to_castle) {
			allowedMoves[1].push(rook1.position + 2);
			allowedMoves[1].push(rook1.position + 1);
		}
		if (rook2 && rook2.able_to_castle) {
			allowedMoves[0].push(rook2.position - 1);
		}
	}
	return allowedMoves;
}

King.prototype.remove_castling_ability = function(){
	this.able_to_castle = false;
}

King.prototype.changePosition = function(position, castle=false){
	if (castle) {
		if (position - this.position == 2) {
			game.castleRook(this.color+'Rook2');
		}
		if (position - this.position == -3) {
			game.castleRook(this.color+'Rook1');
		}
		this.able_to_castle = false;
	}
	this.position = parseInt(position);
}

function Rook(position, name){
	Piece.call(this, position, 'rook', name);
	this.able_to_castle = true;
}
Rook.prototype = Object.create(Piece.prototype);

Rook.prototype.changePosition = function(position){
	this.position = parseInt(position);
	this.able_to_castle = false;
}

Rook.prototype.getAllowedMoves = function(){
	return [
		this.getMovesTop(),
		this.getMovesBottom(),
		this.getMovesRight(),
		this.getMovesLeft()
	];
}


function Queen(position, name){
	Piece.call(this, position, 'queen', name);
}
Queen.prototype = Object.create(Piece.prototype);

Queen.prototype.getAllowedMoves = function(){
	return [
		this.getMovesTop(),
		this.getMovesTopRight(),
		this.getMovesTopLeft(),
		this.getMovesBottom(),
		this.getMovesBottomRight(),
		this.getMovesBottomLeft(),
		this.getMovesRight(),
		this.getMovesLeft()
	];
}

function Bishop(position, name){
	Piece.call(this, position, 'bishop', name);
}
Bishop.prototype = Object.create(Piece.prototype);

Bishop.prototype.getAllowedMoves = function(){
	return [
		this.getMovesTopRight(),
		this.getMovesTopLeft(),
		this.getMovesBottomRight(),
		this.getMovesBottomLeft(),
	];
}

function Knight(position, name){
	Piece.call(this, position, 'knight', name);
}
Knight.prototype = Object.create(Piece.prototype);

Knight.prototype.getAllowedMoves = function(){
	var position = this.position;
	var allowedMoves = [
		[parseInt(position) + 21],
		[parseInt(position) - 21],
		[parseInt(position) + 19],
		[parseInt(position) - 19],
		[parseInt(position) + 12],
		[parseInt(position) - 12],
		[parseInt(position) + 8],
		[parseInt(position) - 8]
	];

	return allowedMoves;
}