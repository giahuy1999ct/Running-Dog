export default class InputHandler{
    constructor(){
        this.lastKey = '';
        window.addEventListener('keydown', (e) =>{
            if(e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D'){
                this.lastKey = 'PRESS RIGHT';
            }
            else if(e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A'){
                this.lastKey = 'PRESS LEFT';
            }
            else if(e.key == 'ArrowDown' || e.key == 's' || e.key == 'S'){
                this.lastKey = 'PRESS DOWN';
            }
            else if(e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W'){
                this.lastKey = 'PRESS UP';
            }
            else if(e.key == ' '){
                this.lastKey = 'PRESS SPACE';
            }
            
            // console.log(this.lastKey) 
        })

        window.addEventListener('keyup', (e) =>{
            if(e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D'){
                this.lastKey = 'RELEASE RIGHT';
            }
            else if(e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A'){
                this.lastKey = 'RELEASE LEFT';
            }
            else if(e.key == 'ArrowDown' || e.key == 's' || e.key == 'S'){
                this.lastKey = 'RELEASE DOWN';
            }
            else if(e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W'){
                this.lastKey = 'RELEASE UP';
            }
            else if(e.key == ' '){
                this.lastKey = 'RELEASE SPACE';
            }
            // console.log(this.lastKey) 
        })

               
    }
}