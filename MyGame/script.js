const game = {
    pressown: false,
    pressDown: false,
    pressLeft: false,
    pressRight: false,
    hitboxes: false
}

let mainCharImg = new Image();
mainCharImg.src = 'images/main_character.png';

const canvasWidth = 800,
    canvasHeight = 800,
    canvas = document.getElementById('canvas'),
    canvasContext = canvas.getContext('2d');

let player = {
    health: 10,
    speed: 10,
    x: canvasWidth/2,
    y: canvasHeight/2,
    r: 20,
    angle: 180/Math.PI
}


let obstacle = [
    // p1: ,
    // p2: {x: 50, y: 50},
    // p3: {x: 20, y: 20},
    // p4: {x: 50, y: 50}
];

obstacle[0] = {
    p1: {x: 100, y: 100},
    p2: {x: 40, y: 50}
};

let a = {
    p1: {x: 100, y: 0,},
    p2: {x: 200, y: 0,}
}

let mouseX, mouseY;

canvas.height = canvasHeight;
canvas.width = canvasWidth;

canvasContext.beginPath();
canvasContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
canvasContext.fill();

let hbButton = document.querySelector('.hitboxes');

let scopeOffset = {
    x: player.x + (mouseX - player.x) / 2,
    y: player.y - (mouseY + player.y) / 2
}


window.addEventListener('mousemove', (e) => {
    canvasContext.fillStyle = 'blue';
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    // console.log(mouseX, mouseY);

})

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
    if  (event.key === 'h') {
        if (game.hitboxes === false) {
            game.hitboxes = true;
        } else {
            game.hitboxes = false;
        }
    }
    // console.log(event);
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
    
    // console.log(event);
});

canvas.addEventListener('mousedown', countAngle());

function countAngle() {
    console.log(player.angle);
};


function updateFrame() {
    canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    if (((game.pressDown) && (player.y < canvasHeight - player.r)) && !((((a.p1.x - player.r) < player.x) && ((a.p2.x + a.p1.x + player.r) > player.x)) && ((a.p1.y - player.r) === player.y))) {
        player.y += player.speed;
    };
    if ((game.pressUp) && (player.y > 0 + player.r) && !((((a.p1.x - player.r) < player.x) && ((a.p2.x + a.p1.x + player.r) > player.x)) && ((a.p1.y + a.p2.y + player.r) === player.y))) {
        player.y -= player.speed;
    };
    if ((game.pressLeft) && (player.x > 0 + player.r) && !((((a.p1.y - player.r) < player.y) && ((a.p2.y + a.p1.y + player.r) > player.y)) && ((a.p1.x + a.p2.x + player.r) === player.x))) {
        player.x -= player.speed;
    };
    if ((game.pressRight) && (player.x < canvasHeight - player.r) && !((((a.p1.y - player.r) < player.y) && ((a.p2.y + a.p1.y + player.r) > player.y)) && ((a.p1.x - player.r) === player.x))) {
        player.x += player.speed;
    };

    // player.angle = Math.atan2(mouseY - player.y,mouseX - player.x);
}

function drawFrame()  {
    // obstacle.forEach( {
    //     canvasContext.fillRect(p1.x, p1.y, p1.x + p2.x, p1.y + p2.y);
    // });

    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(a.p1.x, a.p1.y, a.p2.x, a.p2.y);
    canvasContext.fillStyle = 'black';


    
    // canvasContext.translate(player.x, player.y);
    // canvasContext.rotate(player.angle);
    canvasContext.drawImage(mainCharImg, player.x - 30, player.y - 20); 
    // canvasContext.translate(0, 0);
    // canvasContext.rotate(90);
    canvasContext.strokeStyle = 'blue';
    if (game.hitboxes === true) {
    drawHitbox();
    }
};

function drawHitbox() {
    canvasContext.beginPath();
    canvasContext.moveTo(mouseX, mouseY);
    canvasContext.lineTo(player.x, player.y);
    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.moveTo(mouseX, mouseY);
    canvasContext.lineTo(mouseX, player.y);
    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.moveTo(player.x, player.y);
    canvasContext.lineTo(mouseX, player.y);
    canvasContext.stroke();

    canvasContext.beginPath();
    canvasContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.arc(scopeOffset.x, scopeOffset.y, 10, 0, 2 * Math.PI);
    canvasContext.fill();
}

function play() {
    updateFrame();
    drawFrame();
    requestAnimationFrame(play);
};

play();


// (((a.p1.x - player.r) < player.x)) && ((a.p2.x + player.r) > player.x) && ((player.y + player.r) === a.p1.y))