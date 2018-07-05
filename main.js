var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
canvas.width = pageWidth
canvas.height = pageHeight

var painting = false
var lastPoint = {
    x: undefined, 
    y: undefined
}
canvas.onmousedown = function(e) {
    console.log('down')
    painting = true
    var x = e.clientX
    var y = e.clientY
    drawCircle(x, y, 2)
    lastPoint = {
        x: x,
        y: y
    }
    drawLine(x, y, x, y)
}

canvas.onmousemove = function(e) {
    if (painting) {
        console.log('move')
        var x = e.clientX
        var y = e.clientY
        var newPoint = {
            x: x,
            y: y
        }
        drawCircle(x, y, 2)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
    }
}

canvas.onmouseup = function(e) {
    painting = false
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0 , 360)
    context.fill()
}

function drawLine(x, y, x1, y1) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineWidth = 5
    context.lineTo(x1, y1)
    context.stroke()
    context.closePath()
}