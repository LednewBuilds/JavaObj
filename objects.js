let puffer;

const gameScreen = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = "480";
        this.canvas.height = "240";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);    
    },
    clear: function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const keyBindings = {
    arrowUp: function(){
        console.log("arrowUp");
        puffer.y -= 10;
    },
    arrowDown: function(){
        console.log("arrowDown");
        puffer.y += 10;
    },
    space: function(){
        console.log("space");
    }
}
document.addEventListener("keydown", Controls, false);

function Controls(e){
    var keyCode = e.keyCode;
    if(keyCode == 38 || keyCode == 87){
        keyBindings.arrowUp();
    }
    if(keyCode == 40 || keyCode == 83){
        keyBindings.arrowDown();
    }
    if(keyCode == 32){
        keyBindings.space();
    }
    gameScreen.clear();
    puffer.update();
}


class GameComponent {
    constructor(width, height, color, x, y, type){
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.ctx = gameScreen.canvas.getContext("2d");
    }
    update() {
        if(this.type == "text"){
            this.ctx.font = this.width + " " + this.height;
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text, this.x, this.y);
        }else{
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    updatePosition() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.bottomScreen();
    }
    bottomScreen(){
        let rockbottom = gameScreen.canvas.height - this.height;
        if(this.y > rockbottom){
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
}

function startCanvas(){
    puffer = new GameComponent(50, 50, "purple", 20, 120);
    puffer.gravity = 0.05;
    gameScreen.start();
    puffer.update();
    console.log(puffer);
    console.log("game has been started");
}