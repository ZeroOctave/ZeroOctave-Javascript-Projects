function Game(pieces) {
	this.board   = document.getElementById('board');
	this.squares = this.board.querySelectorAll('.square');
	this.pieces  = pieces;
	this.turn    = 'white';
	this.turnSign = document.getElementById('turn');
	this.clickedPiece = null;
	this.allowedMoves = null;
	this.addEventListeners();
	this.whiteSematary = document.getElementById('whiteSematary');
	this.blackSematary = document.getElementById('blackSematary');
}

Game.prototype.addEventListeners = function(){
	for (var i = 0; i < this.pieces.length; i++) {
		this.pieces[i].img.addEventListener("click", this.pieceMove.bind(this)); 
		this.pieces[i].img.addEventListener("dragstart", this.pieceMove.bind(this)); 
		this.pieces[i].img.addEventListener("drop", this.pieceMove.bind(this)); 
	}
	squares = this.squares;
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", this.movePiece.bind(this)); 
		squares[i].addEventListener("dragover", function(event){
			event.preventDefault();
		}); 
		squares[i].addEventListener("drop", this.movePiece.bind(this)); 
	}
}

Game.prototype.pieceMove = function(event){
	var clickedPiece = this.clickedPiece;
	var name = event.target.getAttribute('id');
	allowedMoves = this.getPieceAllowedMoves(event, name);
	if (allowedMoves) {
		position = this.getPieceByName(name).position;
		var clickedSquare = document.getElementById(position);
		if (event.type == 'click' && clickedPiece && clickedPiece.name == name) {
			this.setClickedPiece(null);
			return this.clearSquares();
		}
		clickedSquare.classList.add('clicked-square');
		for (var i = 0; i < allowedMoves.length; i++) {
			if (document.body.contains(document.getElementById(allowedMoves[i]))) {
				document.getElementById(allowedMoves[i]).classList.add('allowed');		
			}	
		}
	}
	else{
		this.clearSquares();
	}
}

Game.prototype.changeTurn = function(){
	if (this.turn == 'white') {
		this.turn = 'black';
		this.turnSign.innerHTML = "Black's Turn";
	}
	else{
		this.turn = 'white';
		this.turnSign.innerHTML = "White's Turn";
	}
}

Game.prototype.getPiecesByColor = function(color){
	return this.pieces.filter(obj => {
	  return obj.color === color
	});
}

Game.prototype.getPlayerPositions = function(color){
	var pieces = this.getPiecesByColor(color);
	return pieces.map( a => parseInt(a.position));
}

Game.prototype.filterPositions = function(positions) {
	return positions.filter(pos => {
		return pos > 10 && pos < 89
	});
};

Game.prototype.unblockedPositions = function(allowedPositions=[], position, color, checking=true){
	position = parseInt(position);
	var unblockedPositions = [];

	if (color == 'white') {
		var myBlockedPositions    = this.getPlayerPositions('white');
		var otherBlockedPositions = this.getPlayerPositions('black');
	}
	else{
		var myBlockedPositions    = this.getPlayerPositions('black');
		var otherBlockedPositions = this.getPlayerPositions('white');
	}
	
	if (this.clickedPiece.hasRank('pawn')) {
		for (var i = 0; i < allowedPositions[0].length; i++) { //attacking moves
			var move = allowedPositions[0][i];
			if (checking && this.my_king_checked(move)) {
				continue;
			}
			if (otherBlockedPositions.indexOf(move) != -1) {
				unblockedPositions.push(move);
			}
		}
		blockedPositions = myBlockedPositions + otherBlockedPositions;
		for (var i = 0; i < allowedPositions[1].length; i++) { //moving moves
			var move = allowedPositions[1][i];
			if (blockedPositions.indexOf(move) != -1) {
				break;
			}
			else if (checking && this.my_king_checked(move, false)) {
				continue;
			}
			unblockedPositions.push(move);
		}
	}
	else{
		for (var i = 0; i < allowedPositions.length; i++) {

			for (var j = 0; j < allowedPositions[i].length; j++) {
				var move = allowedPositions[i][j];
				if (myBlockedPositions.indexOf(move) != -1) {
					break;
				}
				else if (this.clickedPiece.hasRank('king') && this.clickedPiece.position - move == 2) {
					continue;
				}
				else if (checking && this.my_king_checked(move)) {
					continue;
				}
				unblockedPositions.push(move);
				if (otherBlockedPositions.indexOf(move) != -1) {
					break;
				}
			}
		}
	}
		
	return this.filterPositions(unblockedPositions);
}

Game.prototype.getPieceAllowedMoves = function(event, pieceName){
	var piece = this.getPieceByName(pieceName);
	if(this.turn == piece.color){
		this.clearSquares();
		this.setClickedPiece(piece);
		if (event.type == 'dragstart') {
			event.dataTransfer.setData("text", event.target.id);
		}
		var allowedMoves = piece.getAllowedMoves();
		allowedMoves = this.unblockedPositions(allowedMoves, piece.position, piece.color, true);
		this.allowedMoves = allowedMoves;
		return allowedMoves;
	}
	else if (this.clickedPiece && this.turn == this.clickedPiece.color && this.allowedMoves && this.allowedMoves.indexOf(piece.position) != -1) {
		this.kill(piece);
	}
	else{
		return 0;
	}
}

Game.prototype.getPieceByName = function(piecename){
	return this.pieces.filter(obj => {
	  return obj.name === piecename
	})[0];
}

Game.prototype.getPieceByPos = function(piecePosition){
	return this.pieces.filter(obj => {
	  return obj.position === piecePosition
	})[0];
}

Game.prototype.setClickedPiece = function(piece){
	this.clickedPiece = piece;
}

Game.prototype.movePiece = function(event, square=''){
	square = square || event.target;
	if (square.classList.contains('allowed')) {
		var clickedPiece = this.clickedPiece;
		if (clickedPiece) {
			var newPosition = square.getAttribute('id');
			if (clickedPiece.hasRank('king') || clickedPiece.hasRank('pawn'))
				clickedPiece.changePosition(newPosition, true);
			else
				clickedPiece.changePosition(newPosition);
			square.append(clickedPiece.img);
			this.clearSquares();
			this.changeTurn();
			if (this.king_checked(this.turn)) {
				if (this.king_dead(this.turn)) {
					this.checkmate(clickedPiece.color);
				}
				else{
					// alert('check');
				}
			}
		}
		else{
			return 0;
		}
	}
}

Game.prototype.kill = function(piece){
	piece.img.parentNode.removeChild(piece.img);
	piece.img.className = '';
	if (piece.color == 'white') 
		this.whiteSematary.querySelector('.'+piece.rank).append(piece.img);
	else 
		this.blackSematary.querySelector('.'+piece.rank).append(piece.img);

	var chosenSquare = document.getElementById(piece.position);
	this.pieces.splice(this.pieces.indexOf(piece), 1);
	this.movePiece('', chosenSquare);
}

Game.prototype.castleRook = function(rookName){
	var rook = this.getPieceByName(rookName);
	if (rookName.indexOf('Rook2') != -1) 
		var newPosition = rook.position - 2;
	else
		var newPosition = rook.position + 2;

	this.setClickedPiece(rook);
	var chosenSquare = document.getElementById(newPosition);
	chosenSquare.classList.add('allowed');
	this.movePiece('', chosenSquare );
	this.changeTurn();
}

Game.prototype.promote = function(pawn){
	var queenName = pawn.name.replace('Pawn', 'Queen');
	var image = pawn.img;
	image.id = queenName;
	image.src = image.src.replace('Pawn', 'Queen');
	this.pieces.splice(this.pieces.indexOf(pawn), 1);
	this.pieces.push( new Queen(pawn.position, queenName) );
}

Game.prototype.my_king_checked = function(pos, kill=true){
	var piece = this.clickedPiece;
	var originalPosition = piece.position;
	var otherPiece = this.getPieceByPos(pos);
	var should_kill_other_piece = kill && otherPiece && otherPiece.rank != 'king';
	piece.changePosition(pos);
	if (should_kill_other_piece) this.pieces.splice(this.pieces.indexOf(otherPiece), 1);
	if (this.king_checked(piece.color)) {
		piece.changePosition(originalPosition);
		if (should_kill_other_piece) this.pieces.push(otherPiece);
		return 1;
	}
	else{
		piece.changePosition(originalPosition);
		if (should_kill_other_piece) this.pieces.push(otherPiece);
		return 0;
	}
}

Game.prototype.king_dead = function(color){
	var pieces = this.getPiecesByColor(color);
	for (var i = 0; i < pieces.length; i++) {
		var piece = pieces[i];
		this.setClickedPiece(piece);
		var allowedMoves = piece.getAllowedMoves();
		allowedMoves = this.unblockedPositions(allowedMoves, piece.position, piece.color, true);
		if (allowedMoves.length) {
			this.setClickedPiece(null);
			return 0;
		}
	}
	this.setClickedPiece(null);
	return 1;
}

Game.prototype.king_checked = function(color){
	var piece = this.clickedPiece;
	var king = this.getPieceByName(color + 'King');
	var enemyColor = (color == 'white') ? 'black' : 'white';
	enemyPieces = this.getPiecesByColor(enemyColor);
	for (var i = 0; i < enemyPieces.length; i++) {
		this.setClickedPiece(enemyPieces[i]);
		var allowedMoves = enemyPieces[i].getAllowedMoves();
		allowedMoves = this.unblockedPositions(allowedMoves, enemyPieces[i].position, enemyColor, false);
		if (allowedMoves.indexOf(king.position) != -1) {
			this.setClickedPiece(piece);
			king.remove_castling_ability();
			return 1;
		}
	}
	this.setClickedPiece(piece);
	return 0;
}

Game.prototype.clearSquares = function(){
	this.allowedMoves = null;
	var allowedSquares = this.board.querySelectorAll('.allowed');
	for (var i = 0; i < allowedSquares.length; i++) {
		allowedSquares[i].classList.remove('allowed');
	}
	var cllickedSquare = document.getElementsByClassName('clicked-square')[0];
	if (cllickedSquare) {
		cllickedSquare.classList.remove('clicked-square');
	}
}

Game.prototype.checkmate = function(color){
	var endScene = document.getElementById('endscene');
	endScene.getElementsByClassName('winning-sign')[0].innerHTML = color + ' Wins';
	endScene.classList.add('show');
}

var pieces = [
	new Rook(11, 'whiteRook1'),
	new Knight(12, 'whiteKnight1'),
	new Bishop(13, 'whiteBishop1'),
	new Queen(14, 'whiteQueen'),
	new King(15, 'whiteKing'),
	new Bishop(16, 'whiteBishop2'),
	new Knight(17, 'whiteKnight2'),
	new Rook(18, 'whiteRook2'),
	new Pawn(21, 'whitePawn1'),
	new Pawn(22, 'whitePawn2'),
	new Pawn(23, 'whitePawn3'),
	new Pawn(24, 'whitePawn4'),
	new Pawn(25, 'whitePawn5'),
	new Pawn(26, 'whitePawn6'),
	new Pawn(27, 'whitePawn7'),
	new Pawn(28, 'whitePawn8'),

	new Pawn(71, 'blackPawn1'),
	new Pawn(72, 'blackPawn2'),
	new Pawn(73, 'blackPawn3'),
	new Pawn(74, 'blackPawn4'),
	new Pawn(75, 'blackPawn5'),
	new Pawn(76, 'blackPawn6'),
	new Pawn(77, 'blackPawn7'),
	new Pawn(78, 'blackPawn8'),
	new Rook(81, 'blackRook1'),
	new Knight(82, 'blackKnight1'),
	new Bishop(83, 'blackBishop1'),
	new Queen(84, 'blackQueen'),
	new King(85, 'blackKing'),
	new Bishop(86, 'blackBishop2'),
	new Knight(87, 'blackKnight2'),
	new Rook(88, 'blackRook2')
];
var game = new Game(pieces);