import React, { Component } from "react";
import "./TwentyFourtyEight.css";
import { Swipeable } from "react-swipeable";
import {
  ParentContainer,
  BtnGroup,
  OuterBox,
  ScoreContainer,
  ActualScore
} from "./Styles";

// classic = 4x4
// big = 5x5
// bigger = 6x6
// huge = 8x8

const gameObj = {
  4: "_classic",
  5: "_big",
  6: "_bigger",
  8: "_huge"
};

class TwentyFourtyEight extends Component {
  // the game will be of 4x4
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      // matrix: [],
      game: {
        size: "_classic"
      },
      matrix: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ],
      prev: [],
      score: 0,
      prevScore: 0,
      gridChange: false,
      optedForRestart: false
      // very important below

      // matrix: [
      //   [4, null, 2, null],
      //   [4, 128, null, null],
      //   [null, 512, 2, null],
      //   [4, null, 2, null]
      // ]
    };
  }

  componentDidMount() {
    // this.myRef.current.focus();
    this.startOver(4);
    // window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }

  changeGrid = num => {
    if (gameObj[num] !== this.state.game.size) {
      this.startOver(num);
    }
    this.setState({
      gridChange: false
    });
  };

  startOver = sizeArg => {
    let size = sizeArg ? sizeArg : this.state.game.size;
    console.log(size);

    // const gameObj = {
    //   4: "_classic",
    //   5: "_big",
    //   6: "_bigger",
    //   8: "_huge"
    // };

    let m = [];
    let t = Array(size).fill(null);
    for (let i = 0; i < size; i++) {
      m.push(t.slice());
    }
    // let m = [
    //   [null, null, null, null,null],
    //   [null, null, null, null,null],
    //   [null, null, null, null,null],
    //   [null, null, null, null,null],
    //   [null, null, null, null,null],
    // ];
    this.insertNew(m, true);
    this.insertNew(m, true);
    this.setState({
      matrix: m,
      prev: m,
      score: 0,
      prevScore: 0,
      game: {
        ...this.state.game,
        size: gameObj[size]
      },
      optedForRestart: false,
      isGameWon: false,
      continue: false
    });
    this.myRef.current.focus();
  };

  move = (m, el, dir) => {
    // both rows and columns will be equal
    const maxValue = m.length - 1;

    let r = el.rIndex;
    let c = el.cIndex;
    // let v = el.value;

    if (dir === "up" && r !== 0) {
      //shift logic
      while (r !== 0 && !m[r - 1][c]) {
        m[r - 1][c] = m[r][c];
        m[r][c] = null;
        // if (r - 1 > 0) {
        r = r - 1;
        // } else {
        // break;
        // }
      }
    }

    if (dir === "down" && r !== maxValue) {
      while (r !== maxValue && !m[r + 1][c]) {
        m[r + 1][c] = m[r][c];
        m[r][c] = null;
        r = r + 1;
      }
    }

    // c = 3;

    if (dir === "right" && c !== maxValue) {
      while (c !== maxValue && !m[r][c + 1]) {
        m[r][c + 1] = m[r][c];
        m[r][c] = null;
        c = c + 1;
      }
    }

    if (dir === "left") {
      while (c !== 0 && !m[r][c - 1]) {
        m[r][c - 1] = m[r][c];
        m[r][c] = null;
        c = c - 1;
      }
    }
  };

  merge = (mat, ind, dir) => {
    let m = mat.slice();
    let arrIndices = [];
    let t = [];
    let score = this.state.score;
    const maxValue = mat.length - 1;

    if (dir === "up" || dir === "down") {
      ind.forEach((currEl, i) => {
        if (!arrIndices.includes(i)) {
          t = ind.filter((x, j) => {
            if (currEl.cIndex === x.cIndex) {
              arrIndices.push(j);
              return currEl.cIndex === x.cIndex;
            }
            return null
          });

          if (dir === "up") {
            let index = 0;
            let lastIndex;
            t.forEach((currEl, i) => {
              let next = t[i + 1];
              if (i !== lastIndex) {
                if (next) {
                  if (currEl.value === next.value) {
                    m[index][currEl.cIndex] = 2 * currEl.value;
                    m[currEl.rIndex][currEl.cIndex] = 2 * currEl.value; // might seem repetitive, but is needed
                    if (2 * currEl.value === 2048) {
                      this.setState({
                        isGameWon: true
                      });
                    }
                    score = score + 2 * currEl.value;
                    m[next.rIndex][next.cIndex] = null;
                    m[index + 1][currEl.cIndex] = null; // might seem repetitive, but is needed
                    index = index + 1;
                    lastIndex = i + 1;
                  } else {
                    m[index + 1][currEl.cIndex] = null;
                    m[currEl.rIndex][currEl.cIndex] = null;
                    m[index][currEl.cIndex] = currEl.value;
                    index = index + 1;
                  }
                } else {
                  m[currEl.rIndex][currEl.cIndex] = null;
                  m[index][currEl.cIndex] = currEl.value;

                  if (m[index + 1]) {
                    m[index + 1][currEl.cIndex] = null;
                  }

                  index = index + 1;
                  lastIndex = null;
                }
              }
            });
          } else if (dir === "down") {
            let index = maxValue; //max-rows
            let lastIndex;

            t.forEach((currEl, i) => {
              let next = t[i + 1];
              if (next) {
                if (i !== lastIndex) {
                  if (currEl.value === next.value) {
                    m[index][currEl.cIndex] = 2 * currEl.value;
                    score = score + 2 * currEl.value;
                    if (2 * currEl.value === 2048) {
                      this.setState({
                        isGameWon: true
                      });
                    }
                    m[next.rIndex][next.cIndex] = null;
                    m[index - 1][currEl.cIndex] = null;
                    index = index - 1;
                    lastIndex = i + 1;
                  } else {
                    m[index][currEl.cIndex] = currEl.value;

                    m[index - 1][currEl.cIndex] = null;
                    index = index - 1;
                  }
                }
              } else {
                if (i !== lastIndex) {
                  console.log(currEl.rIndex, currEl.cIndex);
                  m[currEl.rIndex][currEl.cIndex] = null;
                  m[index][currEl.cIndex] = currEl.value;
                  if (m[index - 1]) {
                    m[index - 1][currEl.cIndex] = null;
                  }

                  index = index - 1;
                }
              }
            });
          }
        }
      });
    } else if (dir === "right" || dir === "left") {
      if (dir === "right") {
        for (let i = 0; i < m.length; i++) {
          for (let j = m[i].length - 1; j >= 0; j--) {
            if (j !== 0 && m[i][j]) {
              if (m[i][j] === m[i][j - 1]) {
                if (2 * m[i][j] === 2048) {
                  this.setState({
                    isGameWon: true
                  });
                }
                m[i][j] = 2 * m[i][j];
                score = score + 2 * m[i][j];
                m[i][j - 1] = null;
              }
            }
          }
        }

        for (let i = 0; i < m.length; i++) {
          for (let j = m[i].length - 1; j >= 0; j--) {
            if (j !== 0) {
              if (!m[i][j] && m[i][j - 1]) {
                m[i][j] = m[i][j - 1];
                m[i][j - 1] = null;
              }
            }
          }
        }

        // this.setState({
        //   matrix: m
        // });
      } else {
        for (let i = 0; i < m.length; i++) {
          for (let j = 0; j <= m[i].length - 1; j++) {
            if (j !== m[i].length && m[i][j]) {
              if (m[i][j] === m[i][j + 1]) {
                if (2 * m[i][j] === 2048) {
                  this.setState({
                    isGameWon: true
                  });
                }
                m[i][j] = 2 * m[i][j];
                score = score + 2 * m[i][j];
                m[i][j + 1] = null;
              }
            }
          }
        }

        for (let i = 0; i < m.length; i++) {
          for (let j = 0; j <= m[i].length - 1; j++) {
            if (j !== m[i].length - 1) {
              if (!m[i][j] && m[i][j + 1]) {
                m[i][j] = m[i][j + 1];
                m[i][j + 1] = null;
              }
            }
          }
        }

        // this.setState({
        //   matrix: m
        // });
      }
    }

    return score;
  };

  random = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  containsNull = array => {
    let arr = array.map(subArray => {
      let res;
      res = subArray.some(value => {
        return !value;
      });
      return res;
    });
    if (arr.includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  // deepCompare = (m) => {

  // }

  insertNew = (m, init = false) => {
    const maxValue = m.length - 1;
    let flag = init
      ? true
      : JSON.stringify(m) !== JSON.stringify(this.state.matrix);
    if (flag) {
      if (this.containsNull(m)) {
        let value = Math.random() < 0.9 ? 2 : 4;

        let rowIndex = this.random(0, maxValue);
        let colIndex = this.random(0, maxValue);
        while (m[rowIndex][colIndex]) {
          rowIndex = this.random(0, maxValue);
          colIndex = this.random(0, maxValue);
        }

        m[rowIndex][colIndex] = value;
      }
    }
  };

  undoAction = () => {
    this.setState({
      matrix: this.state.prev,
      score: this.state.prevScore
    });
    this.myRef.current.focus();
  };

  swipeToKeyboardEmulator = e => {
    const dir = e.dir.toLowerCase();
    if (dir === "left") {
      this.handleKeyDown({ key: "ArrowLeft" });
    } else if (dir === "right") {
      this.handleKeyDown({ key: "ArrowRight" });
    } else if (dir === "up") {
      this.handleKeyDown({ key: "ArrowUp" });
    } else if (dir === "down") {
      this.handleKeyDown({ key: "ArrowDown" });
    }
  };

  handleKeyDown = async e => {
    const { key } = e;
    let score;
    if (
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown"
    ) {
      let ind = [];
      // let score = this.state.score
      let prevScore = this.state.score

      const clone = items =>
        items.map(item => (Array.isArray(item) ? clone(item) : item));

      let m = clone(this.state.matrix);

      m.forEach((row, i) => {
        row.forEach((element, j) => {
          if (element !== null) {
            ind.push({ rIndex: i, cIndex: j, value: element });
          }
        });
      });

      let hasMatrixChanged;

      if (key === "ArrowLeft") {
        ind.forEach(s => {
          this.move(m, s, "left");
        });

        score = this.merge(m, ind, "left");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.matrix);

        if (hasMatrixChanged) {
          this.insertNew(m);
        }
      } else if (key === "ArrowUp") {
        ind.forEach(s => {
          this.move(m, s, "up");
        });

        score = this.merge(m, ind, "up");
        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.matrix);

        if (hasMatrixChanged) {
          this.insertNew(m);
        }
      } else if (key === "ArrowRight") {
        let colSorted = ind.slice().sort((a, b) => {
          if (a.cIndex > b.cIndex) {
            return -1;
          } else if (a.cIndex < b.cIndex) {
            return 1;
          }
          return 1
        });

        colSorted.forEach(s => {
          this.move(m, s, "right");
        });

        score = this.merge(m, colSorted, "right");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.matrix);

        if (hasMatrixChanged) {
          this.insertNew(m);
        }
      } else if (key === "ArrowDown") {
        ind
          .slice()
          .reverse()
          .forEach(s => {
            this.move(m, s, "down");
          });

        score = this.merge(m, ind.slice().reverse(), "down");

        hasMatrixChanged =
          JSON.stringify(m) !== JSON.stringify(this.state.matrix);

        if (hasMatrixChanged) {
          this.insertNew(m);
        }
      }

      if (hasMatrixChanged) {
        this.setState({
          prev: this.state.matrix,
          matrix: m,
          score,
          prevScore
        });
      }
    }
  };

  onUnload = e => {
    // the method that will be used for both add and remove event
    e.preventDefault();
    e.returnValue = "";
  };

  render() {
    return (
      <>
        <ParentContainer onFocus={() => this.myRef.current.focus()}>
          <BtnGroup>
            <button
              onClick={this.undoAction}
              className="game-btn undo-btn"
              title="Undo last move"
            />
            <button
              onClick={() =>
                this.setState({
                  optedForRestart: !this.state.optedForRestart,
                  gridChange: false
                })
              }
              className="game-btn refresh-btn"
              title="Reset the game"
            />
            <button
              onClick={() =>
                this.setState({
                  optedForRestart: false,
                  gridChange: !this.state.gridChange
                })
              }
              className="game-btn grid-btn"
              title="Change grid size"
            />
          </BtnGroup>

          <Swipeable
            onSwiped={eventData => this.swipeToKeyboardEmulator(eventData)}
            preventDefaultTouchmoveEvent={true}
          >
            <OuterBox
              ref={this.myRef}
              onBlur={() => this.setState({ focus: false })}
              onFocus={() => this.setState({ focus: true })}
              // className="outer-box"
              onKeyDown={e => this.handleKeyDown(e)}
              tabIndex="0"
            >
              {this.state.isGameWon && !this.state.continue && (
                <div className="game-won">
                  <div>Game Won!</div>
                  <div
                    className="game-reset option"
                    onClick={() => this.setState({ continue: true })}
                    style={{ fontSize: "20px", fontWeight: "600" }}
                  >
                    Continue
                  </div>
                </div>
              )}

              {this.state.isGameOver && (
                <div className="game-won">Game Over!</div>
              )}

              {this.state.optedForRestart && (
                <div className="game-won" style={{ flexDirection: "column" }}>
                  Restart?
                  <div
                    style={{
                      display: "flex",
                      fontSize: "50px",
                      width: "inherit",
                      justifyContent: "space-around"
                    }}
                  >
                    <div
                      className="game-reset option"
                      onClick={() => this.startOver(4)}
                    >
                      Yes
                    </div>
                    <div
                      className="game-reset option"
                      onClick={() => this.setState({ optedForRestart: false })}
                    >
                      No
                    </div>
                  </div>
                </div>
              )}

              {this.state.gridChange && (
                <div>
                  <div className="change-grid">
                    <div className="box">
                      <div
                        className={
                          `option` +
                          (this.state.game.size === "_classic"
                            ? ` selected`
                            : ``)
                        }
                        onClick={() => this.changeGrid(4)}
                      >
                        Classic <br />
                        (4x4)
                      </div>
                    </div>
                    <div className="box">
                      <div
                        className={
                          `option` +
                          (this.state.game.size === "_big" ? ` selected` : ``)
                        }
                        onClick={() => this.changeGrid(5)}
                      >
                        Big <br />
                        (5x5)
                      </div>
                    </div>
                    <div className="box">
                      <div
                        className={
                          `option` +
                          (this.state.game.size === "_bigger"
                            ? ` selected`
                            : ``)
                        }
                        onClick={() => this.changeGrid(6)}
                      >
                        Bigger <br />
                        (6x6)
                      </div>
                    </div>
                    <div className="box">
                      <div
                        className={
                          `option` +
                          (this.state.game.size === "_huge" ? ` selected` : ``)
                        }
                        onClick={() => this.changeGrid(8)}
                      >
                        Huge <br />
                        (8x8)
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {this.state.matrix.map((row, i) =>
                row.map((element, j) => (
                  <div
                    key={i + "-" + j}
                    className={
                      `block ` +
                      (element !== null ? `exists ` : ``) +
                      this.state.game.size
                    }
                  >
                    <div
                      className={
                        `inner _` +
                        (this.state.matrix[i][j] !== null
                          ? this.state.matrix[i][j]
                          : ``)
                      }
                    >
                      {this.state.matrix[i][j]}
                    </div>
                  </div>
                ))
              )}
            </OuterBox>
            {/* <button onClick={() => this.startOver(4)}>for 4x4</button>
            <button onClick={() => this.startOver(5)}>for 5x5</button>
            <button onClick={() => this.startOver(6)}>for 6x6</button>
            <button onClick={() => this.startOver(8)}>for 8x8</button> */}
          </Swipeable>

          <ScoreContainer>
            <ActualScore>
              SCORE
              <h3 style={{ margin: 0 }}>{this.state.score}</h3>
            </ActualScore>
          </ScoreContainer>
        </ParentContainer>
        {!this.state.focus && (
          <p style={{ textAlign: "center" }}>
            Tap on any block to continue playing
          </p>
        )}
      </>
    );
  }
}
export default TwentyFourtyEight;
