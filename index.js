var c = document.getElementById("play-area");
var ctx = c.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 500, 500);

var board = []
for(var i = 0; i < 100; i++){
    var x = []
    for(var j = 0; j < 100; j++){
        x.push("white")
    }
    board.push(x)
}

function drawBoard(b){
    for(var i = 0; i < 100; i++){
        for(var j = 0; j < 100; j++){
            ctx.fillStyle = b[i][j]
            ctx.fillRect(i*5,j*5,5,5)
        }
    }
}
function start(){
    board[10][50] = 'blue';
    board[50][10] = 'red';
    drawBoard(board)
}