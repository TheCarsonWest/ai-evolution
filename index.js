/* future:
*/

// Control Variables
// Population
var pop = 100;

// Player
var maxTraits = 3;

// World
var numGemerations = 2;
var numTurns = 1;

var c = document.getElementById("play-area");
var ctx = c.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 500, 500);


var pl = [] // x, y, [behaviors], color
var board = []; 
for (var i = 0; i < 100; i++) {
    var x = [];
    for (var j = 0; j < 100; j++) {
        x.push(["white",'b']);
    }
    board.push(x);
}

function drawPlayers(){
    for (var i = 0; i < 100; i++) { // Clear board
        var x = [];
        for (var j = 0; j < 100; j++) {
            x.push(["white",'b']);
        }
        board[i] = x;
    }
    for(var i = 0; i < pl.length; i++){

        board[pl[i][0]][pl[i][1]] = [pl[i][3],pl[i]];

    }

}

function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function drawBoard(b) {
    drawPlayers();
    for (var i = 0; i < 100; i++) {
        for (var j = 0; j < 100; j++) {
            ctx.fillStyle = b[i][j][0];
            ctx.fillRect(i * 5, j * 5, 5, 5);
        }
    }
}
drawBoard(board);





var b = {
    doNothing: function(){   console.log("")   },
    moveUp: function(p){ 
        
        if(pl[p][1] != 99 && board[pl[p][0]][pl[p][1]+1][1] == 'b'){
            
            pl[p][1] += 1;
        }
    },
    moveDown: function(p){
        if(pl[p][1] !=0 && board[pl[p][0]][pl[p][1]-1][1] == 'b'){
        pl[p][1] -= 1;
    }
    },
    moveLeft: function(p){
        if(pl[p][0] != 0 && board[pl[p][0]-1][pl[p][1]][1] == 'b'){
        pl[p][0] -= 1;
    }},
    moveRight: function(p){
        if(pl[p][0] != 99 && board[pl[p][0] +1][pl[p][1]][1] == 'b'){
        pl[p][0] += 1;
    }}
};

var bList = ["doNothing","moveUp","moveLeft","moveRight"];

function generateBehavior(){
    t = []
    for(var i = Math.floor(Math.random()*maxTraits)+1; i > 0; i--){
        t.push(bList[Math.floor(Math.random()*bList.length)]);
    }

    return t;
} 

function spawn(pop) { // all pl spawn green, but after the first redraw get their color
    for (var i = 0; i < pop; i++) {
        var isNotOverride = true;
        while (isNotOverride) {
            var col = Math.floor(Math.random() * board.length);

            var row = Math.floor(Math.random() * board[col].length);
            isNotOverride = board[col][row] === 'green';
        }

        // Create an object with x and y properties
        pl.push([col, row, generateBehavior(), getRandomHexColor()])

        board[col][row] = ['Green',pl[i]];

    }
}
spawn(pop);

drawBoard(board);
function start() {
    for(var l = 0; l < numGemerations; l++){
        for(var i = 0; i < numTurns; i++){ // simulation steps loop
            for(var j = 0; j < pl.length; j++){ // Run every player

                for(var k = 0; k < pl[j][2].length ; k++){ // Run every player's behaviors
                    b[pl[j][2][k]](j);
                    
                }
            }
            drawBoard(board);
        }
    }
}

