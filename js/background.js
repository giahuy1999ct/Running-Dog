// @ts-nocheck
export default class Background{
    constructor(gameWith, gameHeight){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 720;
        this.image = background;
        this.speed = 5;
    }
    update(speed){
        if(speed < 0) speed = 2;
        else if (speed == 0) speed = 10;
        
        this.x -= Math.floor(speed * 0.5);
        if(this.x <= -this.width) this.x = 0;
    }
    draw(context){
        context.drawImage(this.image, 
            this.x, 
            this.y,
            this.width,
            this.height
            );
        context.drawImage(
            this.image, 
            this.x + this.width - this.speed, 
            this.y, 
            this.width, 
            this.height);
        
    }
}