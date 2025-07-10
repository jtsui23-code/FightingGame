// Grabs the canvas item in the index.html page
const canvas = document.querySelector('canvas')

// c - context shorthand because using it quite often. Responsible 
// for drawing sprites for the game.
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// Selecting the color to fill the canvas and fills the canvas with that color.
c.fillStyle = 'white'
c.fillRect(0,0, canvas.width, canvas.height)


const gravity = 0.2

// Created sprite class that the player and enemy are objects of.
class Sprite {

    // Making the parameters one object so its not obligatory to pass every single 
    // one of them in and it no longer matters what order the parameters are passed in which helps for later
    // development when the parameters in the Sprite constructor becomes longer.
    constructor({position,size, velocity}){
        this.position = position
        this.size = size
        this.velocity = velocity
    }

    draw(color) {
        c.fillStyle = color
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }

    update() {
        this.draw("red")
        
        // Moves player to the ground
        this.position.y +=  this.velocity.y
        this.position.x += this.velocity.x

        // Prevents player from moving past the bottom of the canvas.
        if (this.position.y + this.size.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0

        } else {

            this.velocity.y += gravity

        }
    }
}

const player = new Sprite({
position:{
    x:0,
    y:0

}, size:{

    width: 50,
    height:150

}, velocity:{
    x:0,
    y:0
}

})

const enemy = new Sprite({
position: {
    x:canvas.width - 50,
    y: 0

}, size:{

    width: 50, 
    height: 150

}, velocity:{

    x:0,
    y:0
}

})


const keys = {
    a:{
        pressed:false
    },

    d:{
        pressed:false
    }
}


// animate function loops forever used for animating sprites and objects.
function animate() {
    window.requestAnimationFrame(animate)

    // Prevents bleeding effect when moving sprites across the canvas.
    c.fillStyle = 'black'
     c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    enemy.update()


    player.velocity.x = 0
    
    if (keys.a.pressed){
        player.velocity.x = -1

    }  else if (keys.d.pressed) {

        player.velocity.x = 1

    }

}


animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':

            keys.d.pressed = true
            break

        case 'a':
            keys.a.pressed = true
            break
        
        case 'w':
            player.velocity.y = -10
            break
        
    }
    console.log(event)
})


window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 'w':
            player.velocity.y = 0
            break
    }
})


