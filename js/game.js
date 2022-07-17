import Player from './player.js';
import InputHandler from './input.js';
import Enemy from './enemy.js';
import Background from './background.js';
export default class Game {
    constructor(gWidth, gHeight) {
        this.point = 0;
        this.input = new InputHandler();
        this.background = new Background(gWidth, gHeight);
        this.enemies = [];
        this.enemyCounter = 0;
        this.enemyInterval = 2000;
        this.gWidth = gWidth;
        this.gHeight = gHeight;
        this.player = new Player(this);
        this.particles = [];
        this.gameOver = false;
        this.isPaused = false;
        this.init = true;
        this.audios = [
            "./asset/Wellerman_Nathan_Evans.mp3"
        ];
        this.currentAudio = new Audio(this.audios[0]);
    }
    update(deltatime) {
        this.background.update(this.player.speed);
        this.player.update(this.input.lastKey, deltatime)

        if (this.enemyCounter > this.enemyInterval) {
            this.enemyCounter = 0;
            this.enemies.push(new Enemy(this))
        } else {
            this.enemyCounter += deltatime + (Math.random() * 5 - 10);
        }

        this.particles.forEach((particle, index) => {
            particle.update();
            if( particle.markedForDeletion ) this.particles.splice(index, 1);
        });

        this.enemies.forEach(enemy => {
            enemy.update(deltatime);
            
            // colission detection with circle
            // not that effective
            var dx = (enemy.x + enemy.width / 2 - 20) - (this.player.x + this.player.width / 2);
            var dy = (enemy.y + enemy.height / 2) - (this.player.y + this.player.height / 2);
            var delta = Math.sqrt(dx * dx + dy * dy);

            if (delta <= this.player.width * 0.5 - 20 + enemy.width * 0.5 - 20 ) {
                console.log("hit!!")
                this.takeDmg();
                enemy.alive = false;
                if(this.player.attr.lives == 0) this.gameOver = true;
            }
        })

        this.enemies = this.enemies.filter(enemy => enemy.alive);
        // console.log(this.player.currentState.state + " : " + this.input.lastKey)
    }
    draw(context) {
        this.background.draw(context);
        
        
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
        this.particles.forEach(particle => {
            particle.draw(context);
        });

        this.player.draw(context);
    }
    reset(){
        this.point = 0;
        this.player.reset();
        this.enemies = [];
    }
    takeDmg(){
        if( !this.player.invicible ) this.player.attr.lives--;
        this.point ++;
    }
}