let main = document.querySelector(".main");
let playField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
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
        }
        canRemoveLine = true;
    }
}

/*function creditPoints () {
    let count = 0
    if(removeFullLines){
        count += 1

    }
}*/


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
       activeCell.y += 1
       if(hasCollisions()){
        activeCell.y -=1;
        fixMove();
        activeCell.y = 0;
        }
    }

    else if(event.key === "ArrowUp"){
        rotate();
    }
    addActiveCell();
    draw();
});
    
    /*else if(event.key === " "){
            pauseGame();
    }
    else if(event.key === "Enter"){
            startGame();
    }
    addActiveCell();
    draw();
}*/  

addActiveCell();
draw();

/*let playPause;
function startGame() {
    moveToDown();
    
    draw()
    playPause = setTimeout(startGame, 500)
};

function pauseGame() {
    clearTimeout(playPause);
}

setTimeout(startGame, 500);*/
