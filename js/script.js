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
    const icon = {
        heart : {
            x : 0,
            y : 0,
            img : heart,
            width : 301,
            height : 248,
            frameX : 0
        }
    }


    const game = new Game(canvas.width, canvas.height);
    game.currentAudio.loop = true;
    

    function animate(timestamp) {
        deltatime = timestamp - lastTime;
        lastTime = timestamp;
        context.clearRect(0, 0, canvas.width, canvas.height);

        game.update(deltatime);
        game.draw(context);

        drawText('bolder 50px Arial', "white", "Point:" + game.point, SDtopLeft);
        drawText('bolder 50px Arial', wob, "Point:" + game.point, topLeft);
        drawText('bolder 20px Arial', wob, "PRESS \"P\" TO PAUSE/UNPAUSE", topRight);
        drawText('bolder 20px Arial', wob, "USE ARROW KEY OR 'WASD' TO MOVE", {x : canvas.width * 0.8,y : canvas.height * 0.1 + 30})
        for (var i = 0; i < game.player.attr.lives; i++){
            context.drawImage(
                icon.heart.img, 
                icon.heart.x, 
                icon.heart.y, 
                icon.heart.width, 
                icon.heart.height,
                canvas.width * 0.2 + i * 30, //X on canvas
                canvas.height * 0.1 - 30, //y on canvas
                icon.heart.width * 0.1,  // ratio to canvas
                icon.heart.height * 0.1  // ratio to canvas
            );
        }
        
        if (!game.gameOver && !game.isPaused && !game.init) {
            requestAnimationFrame(animate)
            // game.currentAudio.play();
            
        };

        if( game.init ) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);
            drawText('bolder 50px Arial', wob, "PRESS \"SPACE BAR\" TO START", center)
        }
        if (game.isPaused) {
            drawText('bolder 50px Arial', wob, "PAUSED", center)
        }
        if (game.gameOver) {
            drawText('bolder 50px Arial', wob, "GAME OVER! PRESS \"SPACE BAR\" TO RESTART", center)
        }

    }
    animate(0)

    document.addEventListener('keyup', (e) => {
        if ((e.key === 'p' || e.key == 'P') && !game.gameOver && !game.init) {// running state
            if (!game.isPaused) {
                game.isPaused = true;
                game.currentAudio.muted = true;
            }
            else {
                game.isPaused = false;
                game.currentAudio.muted = false;
                animate(0)
            }
        }else if (e.key === ' ' && game.gameOver) {// game over state
            game.reset()
            game.gameOver = false;
            game.currentAudio.currentTime = 0;
            animate(0)
        }else if (e.key === ' ' && game.init) { //init state
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