// @ts-nocheck
export default class Enemy{
    constructor(gameWith, gameHeight, game){
        this.gameWith = gameWith;
        this.gameHeight = gameHeight;
        this.width = 160;
        this.height = 119;
        this.x = this.gameWith;
        this.y = this.gameHeight - this.height;
        this.image = enemy;
        this.frameX = 0;
        this.speed = 10;
        this.fps = 0;
        this.frameInterval = 90;
        this.maxFrame = 5
        this.alive = true;
        this.game = game;
    }
    update(deltatime){
        this.x -= this.speed;

        this.fps += deltatime;
        if( this.fps > this.frameInterval){
            if(this.frameX >= this.maxFrame) this.frameX = 0; 
            else this.frameX++;

            this.fps = 5;
        }

        if(this.x <= 0 - this.width) {
            this.alive = false;
            this.game.point++;
        }
    }
    draw(context){
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height,
            this.radius = this.width*0.5 - 20
            );
        context.strokeStyle='red';
        context.beginPath();
        context.arc(this.x + this.width*0.5 - 20, this.y + this.height*0.5, this.radius, 0, 2 * Math.PI);
        context.stroke();
    }
}