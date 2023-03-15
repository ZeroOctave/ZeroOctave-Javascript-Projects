"use strict";

/** Sets up the logic of the word search game by inserting the given list of words into 
 * a 2D matrix in various orientations (global objects defined in wordpaths.js)
 *
 * @param {String} gameId ID for the word search grid container
 * @param {String[][]} list 2D array of words to insert into the word matrix
 */

function WordSearchLogic(gameId,list) {

	//object to hold common board variables
	var board = {

		matrix: [], //empty array where the matrix will go
		size: 20 //width + height of the matrix

	};

	//object to hold properties for the current word being fit into matrix
	var thisWord = {

		viablePaths: [], //array of orientations the word can take
		wordFitted: false //whether the word has been set into grid

	};

	//empty object to hold the locations of each fitted word
	var wordLocations = {};

	/** setUpGame is a property of WordSearchLogic that initializes the creation of the 
	 * word matrix!
	 */
	this.setUpGame = function() {

		//creates a 2D array with the given board size
		board.matrix = createMatrix(board.size);

		//fits the list of words into the board matrix
		fitWordsIntoMatrix(list, board.matrix);

		//inserts random letters in the empty indexes of the matrix
		fillWithRandomLetters(board.matrix);

	}

	/** this function creates a matrix 
	 *
	 * @param {Number} size the width and height to create the matrix
	 * @return a 2D square array
	 */
	function createMatrix(size) {

		//creates an array of length size
		var matrix = new Array(size);

		//sets each index inside the array to be another array of length size
		for (var i = 0; i < size; i++) {

			matrix[i] = new Array(size);

		}

		return matrix;

	}

	/** this function loops through the list of words and fits them inside the 2D array
	 * that represents a word search grid of letters!
	 *
	 * @param {String[][]} wordList array of words to fit in matrix
	 * @param {Array[]} matrix to fit words in
	 */
	function fitWordsIntoMatrix(wordList, matrix) {

		//loops through rows
		for (var i = 0; i < wordList.length; i++) {

			//loops through columns
			for (var j = 0; j < wordList[i].length; j++) {

				//removes spaces/apostrophes/the like from the word
				var trimmedWord = trimWord(wordList[i][j]);

				//tries 50 times to fit the word into the matrix
				for (var k = 0; thisWord.wordFitted == false && k < 100; k++) {		

					insertWordIntoMatrix(trimmedWord, matrix);	

				}

				//if the word could not be fitted
				if (thisWord.wordFitted == false) {

					//removes it from the given row of words
					wordList[i] = remove(wordList[i], wordList[i][j]);

					//decrement j so that it doesnt skip any words (since wordList because smaller)
					j--;

				}

				//otherwise, set it to false for next iteration
				else {

					thisWord.wordFitted = false; 

				}	

			}

		}

	}

	/** this function generates random coordinates and tries to check for valid paths the word
	 * can take at that coordinate
	 *
	 * @param {String} word the word to fit inside mtrix
	 * @param {Array[]} matrix the matrix to fit the word in
	 */
	function insertWordIntoMatrix(word, matrix) {

		//random row and column value
		var randX = getRandomNum(matrix.length);
		var randY = getRandomNum(matrix.length);

		//if the index is empty or if the index has the value as the word's starting letter
		if (jQuery.isEmptyObject(matrix[randX][randY]) ||
			matrix[randX][randY] == word.charAt(0)) {

			checkPossibleOrientations(word, matrix, randX, randY);

		}

	}

	/** finds possible orientations for the word to take 
	 *
	 * (shortened parameter names for the sake of brevity)
	 *
	 * @param {String} w word to find valid orientations in
	 * @param {Array[]} m matrix to find paths in
	 * @param {Number} x row to start pathfinding from
	 * @param {Number} y column to start pathfinding from
	 */
	function checkPossibleOrientations(w, m, x, y) {

		/** converts object property names into an array and loops through all the property names
		 * in the forEach() section
		 *
		 * @param {String} i the property name in that particular index
		 */
		Object.keys(paths).forEach(function(i) {

			//checks if the orientation fits using the property name (i) in the paths object
			doesOrientationFit(w, m, x, y, paths[i]);

		});

		//if valid directions for the word were found
		if (thisWord.viablePaths.length != 0) {

			//randomly choose a path to set the word into
			var randIndex = getRandomNum(thisWord.viablePaths.length);
			var finalOrientation = thisWord.viablePaths[randIndex];

			//empty the array of possible paths
			thisWord.viablePaths = [];

			/** add the x-coordinate, y-coordinate, and the final path the word
			 * will take into wordLocations (a handy reference for where all the
			 * words are!)
			 */
			wordLocations[w] = {x: x, y: y, p: finalOrientation};

			//finally sets the word inside the matrix!
			setWordIntoMatrix(w, m, x, y, finalOrientation);

		}

	}
	
	/** properly places the given word into the puzzle array!
	 *
	 * @param {String} w word to set 
	 * @param {Array[]} m matrix to set the word into
	 * @param {Number} x row to start placing the word from
	 * @param {Number} y column to start placing the word from
	 * @param {String} p path the word follows
	 */
	function setWordIntoMatrix(w, m, x, y, p) {

		/** initialized variables: k - for word length
		 *						   x - for matrix row
		 *						   y - for matrix column
		 *
		 * conditions: k - less than total length of word
		 *			   x & y - stay within recommended bounds for orientation p
		 *
		 * increments: k incremented by 1, 
		 *			   x and y incremented by values determined for path p inside  
		 *			   object 'incr'
		 */
		for (var k = 0, x, y; k < w.length; k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {

			m[x][y] = w.charAt(k); //sets the index as the respective character

		}

		//sets whether word is fitted or not to true
		thisWord.wordFitted = true;

	}

	/** checks if the given word fits inside the matrix with the passed in orientation
	 *
	 * @param {String} w word to check
	 * @param {Array[]} m matrix to check against
	 * @param {Number} x starting row
	 * @param {Number} y starting column
	 * @param {String} p orientation/path to check
	 */
	function doesOrientationFit(w, m, x, y, p) {

		//how many letters fit 
		var letterCount = 0;

		//variable to store word length
		var wl = w.length;

		//variable to store matrix length
		var ml = m.length;

		/** initialized variables: k - for word length
		 *						   x - for matrix row
		 *						   y - for matrix column
		 *
		 * conditions: k - less than total length of word
		 *			   x & y - stay within recommended bounds for path p
		 *
		 * increments: k - incremented by 1, 
		 *			   x & y - incremented by values determined for path p inside  
		 *			   object 'incr'
		 */
		for (var k = 0, x, y; k < wl && bounds[p](x, y, ml); k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {

			//check if index is empty or is equal to the letter being checked
			if (jQuery.isEmptyObject(m[x][y]) ||
				m[x][y] == w.charAt(k)) {

				letterCount++;

			}

		}

		//if number of letters that can fit equal the total length of the word
		if (letterCount == wl) {

			//insert the path name into the array for viable paths
			thisWord.viablePaths.push(p);

		}

	}

	/** fills empty indices in the 2D array with randomly generated letters
	 *
	 * @param {Array[]} matrix
	 */
	function fillWithRandomLetters(matrix) {

		//loops through rows
		for (var i = 0; i < matrix.length; i++ ) {

			//loops through columns
			for (var j = 0; j < matrix[i].length; j++) {

				//if empty
				if (jQuery.isEmptyObject(matrix[i][j])) {

					//set index equal to random uppercase letter
					matrix[i][j] = String.fromCharCode(65 + Math.random()*26);

				}

			}

		}

	}

	/**  removes an array element from the array!
	 *
	 * @param {Array} array from which to remove an element from 
	 * @param {*} indexElement (same type of given array) index to remove
	 * @return the array without indexElement
	 */
	function remove(array, indexElement) {

		return array.filter(i => i !== indexElement);

	}

	/** generates a random number!
	 *
	 * @param {Number} bound the max number the generated number can be (excluded)
	 * @return a random number between 0 and bound-1
	 */
	function getRandomNum(bound) {

		return Math.floor(Math.random()*(bound));

	}
	/** 'trims' the given word by removing non-alphanumeric characters 
	 * (alphanumeric characters: [A-Z, a-z, 0-9, _])
	 *
	 * @param {String} word
	 * @return a trimmed string
	 */
	function trimWord(word) {

		return word.replace(/\W/g, "");

	}

	/** getter method for the word search grid the words are placed in
	 * 
	 * @return the 2D matrix
	 */
	this.getMatrix = function() {

		return board.matrix;

	}

	/** getter for the locations and orientations of all the words placed in the 
	 * word search puzzle 
	 *
	 * @return an object containing the coordinates/paths of all placed words
	 */
	this.getWordLocations = function() {

		return wordLocations; 

	}
	/** getter method for list of words to find
	 *
	 * @return a 2D array containing the list of words placed in the grid
	 */
	this.getListOfWords = function() {

		return list;

	}

}