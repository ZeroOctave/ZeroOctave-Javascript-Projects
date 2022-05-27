"use strict";

/** the different directions/orientations a word can flow in the word grid!
 *
 * note: vertical - left -> right
 *		 horizontal - top > bottom
 *		 primary diagonal - upper left corner -> lower right corner
 * 		 secondary diagonal - upper right corner -> lower left corner
 *
 * 'backwards' at the end of the string refers to it going the opposite direction (so
 *  bottom -> top or lower left -> upper right)
 */
var paths = { 

	vert: "vertical",
	horizon: "horizontal",
	priDiag: "primaryDiagonal",
	secDiag: "secondaryDiagonal",

	vertBack: "verticalBackwards",
	horizonBack: "horizonBackwards",
	priDiagBack: "primaryDiagonalBackwards",
	secDiagBack: "secondaryDiagonalBackwards",

};


var bounds = { 

	[paths.vert]: (x, y, s) => (x < s),
	[paths.horizon]: (x, y, s) => (y < s),
	[paths.priDiag]: (x, y, s) => (x < s) && (y < s),
	[paths.secDiag]: (x, y, s) =>  (x < s) && (y >= 0),

	[paths.vertBack]: (x, y, s) => (x >= 0),
	[paths.horizonBack]: (x, y, s) => (y >= 0),
	[paths.priDiagBack]: (x, y, s) => (x >= 0) && (y >= 0),
	[paths.secDiagBack]: (x, y, s) => (x >= 0) && (y < s)

};

/** this object takes the given matrix row/colum and increments it in the 
 * direction of the path given
*/
var incr = { 

	[paths.vert]: (x, y) => ({x: x+1, y: y}),
	[paths.horizon]: (x, y) => ({x: x, y: y+1}),
	[paths.priDiag]: (x, y) => ({x: x+1, y: y+1}),
	[paths.secDiag]: (x, y) => ({x: x+1, y: y-1}),

	[paths.vertBack]: (x, y) => ({x: x-1, y: y}),
	[paths.horizonBack]: (x, y) => ({x: x, y: y-1}),
	[paths.priDiagBack]: (x, y) => ({x: x-1, y: y-1}),
	[paths.secDiagBack]: (x, y) => ({x: x-1, y: y+1})

};
