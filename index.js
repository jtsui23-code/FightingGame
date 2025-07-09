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

// Created sprite class that the player and enemy are objects of.
class Sprite {

    constructor(position,size){
        this.position = position
        this.size = size
    }

    draw(color) {
        c.fillStyle = color
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }
}

const player = new Sprite({
    x:0,
    y:0
}, {
    width: 50,
    height:150
})

const enemy = new Sprite({
    x:canvas.width - 50,
    y: 0
}, {
    width: 50, 
    height: 150
})

enemy.draw('red')

player.draw('green')


