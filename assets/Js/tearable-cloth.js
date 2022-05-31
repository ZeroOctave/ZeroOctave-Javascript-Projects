window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1e3 / 60)
  }
function randint(min, max) {
  return Math.floor(Math.random() * max) + min
}
let accuracy = 5
let gravity = 400
let wind = 0
let cWind = 0
let clothY = 24
let clothX = 50
let spacing = 8
let tearDist = 60
let friction = 0.99
let bounce = 0.5
let noTop = false
let thickness = 1
let clothColors = ["black", "green", "yellow", "blue", "red", "orange", "lime"]
let cc = 0
let pattern = true
let pattern1 = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
let pattern2 = ["green", "blue", "lime", "skyblue"]
let pattern3 = ["red", "orange", "yellow"]
let pattern4 = ["orange", "purple"]
let pinkType = ["pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink", "white", "pink"]

let blocks = []
for (var i = 0; i < 3; i++) {
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
  blocks = blocks.concat(pinkType)
}

let patterns = [blocks, pattern1, pattern2, pattern3, pattern4]
let cp = 0
let cpl = 0
let cPattern = 0
let blocksNow = false
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

canvas.width = Math.min(700, window.innerWidth)
canvas.height = 400

ctx.strokeStyle = '#555'
function drawRect(color, x, y, width, height) {
ctx.fillStyle=color;
ctx.fillRect(x, y, width, height); 

}
let mouse = {
  cut: 8,
  influence: 36,
  down: false,
  button: 1,
  x: 0,
  y: 0,
  px: 0,
  py: 0
}

class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.px = x
    this.py = y
    this.vx = 0
    this.vy = 0
    this.pinX = null
    this.pinY = null

    this.constraints = []
  }

  update (delta) {
    if (this.pinX && this.pinY) return this

    if (mouse.down) {
      let dx = this.x - mouse.x
      let dy = this.y - mouse.y
      let dist = Math.sqrt(dx * dx + dy * dy)

      if (mouse.button === 1 && dist < mouse.influence) {
        this.px = this.x - (mouse.x - mouse.px)
        this.py = this.y - (mouse.y - mouse.py)
      } else if (dist < mouse.cut) {
        if (blocksNow == false) {
        this.constraints = []
        }
      }
    }
    if (wind !== 0) {
      if (5 == randint(0, 50000)) {
        cWind = randint(wind - 50, 100)
        
        
      }
    }
    this.addForce(cWind, gravity)

    let nx = this.x + (this.x - this.px) * friction + this.vx * delta
    let ny = this.y + (this.y - this.py) * friction + this.vy * delta

    this.px = this.x
    this.py = this.y

    this.x = nx
    this.y = ny

    this.vy = this.vx = 0

    if (this.x >= canvas.width) {
      this.px = canvas.width + (canvas.width - this.px) * bounce
      this.x = canvas.width
    } else if (this.x <= 0) {
      this.px *= -1 * bounce
      this.x = 0
    }

    if (this.y >= canvas.height) {
      this.py = canvas.height + (canvas.height - this.py) * bounce
      this.y = canvas.height
    } else if (this.y <= 0) {
      this.py *= -1 * bounce
      this.y = 0
    }

    return this
  }

  draw () {
    let i = this.constraints.length
    while (i--) this.constraints[i].draw()
  }

  resolve () {
    if (this.pinX && this.pinY) {
      this.x = this.pinX
      this.y = this.pinY
      return
    }

    this.constraints.forEach((constraint) => constraint.resolve())
  }

  attach (point) {
    this.constraints.push(new Constraint(this, point))
  }

  free (constraint) {
    this.constraints.splice(this.constraints.indexOf(constraint), 1)
  }

  addForce (x, y) {
    this.vx += x 
    this.vy += y
  }

  pin (pinx, piny) {
    this.pinX = pinx
    this.pinY = piny
  }
}

class Constraint {
  constructor (p1, p2) {
    this.p1 = p1
    this.p2 = p2
    this.length = spacing
  }

  resolve () {
    let dx = this.p1.x - this.p2.x
    let dy = this.p1.y - this.p2.y
    let dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < this.length) return

    let diff = (this.length - dist) / dist
    if (blocksNow == false) {
    if (dist > tearDist) this.p1.free(this)
      }
    let mul = diff * 0.5 * (1 - this.length / dist)

    let px = dx * mul
    let py = dy * mul

    !this.p1.pinX && (this.p1.x += px)
    !this.p1.pinY && (this.p1.y += py)
    !this.p2.pinX && (this.p2.x -= px)
    !this.p2.pinY && (this.p2.y -= py)

    return this
  }

  draw () {
    ctx.moveTo(this.p1.x, this.p1.y)
    ctx.lineTo(this.p2.x, this.p2.y)
  }
}

class Cloth {
  constructor (free) {
    this.points = []

    let startX = canvas.width / 2 - clothX * spacing / 2

    for (let y = 0; y <= clothY; y++) {
      for (let x = 0; x <= clothX; x++) {
        let point = new Point(startX + x * spacing, 20 + y * spacing)
        !free && y === 0 && point.pin(point.x, point.y)
        x !== 0 && point.attach(this.points[this.points.length - 1])
        y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)])

        this.points.push(point)
      }
    }
  }

  update (delta) {
    let i = accuracy

    while (i--) {
      this.points.forEach((point) => {
        point.resolve()
      })
    }
    ctx.beginPath()
    ctx.strokeStyle=clothColors[cc];
    if (pattern == false) {
    ctx.lineWidth=thickness
    }
    this.points.forEach((point) => {
      point.update(delta * delta).draw()
    })
    if (pattern == false) {
    ctx.stroke()
    }
    if (pattern == true) {
    this.points.forEach((point) => {
        cPattern = patterns[cp]
        drawRect(cPattern[cpl], point.x - (spacing + 5), point.y - (spacing + 5), spacing + 5, spacing + 5)
        cpl += 1
        if (cpl >= cPattern.length) {
          cpl = 0
      }
      })
    cpl += cPattern.length - 1
    }     

}
}
function setMouse(e) {
  let rect = canvas.getBoundingClientRect()
  mouse.px = mouse.x
  mouse.py = mouse.y
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

window.onmousedown = (e) => {
  mouse.button = e.which
  mouse.down = true
  setMouse(e)
}

canvas.onmousemove = setMouse

window.onmouseup = () => (mouse.down = false)

canvas.oncontextmenu = (e) => e.preventDefault()

let cloth = new Cloth()

function zeroG() {
  gravity = 0
  noTop = true
  cloth = new Cloth(noTop)
}
function Gravity() {
  gravity = 400
  noTop = false
  cloth = new Cloth(noTop)
}
function addWind() {
  wind += 10
  
}
function removeWind() {
  wind -= 10
  
}
function bigger() {
  spacing += 1
  
}
function smaller() {
  if (spacing > 1) {
  spacing -= 1
  
  }
}
function thick() {
  thickness = 10
}
function thin() {
  thickness = 1
}

function messup() {
  spacing = -2
  tearDist = 60
  cloth = new Cloth(noTop)
}
function colorChange() {
  cc += 1
  pattern = false
  if (cc >= clothColors.length) {cc = 0}
}
function patternChange() {
  cp += 1
  pattern = true
  thickness = 0
  if (cp >= patterns.length) {
    cp = 0
    
  }
}

function resetCloth() {
  cloth = new Cloth(noTop)
}
;(function update (time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  cloth.update(0.016)
  document.getElementById("meters").innerHTML = 'Wind MPH: ' + Math.round(wind / 10) + ', Size: ' + spacing + ', Strength: ' + Math.round(tearDist)
  if (blocksNow == true) {
  document.getElementById("directions").innerHTML = "Drag with your mouse, right-click to slice. "
  }
  else {
  document.getElementById("directions").innerHTML = "Drag with your mouse, right-click to slice. "
  }
  if (cp == 0) {if (pattern == true) {blocksNow = true}}
    else {
    blocksNow = false
      }
    if (pattern == false) {
    blocksNow = false
      }
  window.requestAnimFrame(update)
})(0)
