export default class InputHandler{
    constructor(){
        this.lastKey = '';
        window.addEventListener('keydown', (e) =>{
            if(e.key == 'ArrowRight' || e.key == 'd'){
                this.lastKey = 'PRESS RIGHT';
            }
            else if(e.key == 'ArrowLeft' || e.key == 'a'){
                this.lastKey = 'PRESS LEFT';
            }
            else if(e.key == 'ArrowDown' || e.key == 's'){
                this.lastKey = 'PRESS DOWN';
            }
            else if(e.key == 'ArrowUp' || e.key == 'w'){
                this.lastKey = 'PRESS UP';
            }
            
            // console.log(this.lastKey) 
        })

        window.addEventListener('keyup', (e) =>{
            if(e.key == 'ArrowRight' || e.key == 'd'){
                this.lastKey = 'RELEASE RIGHT';
            }
            else if(e.key == 'ArrowLeft' || e.key == 'a'){
                this.lastKey = 'RELEASE LEFT';
            }
            else if(e.key == 'ArrowDown' || e.key == 's'){
                this.lastKey = 'RELEASE DOWN';
            }
            else if(e.key == 'ArrowUp' || e.key == 'w'){
                this.lastKey = 'RELEASE UP';
            }
            
            // console.log(this.lastKey) 
        })

               
    }
}