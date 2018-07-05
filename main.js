var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var eraser = document.getElementById('eraser')
var isPainting = false
var isEraser = false
var lastPoint = {
    x: undefined, 
    y: undefined
}

setCanvasSize(canvas)

if (document.body.ontouchstart !== undefined) {
    listenToTouch(canvas)
} else {
    listenToMouse(canvas)
}

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

function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

function listenToMouse(canvas) {
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

function listenToTouch(canvas) {
    canvas.ontouchstart = function(e) {
        isPainting = true
        var x = e.touches['0'].clientX
        var y = e.touches['0'].clientY
        if (isEraser) {
            context.clearRect(x-7.5, y-7.5, 15, 15)
        } else {
            drawCircle(x, y, 2.2)
            lastPoint.x = x
            lastPoint.y = y
        }
    }
    
    canvas.ontouchmove = function(e) {
        if (isPainting) {
            var x = e.touches['0'].clientX
            var y = e.touches['0'].clientY      
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
    
    canvas.ontouchend = function(e) {
        isPainting = false
    }
}