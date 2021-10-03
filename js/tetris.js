let main = document.querySelector(".main");
let scoreEl = document.querySelector(".score");
let levelEl = document.querySelector(".level");
let start = document.querySelector(".start");
let gameOver = document.querySelector(".gameOver");
let pause = document.querySelector(".pause");
let score = 0;
let level=0;
let speed = 500;
let isPaused = false;
let gameTimer;
let playField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

let figures = {
    O: [
      [1, 1],
      [1, 1],
    ],
    I: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    S: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    L: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  
    T: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
  };
  


let activeCell = {
    x: 0,
    y:0,
    shape: [
        [0,1,0],
        [1,1,1],
        [0,0,0],
    ],

};

function draw() {
    let mainInnerHTMl = "";
    for (i = 0; i < playField.length; i++) {
        for (j = 0; j < playField[i].length; j++) {
            if (playField[i][j] === 1) {
                mainInnerHTMl += `<div class = "cell movingCell"></div>`;
            } else if (playField[i][j] === 2) {
                mainInnerHTMl += `<div class = "cell fixedCell"></div>`;
            } else {
                mainInnerHTMl += `<div class = "cell"></div>`;
            };

        };

    };
    main.innerHTML = mainInnerHTMl

};
draw();


function hasCollisions(){
    for(let y=0; y< activeCell.shape.length; y++) {
        for(let x=0; x<activeCell.shape[y].length;x++){
            if( activeCell.shape[y][x] &&
            (playField[activeCell.y+y] === undefined || 
             playField[activeCell.y + y][activeCell.x +x] === undefined ||
                playField[activeCell.y + y][activeCell.x +x] === 2)
            ){
                return true;
            }
        }   
    }
    return false;
}


function rotate() {
    let prevActiveCellState = activeCell.shape;
    activeCell.shape = activeCell.shape[0].map((val, index) =>
    activeCell.shape.map((row) => row[index]).reverse()
    );
    if(hasCollisions()){
        activeCell.shape = prevActiveCellState;
    }
}


function removeActiveCell() {
    for(let i = 0; i< playField.length; i++){
        for(let j = 0; j< playField[i].length; j++){
            if(playField[i][j] === 1){
                playField[i][j] = 0;
            }
        }
    }
}


function addActiveCell(){
    removeActiveCell();
    for(let y = 0; y<activeCell.shape.length; y++){
        for(let x = 0; x<activeCell.shape[y].length; x++){
            if(activeCell.shape[y][x] === 1){
                playField[activeCell.y + y][activeCell.x + x] = activeCell.shape[y][x]
            }
        }
    }

};
/*
function canMoveDown() {
    for (i = 0; i < playField.length; i++) {
        for (j = 0; j < playField[i].length; j++) {
            if (playField[i][j] === 1) {
                if (i === playField.length - 1 || playField[i + 1][j] === 2) {
                    return false
                }
            }

        }
    }
    return true
}



function moveToDown() {
    if (canMoveDown()) {
        for (i = playField.length - 1; i >= 0; i--) {
            for (j = 0; j < playField[i].length; j++) {
                if (playField[i][j] === 1) {
                    playField[i + 1][j] = 1;
                    playField[i][j] = 0;
                };
            };
        };
    } else {
        fixMove();
    };
};





function canMoveLeft() {
    for (i = 0; i < playField.length; i++) {
        for (j = 0; j < playField[i].length; j++) {
            if (playField[i][j] === 1) {
                if (j === 0 || playField[i][j-1] === 2) {
                    return false
                }
            }

        }
    }
    return true
}



function moveToLeft() {
    if (canMoveLeft()) {
        for (i = playField.length - 1; i >= 0; i--) {
            for (j = 0; j < playField[i].length; j++) {
                if (playField[i][j] === 1) {
                    playField[i][j-1] = 1;
                    playField[i][j] = 0;
                };
            };
        };
    };
};


function canMoveRight() {
    for (i = 0; i < playField.length; i++) {
        for (j = 0; j < playField[i].length; j++) {
            if (playField[i][j] === 1) {
                if (j === 9 || playField[i][j+1] === 2) {
                    return false
                }
            }

        }
    }
    return true
}




function moveToRight() {
    if (canMoveRight()) {
        for (i = playField.length - 1; i >= 0; i--) {
            for (j = 9; j>=0; j--) {
                if (playField[i][j] === 1) {
                    playField[i][j+1] = 1;
                    playField[i][j] = 0;
                };
            };
        };
    };
};

*/
function reset() {
    isPaused = false;
    clearTimeout(gameTimer);
    playField = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       ];
    }

    function moveCellDown() {
        activeCell.y += 1;
        if (hasCollisions()) {
          activeCell.y -= 1;
          fixMove();
          removeFullLines();
          countlevel();
          activeCell.shape = getNewCell();
          activeCell.x = Math.floor(
            (playField[0].length - activeCell.shape[0].length) / 2
          );
          activeCell.y = 0;
          if (hasCollisions()) {
            reset();
            gameOver.style.display = "block";
          }
        }
      }






function fixMove() {
    for (i = 0; i < playField.length; i++) {
        for (j = 0; j < playField[i].length; j++) {
            if (playField[i][j] === 1) {
                playField[i][j] = 2
            }
        }
    }
    
    /*removeFullLines();
    draw();
    playField[0] = [0,1,1,0,0,0,0,0,0,0];
    playField[1] = [0,1,1,0,0,0,0,0,0,0];*/
}



 
function removeFullLines() {
    let canRemoveLine = true;
    for(let i = 0; i<playField.length; i++) {
        for(let j = 0; j<playField[i].length; j++) {
            if(playField[i][j] !== 2){
                canRemoveLine = false;
                break;
            }
      
       }
        if (canRemoveLine) {
            playField.splice(i,1);
            playField.splice(0,0,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            score += 10
        }
        canRemoveLine = true;
    }
        scoreEl.innerHTML = score;
}



function  countlevel() {
    if(score >= 50){
       level += 1;
       score = 0;
       scoreEl.innerHTML = score;
       levelEl.innerHTML = level;
       speed-=100;
    }
    
}

function getNewCell() {
    let prevFigures = "OIZSTL";
    let rand = Math.floor(Math.random() * 6);
    let newCell = figures[prevFigures[rand]];
  
    return newCell;
  }





document.addEventListener("keydown", function (event){
    if (event.key === "ArrowLeft"){
        activeCell.x -= 1
        if(hasCollisions()){
            activeCell.x +=1
        }
    }
    else if(event.key === "ArrowRight"){
        activeCell.x += 1
        if(hasCollisions()){
            activeCell.x -=1
        }

    }
    else if(event.key === "ArrowDown"){
        moveCellDown();
        
    }

    else if(event.key === "ArrowUp"){
        rotate();
    }
    addActiveCell();
    draw();
});

pause.addEventListener("click", (e) => {
   if (e.target.innerHTML === "Pause") {
    e.target.innerHTML = "Keep playing";
   gameTimer = setTimeout(startGame, speed);
    clearTimeout(gameTimer);
   } else {
     e.target.innerHTML = "Pause";
   }
   isPaused = !isPaused;
 });
 start.addEventListener("click", (e) => {
    gameOver.style.display = "none";
    score = 0;
    level = 0;
    speed = 500;
    scoreEl.innerHTML = 0;
    levelEl.innerHTML = 0;
    reset();
    startGame();
    draw();
  });

draw();

 function startGame() {
   if (!isPaused  && gameOver.style.display !== "block")  {
     moveCellDown();
     addActiveCell();
     draw();
   }
   gameTimer = setTimeout(startGame, speed);
 }









/*function startGame() {
    moveCellDown();
    addActiveCell();
    draw();
    setTimeout(startGame, 500)
};

/*function pauseGame() {
    clearTimeout(playPause);
}*/

/*setTimeout(startGame, speed);*/

