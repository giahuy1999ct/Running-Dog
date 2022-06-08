// @ts-nocheck
import {
    StandingLeft, 
    StandingRight, 
    RunningRight, 
    RunningLeft, 
    SittingLeft, 
    SittingRight,
    JumpingRight,
    JumpingLeft
} from './state.js';
export default class Player {
    constructor(gWidth, gHeight){
        this.gWidth = gWidth;
        this.gHeight = gHeight;
        this.states = [
            new StandingRight(this), 
            new StandingLeft(this), 
            new RunningRight(this), 
            new RunningLeft(this),
            new SittingRight(this),
            new SittingLeft(this),
            new JumpingRight(this),
            new JumpingLeft(this)
        ];
        this.currentState = this.states[0];
        this.image = dog;
        this.width = 200;
        this.height = 181.83;
        this.x = this.gWidth/2 - this.width*2;
        this.y = this.gHeight - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.speed = 0;
        this.fps = 5;
        this.frameInterval = 90;
        this.vy = 0;
        this.weight = 1;
        this.radius = this.width/2 - 20
        //in developement state
        this.attr = {
            lives : 3,
            mana : 5,
        }
        //-------------------
    }
    draw(context){
        context.drawImage(
            this.image, 
            this.frameX * this.width, 
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
            );
        context.strokeStyle='green';
        context.beginPath();
        context.arc(this.x + this.width/2, this.y + this.height/2, this.radius, 0, 2 * Math.PI);
        context.stroke();
    }
    update(input, deltatime){
        this.currentState.enter();
        this.currentState.handleInput(input);

        this.x += this.speed;
        this.y += this.vy;

        //check difference maxFrame between each FrameY
        if( this.frameX > this.maxFrame ) this.frameX = this.maxFrame;
        // loop through sprite sheet
        this.fps += deltatime;
        if( this.fps > this.frameInterval){
            if(this.frameX >= this.maxFrame) this.frameX = 0; 
            else this.frameX++;

            this.fps = 5;
        }
        //check left border
        if( this.x <= 0 ) this.x = 0;
        //check right border
        if( this.x >= this.gWidth - this.width ) this.x = this.gWidth - this.width;
        //check bottom
        if( this.y >= this.gHeight - this.height ) this.y = this.gHeight - this.height;
    }
    isGround(){
        return this.y >= this.gHeight - this.height;
    }
    
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    reset(){
        this.x = this.gWidth/2 - this.width*2;
        this.y = this.gHeight - this.height;
        this.currentState = this.states[0]
        this.attr.lives = 3;
    }
}