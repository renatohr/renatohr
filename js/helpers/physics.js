function updateGame(){

    game.objects.forEach(object => {
        object.moveInOrbit()
    })

    // defineEarthMoonScale()

}


// function defineEarthMoonScale(){
//     mousePos = game.userControls.mousePos
//     if(mousePos.x == null){
//         return
//     }
//     mousePosUniverseScale = {
//         x: mousePos.x * game.scales.kmToPixel,
//         y: mousePos.y * game.scales.kmToPixel
//     }
//     earth = game.objects.find(object => object.id === 'earth')
//     distance = earth.distanceFrom(mousePosUniverseScale)/game.scales.kmToPixel
//     if (distance > 300){
//         game.scales.earthMoonZoom = 1    
//     }else{
//         game.scales.earthMoonZoom = Math.max(1,Math.min(500,5000000/(distance*distance)))
//     }
// }