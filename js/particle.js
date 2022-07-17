// @ts-nocheck
class Particle {
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.player.speed;
        this.y -= this.speedY;
        this.size *= 0.90;
        if( this.size < 0.5 ) this.markedForDeletion = true;
    }
}

export class Dust extends Particle{
    constructor(game, x, y){
        super(game);
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.size = Math.random() * 10 + 10;
        this.color = 'rgba(0, 0, 0, 0.2)';
    }
    draw(context){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }
}

export class FireBall extends Particle{
    constructor(game, x, y){
        super(game);
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.width = 100;
        this.height = 90;
        this.size = {
            width: this.width,
            height: this.height,
        };
        // this.color = 'rgba(255, 0, 0, 0.7)';
        this.image = fire;
    }
    draw(context){
        // context.beginPath();
        // context.fillStyle = this.color;
        // context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        // context.fill();
        context.drawImage(
            this.image,
            0,0,
            this.width, this.height, 
            this.x, this.y,
            this.size.width * 2, this.size.height * 2, 
            )
    }
    update(){
        this.x -= this.speedX + this.game.player.speed;
        this.y -= this.speedY - 2;



        this.size.width *= 0.95;
        this.size.height *= 0.95;
        if( this.size.width < this.game.player.radius/3 ) this.markedForDeletion = true;
    }
}