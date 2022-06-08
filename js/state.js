const states = {
    STANDING_RIGHT : 0,
    STANDING_LEFT : 1,
    RUNNING_RIGHT: 2,
    RUNNING_LEFT : 3,
    SITTING_RIGHT : 4,
    SITTING_LEFT : 5,
    JUMPING_RIGHT : 6,
    JUMPING_LEFT : 7,
    LANDING_RIGHT : 8,
    LANDING_LEFT : 9,
    CURLING_RIGHT : 10,
    CURLING_LEFT : 11
}

class State {
    constructor(state){
        this.state = state;
    }
}

export class StandingLeft extends State{
    constructor(player){
        super("STANDING LEFT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 1;
        this.player.maxFrame = 6;
        this.player.speed = 0;
    }
    handleInput(input){
        if(input === 'PRESS RIGHT'){
            this.player.setState(states.RUNNING_RIGHT);
        }
        if(input === 'PRESS LEFT'){
            this.player.setState(states.RUNNING_LEFT);
        }
        if(input === 'PRESS DOWN'){
            this.player.setState(states.SITTING_LEFT);
        }
        if(input === 'PRESS UP'){
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class StandingRight extends State{
    constructor(player){
        super("STANDING RIGHT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 0;
        this.player.maxFrame = 6;
        this.player.speed = 0;
    }
    handleInput(input){
        if(input == 'PRESS LEFT'){
            this.player.setState(states.RUNNING_LEFT);
        }
        if(input === 'PRESS RIGHT'){
            this.player.setState(states.RUNNING_RIGHT);
        }
        if(input === 'PRESS DOWN'){
            this.player.setState(states.SITTING_RIGHT);
        }
        if(input === 'PRESS UP'){
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class RunningRight extends State{
    constructor(player){
        super("RUNNING RIGHT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 6;
        this.player.maxFrame = 8;
        this.player.speed = 10;
    }
    handleInput(input){
        if(input === 'PRESS LEFT'){
            this.player.setState(states.RUNNING_LEFT);
        }
        if(input === 'RELEASE RIGHT'){
            this.player.setState(states.STANDING_RIGHT);
        }
        if(input === 'PRESS UP'){
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class RunningLeft extends State{
    constructor(player){
        super("RUNNING LEFT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 7;
        this.player.maxFrame = 8;
        this.player.speed = -10;
    }
    handleInput(input){
        if(input === 'PRESS RIGHT'){
            this.player.setState(states.RUNNING_RIGHT);
        }
        if(input === 'RELEASE LEFT'){
            this.player.setState(states.STANDING_LEFT);
        }
        if(input === 'PRESS UP'){
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class SittingRight extends State{
    constructor(player){
        super("SITTING RIGHT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 8;
        this.player.maxFrame = 4;
        this.player.speed = 0;
    }
    handleInput(input){
        if(input === 'PRESS RIGHT'){
            this.player.setState(states.STANDING_RIGHT);
        }
        if(input === 'PRESS LEFT'){
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class SittingLeft extends State{
    constructor(player){
        super("SITTING LEFT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 9;
        this.player.maxFrame = 4;
        this.player.speed = 0;
    }
    handleInput(input){
        if(input === 'PRESS LEFT'){
            this.player.setState(states.STANDING_LEFT);
        }
        if(input === 'PRESS RIGHT'){
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class JumpingRight extends State{
    constructor(player){
        super("JUMPING RIGHT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 2;
        this.player.maxFrame = 6;
        
        if( this.player.isGround()) {
            this.player.vy = -25;
        }
        else this.player.vy += this.player.weight;
    }
    handleInput(input){
        if( this.player.isGround() ) {
            this.player.vy = 0;
            this.player.setState(states.STANDING_RIGHT);
        }
        if(input === 'PRESS LEFT'){
            this.player.setState(states.JUMPING_LEFT);
            this.player.speed = 10;
        }
        if(input === 'PRESS RIGHT'){
            this.player.speed = 10;
        }
    }
}

export class JumpingLeft extends State{
    constructor(player){
        super("JUMPING LEFT");
        this.player = player;
    }
    enter(){
        this.player.frameY = 3;
        this.player.maxFrame = 6;
        
        if( this.player.isGround()) {
            this.player.vy = -25;
        }
        else this.player.vy += this.player.weight;
    }
    handleInput(input){
        if( this.player.isGround() ) {
            this.player.vy = 0;
            this.player.setState(states.STANDING_LEFT);
        }
        if(input === 'PRESS RIGHT'){
            this.player.setState(states.JUMPING_RIGHT);
            this.player.speed = 10;
        }
        if(input === 'PRESS LEFT'){
            this.player.speed = -10;
        }
    }
}