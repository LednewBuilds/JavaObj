document.addEventListener("keydown", Controls, false);
////https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas/48348567
let puffer;
let enemies = [];
let score;
let tutorial;
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
            if((gameScreen.currentFrame -= 200) < 0){
                gameScreen.currentFrame = 0;
            }else{
            gameScreen.currentFrame -= 200;
            }
        }
        if(this.y < top){
            this.y = bottom;
            this.gravitySpeed = 0.05;
            if((gameScreen.currentFrame -= 200) < 0){
                gameScreen.currentFrame = 0;
            }else{
            gameScreen.currentFrame -= 200;
            }
        }
        //console.log("This.Y: "+this.y+" - Component Bottom:"+ bottom+" - Component top:"+ this.height);
    }
    crash(obj){
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop =  this.y;
        let mybottom = this.y + (this.height);
        let otherleft = obj.x;
        let otherright = obj.x + (obj.width);
        let othertop = obj.y;
        let otherbottom = obj.y + (obj.height);
        let crash = true;
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
            crash = false;
        }
        return crash;
    }
}

const gameScreen = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 720;
        this.canvas.height = 480;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.currentFrame = 0;
        this.interval = setInterval(updateCanvas, 13);    
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
        gameScreen.clear();
        location.reload();
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
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(i = 0; i < enemies.length; i += 1){
        if(puffer.crash(enemies[i])){
            return;
        }
    }
    gameScreen.clear();
    gameScreen.currentFrame += 1;
    console.log(evenNumber(500));
    if(gameScreen.currentFrame == 1 || evenNumber(160)){
        x = gameScreen.canvas.width;
        minHeight  = puffer.height + 100;
        maxHeight = 120;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        enemies.push(new GameComponent(10, height, "grey", x, 0));
        enemies.push(new GameComponent(10, x - height - gap, "grey", x, height + gap));
    }
    for(i = 0; i < enemies.length; i += 1){
        enemies[i].x += -1;
        enemies[i].update();
    }
    score.text = "Score: " + gameScreen.currentFrame;
    tutorial.text = "How to play: [W] [S] [ArrowUp] [ArrowDown] to avoid the objects / [Space] to restart"
    score.update();
    tutorial.update();
    puffer.updatePosition();
    puffer.update();

}

function booster(n){
    puffer.gravity = n;
}

function evenNumber(n) {
    if((gameScreen.currentFrame / n) % 1 == 0) { return true; }
    return false;
}

function startCanvas(){
    puffer = new GameComponent(50, 50, "purple", 60, 120);
    puffer.gravity = 0.05;
    score = new GameComponent("16px", "Arial","black", 340, 40, "text");
    tutorial = new GameComponent("13px", "Calibri", "grey", 20, 460, "text");
    gameScreen.start();
    console.log("Game has been started");
}