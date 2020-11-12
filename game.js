let puffer;
let obstacles = [];
let enemies;
let score;

function startPufferFish(){
    puffer = new GameComponent(80, 80, "#333", 10, 120);
    puffer.gravity = 0.05;
    score = new GameComponent("30x", "Arial", "black", 280, 40, "text");
    gameScreen.start();
    console.log("The game has been started.");
}
const gameScreen = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 720;
        this.canvas.height = 480;
        this.ctx = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameScreen, 20);
        },
    clear: function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class GameComponent {
    constructor(width, height, color, x, y, type){
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.update = function() {
            ctx = gameScreen.ctx;
            if(this.type == "text"){
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            }else{
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }
        this.newPos = function() {
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
            this.hitBottom();
        }
        this.hitBottom = function(){
            let rockbottom = gameScreen.canvas.height - this.height;
            if(this.y > rockbottom){
                this.y = rockbottom;
                this.gravitySpeed = 0;
            }
        }
        this.crashWith = function(obj){
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
}

function updateGameScreen() {
    let x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(i = 0; i < obstacles.length; i += 1){
        if(puffer.crashWith(obstacles[i])){
            return;
        }
    }
    gameScreen.clear();
    gameScreen.frameNo += 1;
    if(gameScreen.frameNo == 1 || everyinterval(5000)){
        x = gameScreen.canvas.width;
        minHeight  = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        obstacles.push(new GameComponent(10, height, "green", x, 0));
        obstacles.push(new GameComponent(10, x - height - gap, "green", x, height + gap));
    }
    for(i = 0; i < obstacles.length; i += 1){
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    score.text="SCORE: " + gameScreen.frameNo;
    score.update();
    puffer.newPos();
    puffer.update();
}

function everyInterval(n){
    if((gameScreen.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function accelerate(n){
    puffer.gravity = n;
}