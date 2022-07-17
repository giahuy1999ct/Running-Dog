import { Dust, FireBall } from "./particle.js";
const states = {
    STANDING_RIGHT: 0,
    STANDING_LEFT: 1,
    RUNNING_RIGHT: 2,
    RUNNING_LEFT: 3,
    SITTING_RIGHT: 4,
    SITTING_LEFT: 5,
    JUMPING_RIGHT: 6,
    JUMPING_LEFT: 7,
    LANDING_RIGHT: 8,
    LANDING_LEFT: 9,
    CURLING_RIGHT: 10,
    CURLING_LEFT: 11,
    LANDING_CURLING_RIGHT : 12,
    LANDING_CURLING_LEFT : 13,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class StandingLeft extends State {
    constructor(game) {
        super("STANDING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'PRESS LEFT') {
            this.game.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'PRESS DOWN') {
            this.game.player.setState(states.SITTING_LEFT);
        }
        else if (input === 'PRESS UP') {
            this.game.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class StandingRight extends State {
    constructor(game) {
        super("STANDING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 6;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        if (input == 'PRESS LEFT') {
            this.game.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'PRESS DOWN') {
            this.game.player.setState(states.SITTING_RIGHT);
        }
        else if (input === 'PRESS UP') {
            this.game.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class RunningRight extends State {
    constructor(game) {
        super("RUNNING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 8;
        this.game.player.speed = 10;
    }
    handleInput(input) {
        for( var i = 0; i<= 5; i++ )
            this.game.particles.push( new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height) );
        if (input === 'PRESS LEFT') {
            this.game.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'RELEASE RIGHT') {
            this.game.player.setState(states.STANDING_RIGHT);
        }
        else if (input === 'PRESS UP') {
            this.game.player.setState(states.JUMPING_RIGHT);
        } else if (input === 'PRESS DOWN') {
            this.game.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    constructor(game) {
        super("RUNNING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 7;
        this.game.player.maxFrame = 8;
        this.game.player.speed = -10;
    }
    handleInput(input) {
        for( var i = 0; i<= 5; i++ )
            this.game.particles.push( new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height) );
        
        if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'RELEASE LEFT') {
            this.game.player.setState(states.STANDING_LEFT);
        }
        else if (input === 'PRESS UP') {
            this.game.player.setState(states.JUMPING_LEFT);
        }else if (input === 'PRESS DOWN') {
            this.game.player.setState(states.SITTING_LEFT);
        }
        else if (input === 'RELEASE SPACE') {
            console.log("yes");
        }
    }
}

export class SittingRight extends State {
    constructor(game) {
        super("SITTING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 8;
        this.game.player.maxFrame = 4;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.STANDING_RIGHT);
        }
        else if (input === 'PRESS LEFT') {
            this.game.player.setState(states.SITTING_LEFT);
        } 
    }
}

export class SittingLeft extends State {
    constructor(game) {
        super("SITTING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 9;
        this.game.player.maxFrame = 4;
        this.game.player.speed = 0;
    }
    handleInput(input) {
        if (input === 'PRESS LEFT') {
            this.game.player.setState(states.STANDING_LEFT);
        }
        else if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.SITTING_RIGHT);
        } 
    }
}

export class JumpingRight extends State {
    constructor(game) {
        super("JUMPING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;

        if (this.game.player.isGround()) {
            this.game.player.vy = -25;
        }
        else {
            this.game.player.vy += this.game.player.weight;
            if (this.game.player.vy >= 0) this.game.player.setState(states.LANDING_RIGHT)
        }
    }
    handleInput(input) {

        if (input === 'PRESS LEFT') {
            this.game.player.setState(states.JUMPING_LEFT);
        }
        else if (input === 'PRESS RIGHT') {
            this.game.player.speed = 10;
        }else if (input === 'PRESS SPACE') {
            this.game.player.setState(states.CURLING_RIGHT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(game) {
        super("JUMPING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 6;

        if (this.game.player.isGround()) {
            this.game.player.vy = -25;
        }
        else {
            this.game.player.vy += this.game.player.weight;
            if (this.game.player.vy >= 0) this.game.player.setState(states.LANDING_LEFT)
        }
    }
    handleInput(input) {
        if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.JUMPING_RIGHT);
        }
        else if (input === 'PRESS LEFT') {
            this.game.player.speed = -10;
        }else if (input === 'PRESS SPACE') {
            this.game.player.setState(states.CURLING_LEFT);
        }
    }
}

export class LandingRight extends State {
    constructor(game) {
        super("LANDING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 4;
        this.game.player.maxFrame = 6;
        this.game.player.vy += this.game.player.weight;
        this.game.player.speed = 10;
    }
    handleInput(input) {
        if (this.game.player.isGround()) {
            this.game.player.vy = 0;
            this.game.player.setState(states.STANDING_RIGHT)
        }

        if (input === 'PRESS SPACE') {
            this.game.player.setState(states.CURLING_RIGHT);
        }
        else if (input === 'PRESS LEFT') {
            this.game.player.setState(states.LANDING_LEFT);
        }
    }
}

export class LandingLeft extends State {
    constructor(game) {
        super("LANDING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 6;
        this.game.player.vy += this.game.player.weight;
        this.game.player.speed = -10;
    }
    handleInput(input) {
        if (this.game.player.isGround()) {
            this.game.player.vy = 0;
            this.game.player.setState(states.STANDING_LEFT)
        }
        if (input === 'PRESS SPACE') {
            this.game.player.setState(states.CURLING_LEFT);
        }
        else if (input === 'PRESS RIGHT') {
            this.game.player.setState(states.LANDING_RIGHT);
        }
    }
}

export class CurlingRight extends State {
    constructor(game) {
        super("CURLING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 10;
        this.game.player.maxFrame = 6;
        // this.game.player.speed = 10;
        this.game.player.invicible = true;
        this.game.player.vy += this.game.player.weight;
        if (this.game.player.vy >= 0) this.game.player.setState(states.LANDING_CURLING_RIGHT)
    }
    handleInput(input) {
        // for( var i = 0; i<= 5; i++ )
        this.game.particles.push( 
            new FireBall(
                this.game, 
                this.game.player.x, 
                this.game.player.y ) );
        if (input === 'RELEASE SPACE') {
            this.game.player.setState(states.LANDING_RIGHT);
            this.game.player.invicible = false;
        }
    }
}

export class LandingCurlingRight extends State {
    constructor(game) {
        super("LANDING CURLING RIGHT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 10;
        this.game.player.maxFrame = 6;
        this.game.player.vy += this.game.player.weight;
        
    }
    handleInput(input) {
        if (this.game.player.isGround()) {
            this.game.player.vy = -25;
            // this.game.player.vy = 0;
            // this.game.player.setState(states.STANDING_RIGHT)
        }
        this.game.particles.push( 
            new FireBall(
                this.game, 
                this.game.player.x, 
                this.game.player.y ) );
        if (input === 'RELEASE SPACE') {
            this.game.player.setState(states.LANDING_RIGHT);
            this.game.player.invicible = false;
        }
    }
}

export class CurlingLeft extends State {
    constructor(game) {
        super("CURLING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 11;
        this.game.player.maxFrame = 6;
        // this.game.player.speed = -10;
        this.game.player.invicible = true;
        this.game.player.vy += this.game.player.weight;
        if (this.game.player.vy >= 0) this.game.player.setState(states.LANDING_CURLING_LEFT)
    }
    handleInput(input) {
        // for( var i = 0; i<= 5; i++ )
        this.game.particles.push( 
            new FireBall(
                this.game, 
                this.game.player.x, 
                this.game.player.y ) );
        if (input === 'RELEASE SPACE') {
            this.game.player.setState(states.LANDING_LEFT);
            this.game.player.invicible = false;
        }
    }
}

export class LandingCurlingLeft extends State {
    constructor(game) {
        super("LANDING CURLING LEFT");
        this.game = game;
    }
    enter() {
        this.game.player.frameY = 11;
        this.game.player.maxFrame = 6;
        this.game.player.vy += this.game.player.weight;
        
    }
    handleInput(input) {
        if (this.game.player.isGround()) {
            this.game.player.vy = -25;
            // this.game.player.vy = 0;
            // this.game.player.setState(states.STANDING_LEFT)
        }
        this.game.particles.push( 
            new FireBall(
                this.game, 
                this.game.player.x, 
                this.game.player.y ) );
        if (input === 'RELEASE SPACE') {
            this.game.player.setState(states.LANDING_LEFT);
            this.game.player.invicible = false;
        }
    }
}