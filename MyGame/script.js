window.addEventListener('load', init, false);
const canvas = document.getElementById('canvas');
canvasContext = canvas.getContext('2d');
const canvasWidth = 1080,
    canvasHeight = 800,
    pointLimit = 1000;
    const game = {
        pressUp: false,
        pressDown: false,
        pressLeft: false,
        pressRight: false,
        hitboxes: false,
        moveUp: false,
        moveDown: false,
        moveLeft: false,
        moveRight: false,
        go: true
    },
    player = {
        health: 10,
        speed: 10,
        x: canvasWidth/2,
        y: canvasHeight/2,
        r: 20,
        points: 0,
        g: 9.81 / 60
    };
    let mainCharImg = new Image();
    let middleImg = new Image();
    let smallImg = new Image();
    let bigImg = new Image();
    let obstacle = [];
function init() {
    const canvas = document.getElementById('canvas');
        canvasContext = canvas.getContext('2d');
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        mainCharImg.src = 'images/main_character.png',
        middleImg.src = 'images/middle_enemy.png',
        smallImg.src = 'images/small_enemy.png',
        bigImg.src = 'images/big_enemy.png',
        obstacle = [
            {
                x: 100,
                y: 100,
                width: 50,
                height: 50,
                r: 30,
                points: 50
            },
            {
                x: 800,
                y: 100,
                width: 50,
                height: 50,
                r: 30,
                points: 50
            }, {
                x: 800,
                y: 300,
                width: 50,
                height: 50,
                r: 10,
                points: 100
            },
            {
                x: 100,
                y: 300,
                width: 50,
                height: 50,
                r: 50,
                points: 25
            }
        ];
}



let check = {
    checkUp: true,
    checkDown: true,
    checkLeft: true,
    checkRight: true
}

let beginX,
    beginY,
    endX,
    endY;

let bullet = {
    bx: beginX,
    by: beginY,
    eX: endX,
    ey: endY,
    dx: 0,
    dy: 0,
    directionX: 1,
    directionY: 1,
    r: 5,
    speed: 20
}


//начальный кадр

canvasContext.beginPath();
canvasContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
canvasContext.fill();

let mouseX, mouseY;


let hbButton = document.querySelector('.hitboxes');

let scopeOffset = {
    x: player.x + (mouseX - player.x) / 2,
    y: player.y - (mouseY + player.y) / 2
}


window.addEventListener('mousemove', (e) => {
    canvasContext.fillStyle = 'blue';
    mouseX = e.offsetX;
    mouseY = e.offsetY;

})



function createBullet() {
   
    bullet.directionX = 1;
    bullet.directionY = 1;
    bullet.beginX = player.x;
    bullet.beginY = player.y;
    bullet.endX = mouseX;
    bullet.endY = mouseY;
    if (bullet.beginX > bullet.endX){
        bullet.directionX = -1;
    };
    if (bullet.beginY > bullet.endY){
        bullet.directionY = -1;
    };
    bullet.dx = Math.abs(( bullet.endX - bullet.beginX)) * 0.08 * bullet.directionX;
    bullet.dy =  Math.abs(( bullet.endY - bullet.beginY)) * 0.08 * bullet.directionY ;
    console.log(bullet.directionX, bullet.directionY);
    console.log(bullet.dx, bullet.dy);
}

function flyBullet() {
    bullet.beginX += bullet.dx;
    bullet.beginY += bullet.dy;
    canvasContext.fillStyle = 'black'
    canvasContext.beginPath();
    canvasContext.arc(bullet.beginX, bullet.beginY, bullet.r, 0, 2 * Math.PI);
    canvasContext.fill();
}

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
});

function updatePoints(points) {
    player.points += points;
    if (player.points >= pointLimit) {
        game.go = false;
    }
}

function drawPoints() {
    canvasContext.strokeStyle = "black";
    canvasContext.strokeRect(0, canvasHeight - 50, 100, 50);
    canvasContext.fillStyle = 'black';
    canvasContext.font = "32px Arial";
    canvasContext.fillText(`${player.points}`, 10, canvasHeight - 15);
}

canvas.addEventListener('click', createBullet, false);

function updateFrame() {
    canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    
    for (let i = 0; i < obstacle.length; i++) {
            if (((game.pressDown) && (player.y < canvasHeight - player.r)) && !((((obstacle[i].x - player.r) < player.x) && ((obstacle[i].width + obstacle[i].x + player.r) > player.x)) && ((obstacle[i].y - player.r) === player.y))) {
                game.moveDown = true;
                console.log('down');
            } ;
        
        
            if ((game.pressUp) && (player.y > 0 + player.r) && !((((obstacle[i].x - player.r) < player.x) && ((obstacle[i].width + obstacle[i].x + player.r) > player.x)) && ((obstacle[i].y + obstacle[i].height + player.r) === player.y))) {
                game.moveUp = true;
                console.log('up');
            };
        
            if ((game.pressLeft) && (player.x > 0 + player.r) && !((((obstacle[i].y - player.r) < player.y) && ((obstacle[i].height + obstacle[i].y + player.r) > player.y)) && ((obstacle[i].x + obstacle[i].width + player.r) === player.x))) {
                game.moveLeft = true;
                console.log('left');
            };
        
            if ((game.pressRight) && (player.x < canvasWidth - player.r) && !((((obstacle[i].y - player.r) < player.y) && ((obstacle[i].height + obstacle[i].y + player.r) > player.y)) && ((obstacle[i].x - player.r) === player.x))) {
                game.moveRight = true;
                console.log('right');
            };
            if ((bullet.r + obstacle[i].r) > (Math.sqrt(((bullet.beginX - obstacle[i].x) ** 2) + (bullet.beginY - obstacle[i].y) ** 2))) {
                obstacle[i].x = Math.random() * canvasWidth;
                obstacle[i].y = Math.random() * canvasHeight;
                console.log('hit');
                updatePoints(obstacle[i].points);
            }

    }
    check.checkDown = true;
    check.checkUp = true;
    check.checkLeft = true;
    check.checkRight = true;

        if ((game.moveDown)) {
            player.y += player.speed;
            game.moveDown = false;
        };
        if ((game.moveUp)) {
            player.y -= player.speed;
            game.moveUp = false;

        };
        if (game.moveLeft) {
            player.x -= player.speed;
            game.moveLeft = false;

        };
        if (game.moveRight) {
            player.x += player.speed;
            game.moveRight = false;

        };
        // if (player.y + player.r  < canvasHeight) {
        //     player.y += player.g * 0.0025;
        // };
};

function drawFrame()  {

    canvasContext.fillStyle = 'red';
    for (let i = 0; i < obstacle.length; i++) {
        if ((i === 0) || (i === 1)) {
            canvasContext.drawImage(middleImg, obstacle[i].x - obstacle[i].r, obstacle[i].y - obstacle[i].r);
        }
        if (i === 3) {
            canvasContext.drawImage(bigImg, obstacle[i].x - obstacle[i].r, obstacle[i].y - obstacle[i].r);
        }
        if (i === 2) {
            canvasContext.drawImage(smallImg, obstacle[i].x - obstacle[i].r, obstacle[i].y - obstacle[i].r);
        }
    }

    if ((bullet.beginX < canvasWidth) && (bullet.beginX > 0) && (bullet.beginY < canvasHeight) && (bullet.beginY > 0)){
    flyBullet();
    }

    canvasContext.fillStyle = 'black';

drawPoints();

    canvasContext.drawImage(mainCharImg, player.x - 30, player.y - 20);

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

    for (let i = 0; i < obstacle.length; i++) {
        canvasContext.fillStyle = 'red';
        canvasContext.beginPath();
        canvasContext.arc(obstacle[i].x, obstacle[i].y, obstacle[i].r, 0, 2 * Math.PI);
        canvasContext.fill();
    }
}

function gameOver() {
    player.points = 0;

    canvasContext.fillStyle = 'white';
    canvasContext.strokeStyle = 'blue';
    canvasContext.fillRect(canvasWidth / 2 - 200, canvasHeight / 2 - 50, 400, 100);

    canvasContext.strokeRect(canvasWidth / 2 - 200, canvasHeight / 2 - 50, 400, 100);
    canvasContext.fillStyle = 'blue';

    canvasContext.font = "32px Arial";
    canvasContext.fillText('You win!', canvasWidth / 2 - 150, canvasHeight / 2);

    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(canvasWidth / 2 - 200, canvasHeight / 2 + 50, 400, 100);

    canvasContext.strokeRect(canvasWidth / 2 - 200, canvasHeight / 2 + 50, 400, 100);
    canvasContext.fillStyle = 'blue';

    canvasContext.font = "32px Arial";
    canvasContext.fillText('Play again', canvasWidth / 2 - 150, canvasHeight / 2 + 100);

    canvasContext.onclick = newGame();
}

function newGame() {
    console.log('new');
    if ((mouseX > 340) && (mouseX < 740) && (mouseY > 450) && (mouseY < 550)) {
        init();
        game.go = true;
        canvasContext.clearRect(0,0,canvasWidth, canvasHeight);
    }
}

function play() {
    if (game.go === true){
        updateFrame();
    drawFrame();
    } else {
        gameOver();
    };
    requestAnimationFrame(play);
};

play();