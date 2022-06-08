import Player from './player.js';
import InputHandler from './input.js';
import Enemy from './enemy.js';
import Background from './background.js';
export default class Game {
    constructor(gWidth, gHeight) {
        this.point = 0;
        this.player = new Player(gWidth, gHeight);
        this.input = new InputHandler();
        this.background = new Background(gWidth, gHeight);
        this.enemies = [];
        this.enemyCounter = 0;
        this.enemyInterval = 2000;
        this.gWidth = gWidth;
        this.gHeight = gHeight;
        this.gameOver = false;
        this.isPaused = false;
        this.init = true;
        this.invincible = false;
    }
    update(deltatime) {
        this.background.update(this.player.speed);
        this.player.update(this.input.lastKey, deltatime)

        if (this.enemyCounter > this.enemyInterval) {
            this.enemyCounter = 0;
            this.enemies.push(new Enemy(this.gWidth, this.gHeight, this))
        } else {
            this.enemyCounter += deltatime + (Math.random() * 5 - 10);
        }

        this.enemies.forEach(enemy => {
            enemy.update(deltatime);
            
            // colission detection with circle
            // not that effective
            var dx = (enemy.x + enemy.width / 2 - 20) - (this.player.x + this.player.width / 2);
            var dy = (enemy.y + enemy.height / 2) - (this.player.y + this.player.height / 2);
            var delta = Math.sqrt(dx * dx + dy * dy);

            if (delta <= this.player.width * 0.5 - 20 + enemy.width * 0.5 - 20 && !this.invincible) {
                console.log("hit!!")
                this.takeDmg();
                enemy.alive = false;
                if(this.player.attr.lives == 0) this.gameOver = true;
            }
        })

        this.enemies = this.enemies.filter(enemy => enemy.alive);
    }
    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
    }
    reset(){
        this.point = 0;
        this.player.reset();
        this.enemies = [];
    }
    takeDmg(){
        this.player.attr.lives--;
        this.invincible = true;
        setInterval(()=>{
            this.invincible = false;
        }, 1000);
    }
}