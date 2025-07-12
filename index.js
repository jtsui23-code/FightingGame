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


const gravity = 0.7

// Created sprite class that the player and enemy are objects of.
class Sprite {

    // Making the parameters one object so its not obligatory to pass every single 
    // one of them in and it no longer matters what order the parameters are passed in which helps for later
    // development when the parameters in the Sprite constructor becomes longer.
    constructor({position,size, velocity, health}){
        this.position = position
        this.size = size
        this.velocity = velocity
        this.health = health
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y

            },
            width: 100,
            height: 50
        }

        this.isAttacking = false
    }

    draw(color) {

        // Rendering the sprite
        c.fillStyle = color
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
        
        if (this.isAttacking){
            // Rendering the attack box
            c.fillStyle = 'green'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        }
        
    }

    update(spriteColor, type) {
        
        this.attackBox.position.y = this.position.y

        if (type === 'enemy') {
            this.attackBox.position.x = this.position.x -this.attackBox.width + this.size.width
        } else {
            this.attackBox.position.x = this.position.x
        }


        
        this.draw(spriteColor)
        
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

    takeDMG(dmg) {
        this.health -= dmg

        if(this.health < 0) {
            this.health = 0
        }
    }

    attack() {
        this.isAttacking = true

        // Adding attack duration
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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

},
   health: 100

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
},

  health: 100


})


const keys = {
    a:{
        pressed:false
    },

    d:{
        pressed:false
    },

    arrowRight:{
        pressed:false
    },

    arrowLeft:{
        pressed:false
    }
}

function rectCollision(rect1, rect2) {
    return (rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x 
        && rect1.attackBox.position.x <= rect2.position.x + rect2.size.width
        && rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
        && rect1.attackBox.position.y <= rect2.size.height + rect2.position.y
        && rect1.isAttacking) 
}




// animate function loops forever used for animating sprites and objects.
function animate() {
    window.requestAnimationFrame(animate)

    // Prevents bleeding effect when moving sprites across the canvas.
    c.fillStyle = 'black'
     c.fillRect(0, 0, canvas.width, canvas.height)

    player.update('blue')
    enemy.update('red', 'enemy')


    player.velocity.x = 0
    
    if (keys.a.pressed && keys.d.pressed){

        player.velocity.x = 0

    } else if (keys.a.pressed){

        player.velocity.x = -5

    }  else if (keys.d.pressed) {

        player.velocity.x = 5

    }

    enemy.velocity.x = 0

    if (keys.arrowRight.pressed && keys.arrowLeft.pressed){

        enemy.velocity.x = 0

    } else if (keys.arrowRight.pressed) {

        enemy.velocity.x = 5

    } else if (keys.arrowLeft.pressed) {

        enemy.velocity.x = -5

    }

    // Detecting attack box collision for player attacking enemy.
    if (rectCollision(player, enemy)) {

        player.isAttacking = false
        
        enemy.takeDmg(20)
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    } 

    // Detecting attack box collision for enemy attacking player.
    if (rectCollision(enemy, player)) {

        enemy.isAttacking = false

        player.takeDMG(20)
        document.querySelector('#playerHealth').style.width = player.health + '%'

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
            player.velocity.y = -20
            break
        
        case 'ArrowRight':
            keys.arrowRight.pressed = true
            break

        case 'ArrowLeft':
            keys.arrowLeft.pressed = true
            break
        
        case 'ArrowUp':
            enemy.velocity.y = -20
            break

        case ' ':
            player.attack()
            break

        case 'ArrowDown':
            enemy.attack()
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
        
        case 'ArrowRight':
            keys.arrowRight.pressed = false
            break

        case 'ArrowLeft':
            keys.arrowLeft.pressed = false
            break

        case 'ArrowUp':
            enemy.velocity.y = 0
            break

        
    }
})


