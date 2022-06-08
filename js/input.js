export default class InputHandler{
    constructor(){
        this.lastKey = '';
        window.addEventListener('keydown', (e) =>{
            if(e.key == 'ArrowRight'){
                this.lastKey = 'PRESS RIGHT';
            }
            else if(e.key == 'ArrowLeft'){
                this.lastKey = 'PRESS LEFT';
            }
            else if(e.key == 'ArrowDown'){
                this.lastKey = 'PRESS DOWN';
            }
            else if(e.key == 'ArrowUp'){
                this.lastKey = 'PRESS UP';
            }
            
            // console.log(this.lastKey) 
        })

        window.addEventListener('keyup', (e) =>{
            if(e.key == 'ArrowRight'){
                this.lastKey = 'RELEASE RIGHT';
            }
            else if(e.key == 'ArrowLeft'){
                this.lastKey = 'RELEASE LEFT';
            }
            else if(e.key == 'ArrowDown'){
                this.lastKey = 'RELEASE DOWN';
            }
            else if(e.key == 'ArrowUp'){
                this.lastKey = 'RELEASE UP';
            }
            
            // console.log(this.lastKey) 
        })

               
    }
}