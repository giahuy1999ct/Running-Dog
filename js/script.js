// @ts-nocheck

import Game from './game.js';

window.addEventListener('load', function () {
    const canvas = document.getElementById('game');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var lastTime = 0;
    var deltatime = 0;

    var wob = context.createLinearGradient(0, 0, canvas.width, 0);
    wob.addColorStop(0, "white");    //W
    wob.addColorStop(0.5, "orange"); //O
    wob.addColorStop(1, "black");    //B

    const center = {
        x : canvas.width * 0.5,
        y : canvas.height * 0.5
    }

    const topLeft = {
        x : canvas.width * 0.1,
        y : canvas.height * 0.1
    }
    const SDtopLeft = {
        x : canvas.width * 0.1 - 2,
        y : canvas.height * 0.1 - 2
    }

    const topRight = {
        x : canvas.width * 0.8,
        y : canvas.height * 0.1
    }


    const game = new Game(canvas.width, canvas.height);
    

    function animate(timestamp) {
        deltatime = timestamp - lastTime;
        lastTime = timestamp;
        context.clearRect(0, 0, canvas.width, canvas.height);

        game.update(deltatime);
        game.draw(context);

        drawText('bolder 50px Arial', "white", "Point:" + game.point, SDtopLeft)
        drawText('bolder 50px Arial', wob, "Point:" + game.point, topLeft)
        drawText('bolder 20px Arial', wob, "PRESS SPACE BAR TO SPAUSE/UNSPAUSE", topRight)
        drawText('bolder 20px Arial', wob, "USE ARROW KEY TO MOVE", {x : canvas.width * 0.8,y : canvas.height * 0.1 + 30})
        
        

        if (!game.gameOver && !game.isPaused && !game.init) requestAnimationFrame(animate);

        if( game.init ) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);
            drawText('bolder 50px Arial', wob, "PRESS \"SPACE BAR\" TO START", center)
        }
        if (game.isPaused) {
            drawText('bolder 50px Arial', wob, "SPAUSED", center)
        }
        if (game.gameOver) {
            drawText('bolder 50px Arial', wob, "GAME OVER! PRESS \"SPACE BAR\" TO RESTART", center)
        }
    }
    animate(0)

    document.addEventListener('keyup', (e) => {
        if (e.key === ' ' && !game.gameOver && !game.init) {
            if (!game.isPaused) {
                game.isPaused = true;
            }
            else {
                game.isPaused = false;
                animate(0)
            }
        }else if (e.key === ' ' && game.gameOver) {
            game.reset()
            game.gameOver = false;
            animate(0)
        }else if (e.key === ' ' && game.init) {
            game.init = false;
            animate(0)
        }
    })

    function drawText(font, color, text, pos){
        context.font = font;
        context.fillStyle = color;
        context.textAlign = 'center';
        context.fillText(text, pos.x, pos.y);
    }
})