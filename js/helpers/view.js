function renderGame(){    
    game.context.clearRect(0, 0, game.options.width, game.options.height);
    game.context.fillStyle = game.options.backgroundColor;
    game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);

    game.objects.forEach(object => {
        drawBody(object)
    })

    drawZoomEarthMoon()
}

function drawZoomEarthMoon(){
    game.context.font = "12px Arial";
    game.context.fillStyle = "white";
    game.context.textAlign = "left";
    game.context.fillText(`Zoom terra+lua ${Math.round(game.scales.earthMoonZoom)}x`, game.userControls.mousePos.x, game.userControls.mousePos.y);
}

function rectangle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function drawBody(body){
    game.context.fillStyle = game.options.planetsColor;
    game.context.beginPath();
    let xCenter = body.x / game.scales.kmToPixel
    let yCenter = body.y / game.scales.kmToPixel
    let planetRadius = body.diameter/2
    let radius = planetRadius * game.scales.planetZoom / game.scales.kmToPixel
    radius = Math.max(game.scales.minimumRadius,radius)
    let sAngle = 0 //The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
    let eAngle = 2 * Math.PI // The ending angle, in radians
    game.context.arc(xCenter, yCenter, radius, sAngle, eAngle);
    game.context.fill();
    drawTangentialVelocityArrow(body);
    drawDisplayName(body);
}

function isEarthOrMoon(body){
    return body.id == 'earth' || body.id == 'moon'
}

function isMoon(body){
    return body.id == 'moon'
}

function drawTangentialVelocityArrow(body){
    if(body.tangentialVelocity == 0){
        return
    }
    let startingPointX = body.x / game.scales.kmToPixel
    let startingPointY = body.y / game.scales.kmToPixel
    let angle = body.getOrbitAngleFromCenterObject(body.orbitingAround)
    let velocity = body.tangentialVelocity
    if(velocity > 0 && velocity < 10){
        velocity = 5
    } else if (velocity < 0 && velocity > -10){
        velocity = -5
    }
    let endingPointX = startingPointX + velocity * Math.cos(angle)
    let endingPointY = startingPointY + velocity * Math.sin(angle * -1)
    canvas_arrow(startingPointX,startingPointY,endingPointX,endingPointY,Math.abs(velocity/5));
}

function drawDisplayName(body){
    game.context.font = "12px Arial";
    game.context.fillStyle = "green";
    game.context.textAlign = "center";
    let posX= body.x / game.scales.kmToPixel
    let margin = 12
    if(isMoon(body)){
        margin *= -1
    }
    let posY= (body.y / game.scales.kmToPixel) + margin
    game.context.fillText(body.getDisplayName(), posX, posY)
}

function canvas_arrow(fromx, fromy, tox, toy, arrowHeadLenth) {
    let dx = tox - fromx;
    let dy = toy - fromy;
    let angle = Math.atan2(dy, dx);
    game.context.beginPath();
    game.context.lineWidth = 1;
    game.context.strokeStyle = game.options.tangentialVelocityColor;
    game.context.moveTo(fromx, fromy);
    game.context.lineTo(tox, toy);
    game.context.lineTo(tox - arrowHeadLenth * Math.cos(angle - Math.PI / 6), toy - arrowHeadLenth * Math.sin(angle - Math.PI / 6));
    game.context.moveTo(tox, toy);
    game.context.lineTo(tox - arrowHeadLenth * Math.cos(angle + Math.PI / 6), toy - arrowHeadLenth * Math.sin(angle + Math.PI / 6));
    game.context.stroke();
}