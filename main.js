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

setCanvasSize(canvas)

pen.onclick = function () {
    isEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

eraser.onclick = function () {
    isEraser = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

download.onclick = function () {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'picture'
    a.click()
}

colors.onchange = function (e) {
    var color = e.target.value
    context.fillStyle = color
    context.strokeStyle = color
}

sizes.onchange = function (e) {
    var size = e.target.value
    console.log(size)
    lineWidth = size
    radius = 0.44 * size
    console.log(radius)
}

if (document.body.ontouchstart !== undefined) {
    listenToTouch(canvas)
} else {
    listenToMouse(canvas)
}

function drawCircle(x, y) {
    context.beginPath()
    context.arc(x, y, radius, 0, 360)
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
    canvas.onmousedown = function (e) {
        isPainting = true
        var x = e.clientX
        var y = e.clientY
        if (isEraser) {
            context.clearRect(x - 7.5, y - 7.5, 15, 15)
        } else {
            drawCircle(x, y)
            lastPoint.x = x
            lastPoint.y = y
        }
    }

    canvas.onmousemove = function (e) {
        if (isPainting) {
            var x = e.clientX
            var y = e.clientY
            if (isEraser) {
                context.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {
                drawCircle(x, y)
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint.x = x
                lastPoint.y = y
            }
        }
    }

    canvas.onmouseup = function (e) {
        isPainting = false
    }
}

function listenToTouch(canvas) {
    canvas.ontouchstart = function (e) {
        isPainting = true
        var x = e.touches['0'].clientX
        var y = e.touches['0'].clientY
        if (isEraser) {
            context.clearRect(x - 7.5, y - 7.5, 15, 15)
        } else {
            drawCircle(x, y)
            lastPoint.x = x
            lastPoint.y = y
        }
    }

    canvas.ontouchmove = function (e) {
        if (isPainting) {
            var x = e.touches['0'].clientX
            var y = e.touches['0'].clientY
            if (isEraser) {
                context.clearRect(x - 7.5, y - 7.5, 15, 15)
            } else {
                drawCircle(x, y)
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint.x = x
                lastPoint.y = y
            }
        }
    }

    canvas.ontouchend = function (e) {
        isPainting = false
    }
}