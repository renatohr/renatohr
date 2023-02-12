var game = {
    canvas : document.createElement("canvas"),
    scales : {
        kmToPixel: 250000,
        planetZoom: 1,
        earthMoonZoom: 20,
        minimumRadius: .5,
        fps: 60,
        realSecondsPerGameSecond: 1 * 60 * 60 * 24, //1 day
        // 1min = 1 * 60
        // 1h = 1 * 60 * 60
        // 1day = 1 * 60 * 60 * 24
        // 1week = 1 * 60 * 60 * 24 * 7
        realSecondsPerFrame : function(){
            return game.scales.realSecondsPerGameSecond/game.scales.fps
        } 
    },
    options : {
        width: 1400,
        height: 1400,
        backgroundColor: "black",
        planetsColor: "white",
        tangentialVelocityColor: "green",
    },
    userControls : {
        mousePos: {
            x:null,
            y:null
        }
    },
    objects : [],
    start : function() {
        this.canvas.width = game.options.width;
        this.canvas.height = game.options.height;
        this.context = this.canvas.getContext("2d");

        game.context.fillStyle = game.options.backgroundColor;
        game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
    
    

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    render : () => renderGame(),
    createInitialObjects: () => createInitialObjects(),
    updateGame: () => updateGame(),
    loop : function() {
        this.updateGame();
        this.render();
        setTimeout(() => this.loop(), 1000 / game.scales.fps);
    }
}

game.start();
game.createInitialObjects();
game.loop();
game.canvas.addEventListener('mousemove', function(evt) {
    let mousePos = getMousePos(evt);
    game.userControls.mousePos = mousePos;
    // console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
}, false);




function getMousePos(evt) {
    let rect = game.canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
