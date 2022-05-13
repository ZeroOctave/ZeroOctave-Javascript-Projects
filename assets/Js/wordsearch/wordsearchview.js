"use strict";

/** This object contains the necessary functions to create the 'view' of the word search,
 * which essentially refers to displaying the puzzle and handling mouse events!
 *
 * @author Noor Aftab
 * 
 * @param {Array[]} matrix - 2D array containing the filled word search grid
 * @param {Array[]} list - 2D array containing the list of words in the grid
 * @param {String} gameId - div ID for the word search container
 * @param {String} listId - div ID for the container displaying list of words to find
 * @param {String} instructionsId - ID for the h2 heading, to update as necessary
 */

function WordSearchView(matrix, list, gameId, listId, instructionsId) {

	"use strict";

	//variable to store if the puzzle was solved by the player or by the solve button!
	var selfSolved = true;

	//object to hold oft-used class/id/attribute names!
	var names = { 

		cell: "cell",
		pivot: "pivot",
		selectable: "selectable",
		selected: "selected",
		path: "path"

	};
 	
 	//object to hold oft-used class/id selectors 
	var select = {  

		cells: "." + names.cell,
		pivot: "#" + names.pivot,
		selectable: "." + names.selectable,
		selected: "." + names.selected

	};

	var searchGrid = {

		row: "row",
		column: "column"

	};

	/* creates the word search puzzle grid and the table containing the list
	 * of words to find
	 */
	 this.setUpView = function() {

		createSearchGrid(matrix, names.cell, searchGrid.row, searchGrid.column, gameId);
		createListOfWords(list, listId);

	}

	/** used strings because it was easy enough for a small program like this, wanted
	to explore jQuery's capabilities! **/

	/** used buttons because <td> would expand when adding border when found - stylistic purposes**/

	/** this funcion makes a 'table' of divs to store each letter in the matrix of letters
	 * created in wordsearchlogic.js
	 *
	 * @param {Array[]} matrix
	 * @param {String} cellName
	 * @param {String} rowAttr
	 * @param {String} colAttr
	 * @param {String} boardId
	 */
	function createSearchGrid(matrix, cellName, rowAttr, colAttr, boardId) {

		//loops through rows
		for (var i = 0; i < matrix.length; i++) {

			//creates a div for the table row and gives it a row class
			var row = $("<div/>");
			row.attr({class: "boardRow"});  //only really used once, so it's not in a variable

			//loops through columns
			for (var j = 0; j < matrix[i].length; j++) {

				//each letter in the row is a button element
				var letter = $("<button/>");  //i hearbuttons are preferred for clickable actions
				
				//the letter is given a cell class, and given row and column attributes!
				letter.attr({
					class: cellName, 
					[rowAttr]: i, 
					[colAttr]: j}).text(matrix[i][j]); //sets text of button to the respective matrix index

				//adds letter to the larger row element
				letter.appendTo(row);

			}

			//adds the row of letters to the larger game board element
			row.appendTo($(boardId));
		}

	}

	/** This function creates a table-type object to insert all the words
	 * contained in the word search puzzle! players refer to this table
	 * when looking for words to find 
	 *
	 * @param {Array[]} wordList a matrix of words to insert into list container
	 * @param {String} wordListId the ID of the container! 
	 */
	function createListOfWords(wordList, wordListId) {

		//loops through rows
		for (var i = 0; i < wordList.length; i++) {

			//creates a div for the row
			var row = $("<div/>");
			row.attr({class: "listRow"}); //gives the rows a list row class

			//loops through columns
			for (var j = 0; j < wordList[i].length; j++) {

				//each individual word is a list item element!
				var word = $("<li/>");

				//they're given a list word class, and an attribute containing it's trimmed text (as in the puzzle)
				word.attr({class: "listWord", text: wordList[i][j].replace(/\W/g, "")});

				//given text from it's respected list index
				word.text(wordList[i][j]);

				//added to the larger list row element
				word.appendTo(row);

			}

			//row of words added to the larger word list div
			row.appendTo($(wordListId));

		}

	}

	/** this function solves the puzzle for the player!
	 *
	 * @param {Object} loc an object containing the locations of all the words to find in the puzzle!
	 * @param {Array[]} matrix the grid in which the words are placed in!
	 */
	this.solve = function(wordLoc, matrix) {

		/** converts the object into an array and loops through each index to find 
		 * the word with the coordinates/orientation properties, setting the words to found!
		 *
		 * @param {String} word - the (trimmed) word placed in the puzzle
		 */
		Object.keys(wordLoc).forEach(function(word) {  	

			//path of the word
			var p = wordLoc[word].p;

			//the x and y value the word starts from
			var startX = wordLoc[word].x;
			var startY = wordLoc[word].y;

			/** initialized variables: k - for word length
			 *						   x - for starting x/row
			 *						   y - for starting y/column
			 *
			 * conditions: k - less than total length of word
			 *
			 * increments: k - incremented by 1, 
			 *			   x & y - incremented by x & y functions for path p inside  
			 *			   object 'incr'
			 */
			for (var k = 0, x = startX, y = startY; k < word.length; k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {

				//finds the puzzle cell with the respective x and y value and sets it as found
				$(select.cells + "[row = " + x + "][column = " + y + "]").addClass("found");	

			}

			//set to false since the program solved it for the player
			selfSolved = false;

			//checks if valid word made (which it was)
			validWordMade(list, word, instructionsId);	
	
		});

	}

	/** this function encapsulates all the mouse events for making a move by breaking it down 
	 * into three main parts: pressing the mouse down (mousedown), dragging it (mouseenter), 
	 * and finally releasing the mouse (mouseup)!
	 */
	 this.triggerMouseDrag = function() {	

	 	//empty array to store the selected cells in a move
		var selectedLetters = [];

		// //empty string to store the word made by a 
		var wordMade = ''; 

	 	//variable to store if the mouse is down
		var mouseIsDown = false;	

	 	/** executes when the mouse is pressed down on a letter in the 
	 	 * search grid
	 	 */
		$(select.cells).mousedown(function() {
			
			//sets true that mouse is down
			mouseIsDown = true;

			//selects the pressed cell
			$(this).addClass(names.selected);

			//sets the pressed cell to be the 'pivot' of the move
			$(this).attr({id: names.pivot});

			//highlights all the possible paths the user may go to select more letters
			highlightValidDirections($(this), matrix, names.selectable);

		});

		/** this code executes when the mouse is down and the user starts moving their
		 * mouse inside the puzzle container!
		 */
		$(select.cells).mouseenter(function() {  
			
			//ensures the mouse is down and the cell the mouse is on is on a valid path
			if (mouseIsDown && $(this).hasClass(names.selectable)) {  

				//holds the direction of the path the mouse is currently on
				var currentDirection = $(this).attr(names.path);  

				//unselects selected cells
				for (var i = 0; i < selectedLetters.length; i++) {

					selectedLetters[i].removeClass(names.selected);

				}

				//empties the array of selected letters
				selectedLetters = [];

				//empties string of the word being constructed 
				wordMade = '';

				//resets the range of cells to select
				var cells = selectCellRange(select.cells, $(this), names.path, currentDirection, selectedLetters, wordMade);

				wordMade = cells.word;
				selectedLetters = cells.array;

			}

		});

		/** this code calls the endMove function when the mouse is released - it mostly checks 
		 * the word made and whether it's a word to be found, as well as resetting variables 
		 * to allow another move 
		 */
		$(select.cells).mouseup(function() {

			endMove();

		});

		/** if the user is playing the game and moves their mouse out of the word grid, this function
		 * makes it so that the move automatically ends - this makes pressing the mouse down and 
		 * accidentally/purposely leaving the board less annoying to deal with!
		 */
		$(gameId).mouseleave (function() {

			if (mouseIsDown) { //checks that the user is indeed pressing their mouse down (therefore, playing)

				endMove();

			}	

		});

		/** this function handles everything ending a move should consist of - resetting variables
		 * for a new move and checking if a proper word to find has been made
		 */
		function endMove() {

			//sets mouse down as false since the mouse is now up
			mouseIsDown = false;

			//checks if a word on the list was selected
			if (validWordMade(list, wordMade, instructionsId)) {

				$(select.selected).addClass("found");

			}

			//unselects any selected letters
			$(select.selected).removeClass(names.selected);

			//removes the direction attributes of any cells (prevents strange behavior)
			$(select.cells).removeAttr(names.path);

			//removes the pivot's ID so a new pivot can be selected 
			$(select.pivot).removeAttr("id");

			//remove selectability of selectable cells 
			$(select.selectable).removeClass(names.selectable);

			//empties the word string and selected cells' array
			wordMade = '';
			selectedLetters = [];

			}

	}

	/* highlights all the valid directions in the matrix from where mouse is first clicked, like
	 * top -> bottom, left -> right, and both diagonals!
	 *
	 * @param {jQuery} selectedCell - DOM element the mouse pressed down on (a cell in the word search puzzle!)
	 * @param {Array[]} matrix - the puzzle 2D array
	 * @param {String} makeSelectable - selector to make an element selectable
	 */
	function highlightValidDirections(selectedCell, matrix, makeSelectable) {

		//gets the row and column of where the cell the mouse pressed on is
		var cellRow = parseInt(selectedCell.attr(searchGrid.row));
		var cellCol = parseInt(selectedCell.attr(searchGrid.column));

		//converts the global paths object into an array
		Object.keys(paths).forEach(function(path) { //path - each property's name (e.g. 'vert', 'priDiagBack')

			//makes each cell in each of the paths selectable
			makeRangeSelectable(cellRow, cellCol, matrix.length, paths[path], makeSelectable);

		});

	}

	/** this functions makes a given path selectable but giving each cell in the path a 'selectable' class! 
	 * this makes it so that the player can only select cells on specific paths (which makes selecting vertically, 
	 * horizontally, and diagonally much less of a hassle!)
	 *
	 * @param {Number} x - starting x-coordinate/row of the path
	 * @param {Number} y - starting y-coordinate/column of the path
	 * @param {Number} l - length/size of the matrix
	 * @param {String} p - name of the path (e.g. vertical, primaryDiagonalBackwards)
	 * @param {String} selectable - selector to make a DOM element selectable
	 */
	function makeRangeSelectable(x, y, l, p, selectable) {  

		/** initialized variables: x - starting row, incremented to exclude the pivot
		 *						   y - starting column, incremented to exclude the pivot					   
		 *
		 * condition: x & y to stay within recommended bounds for path p 
		 *			  (determined by object bounds)
		 *
		 * increments: x & y - incremented by function determined for path p (by  
		 *			   object 'incr')
		 */
		for (var i = incr[p](x, y).x, j = incr[p](x, y).y;  //initialized variables
			bounds[p](i, j, l);  							//condition
			i = incr[p](i, j).x, j=incr[p](i, j).y) {		//increments

			//select the specific DOM elements with the specific row/column attribute values
			$("[" + searchGrid.row + "= " + i + "][" + searchGrid.column + "= " + j + "]")
				.addClass(selectable) //makes it selectable
				.attr({[names.path]: p}); //gives it a path attribute with the value of p

		}

	}

	/** this function finds and selects the range of cells from the pivot (first selected cell) to
	 * the cell the mouse is currenty hovering on, altogether going from end to end on the puzzle
	 * matrix
	 *
	 * @param {String} cellsSelector - selector name for cells in the search grid
	 * @param {Array} selectedCells
	 * @param {jQuery} hoveredCell - cell the mouse is hovering on
	 * @param {String} pathAttr - path/direction attribute 
	 * @param {String} path - value of the path attribute
	 * @param {String} wordConstructed - word user makes by dragging around on the puzzle
	 * @return returns an object containing: the word constructed and the array of selected DOM cells!
	 */
	function selectCellRange(cellsSelector, hoveredCell, pathAttr, path, selectedCells, wordConstructed) {

		//variable to hold index of cell hovered on
		var hoverIndex;

		//variable to hold index of pivot
		var pivotIndex;  

		//selector for cells in the particular path the mouse is on
		var cellRange = cellsSelector + "[" + pathAttr + " =" + path + "]";

		//setting indices depending on how the paths flow
		switch(path) {

			case paths.vert:
			case paths.horizon:
			case paths.priDiag: 
			case paths.secDiag:				

				//hoverIndex > pivotIndex 
				hoverIndex = hoveredCell.index(cellRange)+1;
				pivotIndex = 0;

				//sets up wordConstructed with the pivot's letter (to start it off)
				wordConstructed = $(select.pivot).text();

				//using the pivot text, selects cells and adds their text to wordConstructed
				wordConstructed = selectLetters(selectedCells, wordConstructed, cellRange, pivotIndex, hoverIndex);
				

				break;
			
			case paths.vertBack:   
			case paths.horizonBack:
			case paths.priDiagBack:
			case paths.secDiagBack:

				//hoverIndex < pivotIndex
				hoverIndex = hoveredCell.index(cellRange);
				pivotIndex = $(cellRange).length;

				//selects range of cells between the pivot and the cell the mouse is on
			 	wordConstructed += selectLetters(selectedCells, wordConstructed, cellRange, hoverIndex, pivotIndex);

			 	//adds pivot text to the end
				wordConstructed += $(select.pivot).text();

				break;

		}

		return {word: wordConstructed, array: selectedCells};
		
	}

	/** this function selects the range of cells between the pivot cell and the
	 * the cell the mouse is hovered, and adds their text to the constructed word's string
	 *
	 * @param {Array} selectedCells - array to hold 
	 * @param {String} wordConstructed - word being created by user
	 * @param {String} range - the path on which to select cells
	 * @param {Number} lowerIndex - index of the lower cell
	 * @param {Number} upperIndex - index of the higher cell
	 * @return returns the word made during the selection process!
	 */
	function selectLetters(selectedCells, wordConstructed, range, lowerIndex, upperIndex) {

		//only goes through the the range between the pivot and wherever the mouse is on the path!
		$(range).slice(lowerIndex, upperIndex).each(function() {

			//selects the cell
			$(this).addClass(names.selected);

			//adds it to the array of cells
			selectedCells.push($(this));

			//updates the word being made to include the newest cell's letter
			wordConstructed += $(this).text();

		});

		return wordConstructed;

	}
	
	/** checks if the word a user made after a move is an actual word to find, and 
	 * if so, sets the word as found! otherwise, nothing happens (so the move is 
	 * essentially ignored)
	 *
	 * @param {Array[]} wordList - matrix of words in the grid
	 * @param {String} wordToCheck - word to check for validity
	 * @param {String} instructionsId - selector for the h2 heading
	 * @return true if the word made is a word in the list
	 */
	function validWordMade (list, wordToCheck, instructionsId) {

		//loops through rows
		for (var i = 0; i < list.length; i++) {

			//loops through columns
			for (var j = 0; j < list[i].length; j++) {

				//trims the word at the index (to make comparison easier)
				var trimmedWord = list[i][j].replace(/\W/g, "")

				//if the word user made is the same as the trimmed word, or the reverse of it
				if (wordToCheck == trimmedWord ||
					wordToCheck == reversedWord(trimmedWord)) {
					
					//sets the word inside the list div as found (changes color, strikethroughs text)
					$(".listWord[text = " + trimmedWord + "]").addClass("found");

					//checks if the last word to find was found
					checkPuzzleSolved(".listWord", ".listWord.found", instructionsId);
					
					return true;
									
				}

			}

		}

	}	

	/** checks if all the words in the puzzle have been found, what method was used to 
	 * solve the puzzle, and updates the h2 instructions heading accordingly
	 *
	 * @param {String} fullList - selector for words in the wordlist div
	 * @param {String} foundWordsList - selector found words in the wordlist div
	 * @param {String} instructionsId - selector for h2 instructions heading
	 * @return true if the entire word search has been solved
	 */
	function checkPuzzleSolved (fullList, foundWordsList, instructionsId) {

		//if all the words in the list to find have been found (no. of words to find == no. of found words)
		if ($(fullList).length == $(foundWordsList).length) {

			//if user solved the puzzle themselves
			if (selfSolved) {

				//updates h2 text
				$(instructionsId).text("You got 'em all! :D");

			}

			//if user used the solve button 
			else {

				//updates h2 text
				$(instructionsId).text("We solved it for you! :~)");

			}	

			return true;

 		}

 		return false;

	}

	/** reverses a string! (e.g. 'muscat' becomes 'tacsum')
	 *
	 * @param {String} word - word to reverse
	 * @return the reversed word
	 */
	function reversedWord(word) {

		//creates empty string to store reversed word
		var reversedWord = "";

		//loops through from end of word to the beginning (instead of traditional beginning to end)
		for (var i = word.length - 1; i >= 0; i--) {

			//adds the character to reversed word
			reversedWord += word.charAt(i);

		}

		return reversedWord;

	}

}