var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var eraser = document.getElementById('eraser')

canvasSize(canvas)

listenToMouse(canvas)




var isEraser = false
eraser.onclick = function(e) {
    isEraser = !isEraser
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

function canvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

function listenToMouse(canvas) {
    var isPainting = false

    var lastPoint = {
        x: undefined, 
        y: undefined
    }

    canvas.onmousedown = function(e) {
        isPainting = true
        var x = e.clientX
        var y = e.clientY
        if (isEraser) {
            context.clearRect(x-7.5, y-7.5, 15, 15)
        } else {
            drawCircle(x, y, 2.2)
            lastPoint.x = x
            lastPoint.y = y
        }  
    }

    canvas.onmousemove = function(e) {
        if (isPainting) {
            var x = e.clientX
            var y = e.clientY      
            if (isEraser) {
                context.clearRect(x-7.5, y-7.5, 15, 15)
            } else {
                drawCircle(x, y, 2.2)
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint.x = x
                lastPoint.y = y
            } 
        }
    }

    canvas.onmouseup = function(e) {
        isPainting = false
    }
}