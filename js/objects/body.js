//units:
// distance = km
// mass = kg
// velocity = km/s
// acceleration = km/s^2

class Body {
    constructor(id,displayName, x, y, diameter, tangentialVelocity, orbitingAround, mass) {
        this.id = id;
        this.displayName = displayName;
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.tangentialVelocity = tangentialVelocity;
        this.orbitingAround = orbitingAround;
        this.mass = mass;
    }
    zoomedX = 0;
    zoomedY = 0;

    getDisplayName(){
        return this.displayName;
    }

    distanceFrom(otherBody) {
        const dx = this.x - otherBody.x;
        const dy = this.y - otherBody.y;
        return Math.hypot(dx, dy);
    }

    getOrbitAngleFromCenterObject(centerObject) {
        // returns 0 rad for 0,1 (0h)
        // returns pi/2 rad for 1,0 (3h)
        // returns pi rad for 0,-1 (6h)
        // returns -pi/2 rad for -1,0 (9h)
        let x = this.x - centerObject.x
        let y = this.y - centerObject.y
        return Math.atan2(x,y)
    }

    moveInOrbit() {
        if(this.tangentialVelocity == 0){
            return
        }
        let startingPointX = this.x 
        let startingPointY = this.y
        let angle = this.getOrbitAngleFromCenterObject(this.orbitingAround)
        let velocity = this.tangentialVelocity
        let moveX = (velocity * Math.cos(angle)) * game.scales.realSecondsPerFrame()
        let moveY = (velocity * Math.sin(angle * -1)) * game.scales.realSecondsPerFrame()
        this.x = startingPointX + moveX
        this.y = startingPointY + moveY
        this.moveSatelittes(moveX,moveY)
    }

    moveSatelittes(moveX,moveY){
        let satelittes = game.objects.filter(object => object.orbitingAround == this)
        satelittes.forEach(satelitte => {
            satelitte.x += moveX
            satelitte.y += moveY 
        })
    }

}

function createInitialObjects() {
    var Sun = new Body(
        "sun",
        "Sol",
        game.canvas.width/2 * game.scales.kmToPixel,
        game.canvas.height/2 * game.scales.kmToPixel,
        1392700,
        0,
        null,
        1.989 * Math.pow(10,30)
    )
    
    var Earth = new Body(
        "earth",
        "Terra",
        Sun.x + 149600000,
        Sun.y,
        12742 * game.scales.earthMoonZoom,
        -29.78,
        Sun,
        5.9742 * Math.pow(10,24)
    )
    
    // var Earth2 = new Body("Terra 2",Sun.x - 149600000,Sun.y,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))
    // var Earth3 = new Body("Terra 3",Sun.x,Sun.y + 149600000,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))
    // var Earth4 = new Body("Terra 4",Sun.x,Sun.y - 149600000,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))
    // var Earth5 = new Body("Terra 5",Sun.x - 149600000/2,Sun.y - 149600000/2,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))
    // var Earth6 = new Body("Terra 6",Sun.x + 149600000/2,Sun.y + 149600000/2,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))
    // var Earth7 = new Body("Terra 7",Sun.x - 149600000/2,Sun.y + 149600000/2,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))
    // var Earth8 = new Body("Terra 8",Sun.x + 149600000/2,Sun.y - 149600000/2,12742* game.scales.earthZoom,-29.78,Sun,5.9742 * Math.pow(10,24))



    var Moon = new Body(
        "moon",
        "Lua",
        Earth.x + (384400* game.scales.earthMoonZoom),
        Earth.y,
        3474 * game.scales.earthMoonZoom,
        -1.0194 * game.scales.earthMoonZoom,
        Earth,
        7.3477 * Math.pow(10,22)
    )

    game.objects.push(Sun,Earth,Moon
        // ,Earth2,Earth3,Earth4,Earth5,Earth6,Earth7,Earth8
    )
}
