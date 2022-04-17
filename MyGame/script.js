const game = {
    pressown: false,
    pressDown: false,
    pressLeft: false,
    pressRight: false
}

const canvasWidth = 800,
    canvasHeight = 800,
    canvas = document.getElementById('canvas'),
    canvasContext = canvas.getContext('2d');

let player = {
    health: 10,
    speed: 10,
    x: canvasWidth/2,
    y: canvasHeight/2,
    r: 20
}


let a = {
    p1: {x: 40, y: 50,},
    p2: {x: 200, y: 500,}
}



canvas.height = canvasHeight;
canvas.width = canvasWidth;

canvasContext.beginPath();
canvasContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
canvasContext.fill();


window.addEventListener('keydown', (event) => {
    if  (event.key === 'w'){
        game.pressUp = true;
    }
    if  (event.key === 'a'){
        game.pressLeft = true;
    }
    if  (event.key === 's'){
        game.pressDown = true;
    }    
    if  (event.key === 'd'){
        game.pressRight = true;
    }
    console.log(event);
});

window.addEventListener('keyup', (event) => {
    if  (event.key === 'w'){
        game.pressUp = false;
    }
    if  (event.key === 'a'){
        game.pressLeft = false;
    }
    if  (event.key === 's'){
        game.pressDown = false;
    }    
    if  (event.key === 'd'){
        game.pressRight = false;
    }
    console.log(event);
});

function updateFrame() {
    canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    if ((game.pressDown) && (player.y < canvasHeight - player.r)) {
        player.y += player.speed;
    };
    if ((game.pressUp) && (player.y > 0 + player.r)) {
        player.y -= player.speed;
    };
    if ((game.pressLeft) && (player.x > 0 + player.r)) {
        player.x -= player.speed;
    };
    if ((game.pressRight) && (player.x < canvasHeight - player.r)) {
        player.x += player.speed;
    };
}

function drawFrame() {
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(a.p1.x, a.p1.y, a.p2.x, a.p2.y);
    // canvasContext.fillRect(obstacle[i])
    canvasContext.fillStyle = 'black';

    canvasContext.beginPath();
    canvasContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    canvasContext.fill();
    
};

function play() {
    updateFrame();
    drawFrame();
    requestAnimationFrame(play);
};

play();