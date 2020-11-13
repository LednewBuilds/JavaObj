document.addEventListener("keydown", Controls, false);
////https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas/48348567
let puffer;
let enemies = [];
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
        }else if(this.type == "img"){
            const image = document.getElementById('source');
            //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            this.ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
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
        let bottom = gameScreen.canvas.height + this.height;
        let top = -this.height;
        if(this.y > bottom){
            this.y = top;
            this.gravitySpeed = 0.05;
        }
        if(this.y < top){
            this.y = bottom;
            this.gravitySpeed = 0.05;
        }
        //console.log("This.Y: "+this.y+" - Component Bottom:"+ bottom+" - Component top:"+ this.height);
    }
}

const gameScreen = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = "720";
        this.canvas.height = "480";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.currentFrame = 0;
        this.interval = setInterval(updateCanvas, 20);    
    },
    clear: function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const keyBindings = {
    arrowUp: (() => {
        console.log("arrowUp");
        booster(-0.08);
        console.log;
    }),
    arrowDown: (() => {
        console.log("arrowDown");
        booster(+0.07);
    }),
    space: (() => {
        console.log("space");
    })
}

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
}

function updateCanvas(){
    gameScreen.clear();
    gameScreen.currentFrame += 1;
    score.text = "Score: " + gameScreen.currentFrame;
    score.update();
    puffer.updatePosition();
    puffer.update();
}

function booster(n){
    puffer.gravity = n;
}

function evenNumber(n) {
    ((gameScreen.currentFrame / n) % 1 == 0) ? 'true' : 'false';
}

function startCanvas(){
    puffer = new GameComponent(50, 50, "purple", 60, 120);
    puffer.gravity = 0.05;
    score = new GameComponent("13px", "Arial","black", 340, 40, "text");
    gameScreen.start();
    console.log("Game has been started");
}