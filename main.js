var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var isPainting = false
var isEraser = false
var lineWidth = 5
var radius = 2.2 
var lastPoint = {
    x: undefined, 
    y: undefined
}

document.body.ontouchstart = function(event) {
    event.preventDefault()
}
event.preventDefault()

setCanvasSize(canvas)

pen.onclick =function() {
    isEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
} 

eraser.onclick = function() {
    isEraser = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function() {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'picture'
    a.click()
}

colors.onclick = function(e) {
    var color = e.target.classList.value
    if (color != 'colors') {
        removeClassAll('colorActive')
        e.target.classList.add('colorActive')
        context.fillStyle = color
        context.strokeStyle = color
    }
}

sizes.onclick = function(e) {
    var size = e.target.classList.value
    console.log(size)
    if (size == 'thin') {
        lineWidth = 5
        radius = 2.4
        removeClassAll
    } else if(size == 'thick') {
        lineWidth = 10
        radius = 4.8
    } 
}

function removeClassAll(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

if (document.body.ontouchstart !== undefined) {
    listenToTouch(canvas)
} else {
    listenToMouse(canvas)
}

function drawCircle(x, y) {
    context.beginPath()
    context.arc(x, y, radius, 0 , 360)
    context.fill()
}

function drawLine(x, y, x1, y1) {
    context.beginPath()
    context.moveTo(x, y)
    context.lineWidth = lineWidth
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
            drawCircle(x, y)
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
                drawCircle(x, y)
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
            drawCircle(x, y)
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
                drawCircle(x, y)
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