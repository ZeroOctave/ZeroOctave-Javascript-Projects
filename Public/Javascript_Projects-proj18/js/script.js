
class Game {
  
  constructor(state){
    this.state = state
  }
  
  // game ready
  ready(){
    const word = this.state.words[this.state.nextWord]
    this.filterWord(word.word)
  }
  
  // filter the word
  filterWord(word){
    console.log(this.state)
    this.state.highScore = this.getHighScore()

    let letters = word.split('')
    let chars = []
    let randLet = []

    const rNum = randNum(letters.length)

    letters.map((letter, i)=>{
      chars.push({ 
        letter: letter, 
        isSame: i === rNum[0] || i === rNum[1] ? true : false
      })
    })

    const randomText = generateMixText(letters, rNum)
   
    randomText.map(ran => {
      randLet.push({
        letter: ran,
        isClicked: false
      })
    })

    this.state.letters.letters = chars
    this.state.ranLetters = randLet
    this.render()
    
  }


  getHighScore() {
    let storage = localStorage.getItem('highscore')
    const now = new Date().getTime()
    if (storage) {
      storage = JSON.parse(storage)
      if(storage.exp > now){
        return storage
      }
    }
  }

  // check letter
  checkLetter(l){

    let randL = this.state.ranLetters
    let letters = this.state.letters.letters
    let letra = this.state.letters.letters.map(l =>{
      return l.letter
    })

    randL.map(ran => {
      if(ran.letter === l){
        ran.isClicked = true
      } 
    })
    
    letters.map(letter => {
      if(letter.letter === l){
        this.state.letters.length = this.state.letters.length + 1
        letter.isSame = true
      }
    })
    
    const n = letra.includes(l)
    n ? this.state.score = this.state.score + 1 : this.state.lives = this.state.lives - 1
    
    this.state.letters.letters = letters
    this.state.ranLetters = randL
  
    this.render()
    
  }

  
  render(){

    const header = document.querySelector('.header')
    header.innerHTML = `<h1>Word Guess</h1>`


    const keyPlacer = document.querySelector('.keysPlacer')
    const l = document.querySelector('.letters')
    
    keyPlacer.innerHTML = this.state.ranLetters.map(t => 
      `<div class="keyText ${t.isClicked ? 'clicked' : ''}" 
          data-letter="${t.letter}">${t.letter.toUpperCase(0)}</div>`
      ).join('')
  
    const keyText = document.querySelectorAll('.keyText')
    
    keyText.forEach(k => {
      k.addEventListener('click', ()=>{
        if(!k.classList.contains('clicked')){
          this.checkLetter(k.dataset.letter, k)
        }
      })
    })
    

    l.innerHTML = this.state.letters.letters.map(l => 
      `<div class="letter">
        <div>${l.isSame ? l.letter.toUpperCase() : ''}</div>
        <div></div>
      </div>`).join('')
    

    wordMeanings(this.state)


    if (this.state.letters.length === this.state.letters.letters.length - 2) {
      this.state.letters.length = 0
      this.state.nextWord = this.state.nextWord + 1
      setTimeout(() => {
        this.ready()
      }, 800)
    }
    
    if(this.state.lives == 0){

      header.innerHTML = `<h1>Game Over!</h1>`

      setLocalStorage(this.state.highScore, this.state.score)


      this.state.letters.length = 0
      this.state.nextWord = 0
      this.state.lives = 10
      this.state.score = 0

      setTimeout(() => {
        this.ready()
      }, 2000)
    }

  }

}
// end of Class Game
  
const setLocalStorage = (highsc, val) => {
  if(highsc == null){
    const time = new Date().getTime()
    const highScore = {
      score: val,
      exp: time + 3600000
    }
    localStorage.setItem('highscore', JSON.stringify(highScore))
    return 
  }
  if(highsc){
    if(val > highsc.score){
      const time = new Date().getTime()
      const highScore = {score: val, exp: time+3600000}
      localStorage.setItem('highscore', JSON.stringify(highScore))
    }
    return 
  }
}




const wordMeanings = (state) => {
  if(state.lives >= 0){

    const type = document.querySelector('.type')
    const meaning = document.querySelector('.meaning')
    const synonyms = document.querySelector('.synonyms')
    const lives = document.querySelector('.lives')
    const score = document.querySelector('.scores')
    
    type.textContent = state.words[state.nextWord].type
    meaning.textContent = state.words[state.nextWord].meaning
    synonyms.textContent = state.words[state.nextWord].synonyms.map(s => `${s},`).join(' ')
    lives.textContent = state.lives
    score.textContent = state.score

    if(state.highScore){
      const now = new Date().getTime()
      
      if(state.highScore.exp > now){
        const highscore = document.querySelector('.highscore')
        highscore.textContent = state.highScore.score
      }

    }


  }

}

const randNum = (num) => {
  const n = []
  const n1 = Math.floor(Math.random() * num)

  n.push(n1)
  let n2 = (n1 - 2)
    n2 < 0 ? n2 = num - 2 : n2
  n.push(n2)
  
  return n.sort()

}



// generate random text
const generateMixText = (letters, rand) => {
  // removes the array from the random number
  let z = letters.filter((l, i) => {
    return rand.indexOf(i) == -1
  })
  // filter duplicate values in the array
  let c = z.filter((l, i)=>{
    return z.indexOf(l) === i
  })
  const l = new Words().words(alphabets)
  // filters alphabets from duplication 
  let d = l.filter(x => {
    return !letters.includes(x)
  })

  let n = 12 - c.length

  for (var x=0; x < n; x++){
    c.push(d[x])
  }
  
  // return a scrambled word
  return new Words().words(c)

}


// state class start
class State {
  
  constructor(words, lives, score, highScore, nextWord, letters, ranLetters ){
    this.words = words;
    this.lives = lives;
    this.score = score;
    this.highScore = highScore;
    this.nextWord = nextWord;
    this.letters = letters;
    this.ranLetters = ranLetters
  }

  static generateWords(){
    return new Words().words(words)
  }

  

  static words(){
    const letters = {
      letters: [{
        letter: '',
        isSame: false
      }],
      length: 0,
      correctLength: 0
    }
    return letters
  }
  
  static ready(){
    return new State(this.generateWords(), 10, 0, {}, 0, this.words(), [])
  }

}
// end of class state


// start of words class
class Words{
  words(words){
    words.sort(() => Math.random() - 0.5)
    return words
  }
}
// end of word class

// start Game
const start = new Game(State.ready()).ready()