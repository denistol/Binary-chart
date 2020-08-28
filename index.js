let timer = true
let W = window.innerWidth
let H = window.innerHeight - 100
let FPS = 60
let COUNT_PER_PAGE = 30
let SAFE_HEIGHT_PERCENT = 75
let DOT_LINE_WIDTH = 4
let DOT_WIDTH = 4
let TOP_BOTTOM_OFFSET_PX = 120
let INFO = {}
let POINT_WIDTH = W / COUNT_PER_PAGE
const canvas = document.createElement('canvas')
const pulse = document.querySelector('.pulse')
const infoBlock = document.querySelector('.info')
let dataArray = []
let cursorOnCanvas = false
canvas.width = W
canvas.height = H
document.body.prepend(canvas)
const rand = (min, max) => Math.random() * (max - min) + min
const cursor = { x: 0,y: 0 }
const colors = {
    background: '#343b4c',
    success: '#32ac48',
    danger: '#db4931',
    secondary: '#5e6577',
    chartGradient: 'rgba(120,255,240,0.01)'
}
const ctx = canvas.getContext('2d')
ctx.translate(0.5, 0.5);
ctx.lineWidth = 1
const minusButton = document.querySelector('.minus')
let savedCoordinates = []

const getVisibleItems = () => {
    let limit = Math.floor(COUNT_PER_PAGE / 1.5)
    if(dataArray.length > limit) {
        const items = dataArray.slice(Math.max(dataArray.length - limit, 1))
        return items.map((el, index) => ({...el, index}))
    }
    return dataArray.map((el, index) => ({...el, index}))
}
const resetParams = () => {
    FPS = 60
    COUNT_PER_PAGE = 30
    SAFE_HEIGHT_PERCENT = 75
    DOT_LINE_WIDTH = 4
    DOT_WIDTH = 4
    TOP_BOTTOM_OFFSET_PX = 60
    INFO = {}
    POINT_WIDTH = W / COUNT_PER_PAGE
}
canvas.addEventListener('click', (e) => {
    // dataArray = []
    savedCoordinates = []

    savedCoordinates.push({x: e.clientX, y: e.clientY })
})
canvas.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        COUNT_PER_PAGE = COUNT_PER_PAGE + 3
        TOP_BOTTOM_OFFSET_PX += 0.3
    } else {
        if(COUNT_PER_PAGE <= 6) {
            return
        }
        COUNT_PER_PAGE = COUNT_PER_PAGE - 3
        TOP_BOTTOM_OFFSET_PX -= 0.3
    }
    POINT_WIDTH = W / COUNT_PER_PAGE
})
// Load fake data
canvas.addEventListener('mouseenter', e => { cursorOnCanvas = true })
canvas.addEventListener('mouseleave', e => { cursorOnCanvas = false })
document.addEventListener('mousemove', e => {
    cursor.x = e.clientX
    cursor.y = e.clientY
    
})
canvas.addEventListener('mousemove', e => {
    getYPrice()
    
})
const setInfo = () => {
    
    const highestVal = Math.max(...dataArray.map(el => el.bid))
    const lowestVal = Math.min(...dataArray.map(el => el.bid))
    const lowestItem = dataArray.find(el => el.bid === lowestVal)
    const highestItem = dataArray.find(el => el.bid === highestVal)

    INFO.last = [...dataArray].pop()
    INFO.highest = highestItem
    INFO.lowest = lowestItem
}
const drawTextHint = (c, text) => {
    ctx.fillStyle = '#fff'
    ctx.font = "16px sans-serif";
    ctx.fillText(`BID: ${text}`, c.x + 5, c.y - 5);
}
const drawCrossLine = () => {
    if(!cursorOnCanvas) { return }
    ctx.lineWidth = 1
    ctx.setLineDash([1,1])
    ctx.strokeStyle = colors.secondary
    ctx.beginPath();  
    // draw X
    ctx.moveTo(cursor.x, 0)
    ctx.lineTo(cursor.x, W)
    ctx.stroke()
    // draw X
    ctx.beginPath()
    ctx.moveTo( 0, cursor.y)
    ctx.lineTo(W, cursor.y)
    ctx.stroke()
    ctx.arc(cursor.x,cursor.y, DOT_WIDTH, 0, 2 * Math.PI)
    ctx.fill()
    drawTextHint(cursor, cursor.x)
    
}
const drawCurrentPriceLine = () => {
    if(!dataArray.length) { return }
    ctx.lineWidth = 1
    const last = [...getVisibleItems()].pop()
    const yPos = getYPosition(last)
    
    ctx.strokeStyle = colors.success
    ctx.setLineDash([4,6])
    ctx.beginPath()
    ctx.moveTo(0, yPos  )
    ctx.lineTo(W, yPos  )
    ctx.stroke()
}
const drawSavedCoordinates = () => {
    savedCoordinates.forEach(c => {
        ctx.setLineDash([0,0])
        ctx.lineWidth = 1
        ctx.strokeStyle = colors.success
        ctx.beginPath();  
        // draw X
        // ctx.moveTo(c.x, 0)
        // ctx.lineTo(c.x, W)
        // ctx.stroke()
        // draw X
        ctx.beginPath()
        ctx.moveTo( 0, c.y)
        ctx.lineTo(W, c.y)
        ctx.stroke()
    })
}
const drawHighLowLines = () => {
    const items = dataArray
    if(!items.length) { return }

    ctx.lineWidth = 1
    
    const min = Math.min(...items.map(el => el.bid))
    const max = Math.max(...items.map(el => el.bid))
    const yMax = items.find(el => el.bid === max)
    const yMaxCoords = getYPosition(yMax)
    const yMin = items.find(el => el.bid === min)
    const yMinCoords = getYPosition(yMin)
    // LOW
    ctx.setLineDash([2,2])
    ctx.fillStyle = colors.success
    ctx.font = "14px sans-serif";
    ctx.fillText(max.toFixed(3), W - 160, yMaxCoords - 5);
    
    ctx.strokeStyle = colors.success
    ctx.beginPath();  
    ctx.beginPath()
    ctx.moveTo( 0, yMaxCoords)
    ctx.lineTo(W, yMaxCoords)
    ctx.stroke()

    // HI
    ctx.setLineDash([2,2])
    ctx.fillStyle = colors.danger
    ctx.font = "14px sans-serif";
    ctx.fillText(min.toFixed(3), W - 160, yMinCoords - 5);
    ctx.strokeStyle = colors.danger
    ctx.beginPath();  
    ctx.beginPath()
    ctx.moveTo( 0, yMinCoords)
    ctx.lineTo(W, yMinCoords)
    ctx.stroke()

}
const getYPrice = () => {
    const currentY = H - cursor.y
    const items = getVisibleItems()

    const maxPrice = Math.max(...items.map(el => el.bid)) || 0
    const minPrice = Math.min(...items.map(el => el.bid)) || 0

    const minPos = 0
    const maxPos = H

    const r =(minPrice-maxPrice)/(minPos-maxPos)*(currentY-minPos) + minPrice
    console.log(r)

    
}
const getYPosition = (el) => {
    const items = getVisibleItems()

    const current = el.bid
    const max = Math.max(...items.map(el => el.bid)) || current
    const min = Math.min(...items.map(el => el.bid)) || current
    const h = ((TOP_BOTTOM_OFFSET_PX - (H - TOP_BOTTOM_OFFSET_PX))/(min-max)*(current-min) + TOP_BOTTOM_OFFSET_PX)
    return H - h

}
const drawDot = (el, i, prev) => {
    // COLORS
    if((el && prev) && el.bid > prev.bid) {
        ctx.fillStyle = colors.success
    } else {
        ctx.fillStyle = colors.danger
    }
    const x = POINT_WIDTH * el.index
    const y = getYPosition(el)
    
    ctx.beginPath()
    ctx.arc(x,y, DOT_WIDTH, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = colors.secondary
    ctx.font = "12px sans-serif";
    ctx.fillText(`BID:${el.bid}`, x + 5, y - 5);

    drawPulse(x,y)
}
const drawJoinLine = (el, prev) => {
    if(!prev) { return }
    const elY = getYPosition(el)
    const elX = (el.index * POINT_WIDTH)

    const prevX = (prev.index * POINT_WIDTH)
    const prevY = getYPosition(prev)
    if((el && prev) && el.bid > prev.bid) {
        ctx.strokeStyle = colors.success
    } else {
        ctx.strokeStyle = colors.danger
    }
    ctx.lineWidth = DOT_LINE_WIDTH
    ctx.setLineDash([0,0])
    
    ctx.beginPath()
    ctx.moveTo(elX, elY)
    ctx.lineTo(prevX, prevY)
    ctx.stroke()

}
const drawBackground = () => {
    const items = getVisibleItems()
    if(!items.length) {
        return
    }
    const coords = [
        ...items.map(el => {
            return {
                y: getYPosition(el),
                x: (el.index * POINT_WIDTH)
            }
        }),
        {x: ((items[items.length - 1].index) * POINT_WIDTH), y: H },
    ]
    ctx.beginPath()
    var my_gradient = ctx.createLinearGradient(0, 0, 0, H);
    my_gradient.addColorStop(0, colors.chartGradient);
    my_gradient.addColorStop(1, colors.background);
    
    ctx.moveTo(0, H)
    coords.forEach(el => {
        ctx.lineTo(el.x, el.y)
    })
    ctx.fillStyle = my_gradient
    ctx.lineTo(0, H)
    ctx.fill()
}
const render = () => {
    ctx.fillStyle = colors.background
    ctx.fillRect(0,0,W,H)
    drawBackground()
    drawCurrentPriceLine()
    drawSavedCoordinates()
    drawGrid()
    drawHighLowLines()
    const items = getVisibleItems()
    for(let i =0; i < items.length; i++) {
        const curr = items[i]
        const prev = i > 0 ? items[i-1] : false
        drawJoinLine( curr, prev )
    }
    for(let i =0; i < items.length; i++) {
        const curr = items[i]
        const prev = i > 0 ? items[i-1] : false
        drawDot( curr, i, prev )
    }
    drawCrossLine()
    drawPulse()
}
const drawPulse = (x,y) => {
    pulse.style.left = x - 55 + 'px'
    pulse.style.top = y - 55 + 'px'
}
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.setLineDash([1,1])
    const rows = W / POINT_WIDTH

    for(let i = 0; i<= rows; i++) {
        ctx.strokeStyle = colors.secondary
        ctx.beginPath()
        ctx.moveTo(POINT_WIDTH*i, 0)
        ctx.lineTo(POINT_WIDTH*i, H)
        ctx.stroke()
    }
}
const pushRandom = () => {
    let item = { bid: rand(4560, 5000),ask: rand(2, 5000) }
    dataArray.push(item)
}
setInterval(() => {
    timer && pushRandom()
},190)
const toggleTimer = () => { timer = !timer }
const renderInfo = () => {
    if(!INFO.highest && !INFO.lowest) {
        return
    }
    infoBlock.textContent = `HI_BID: ${INFO.highest.bid} / LOW_BID:${INFO.lowest.bid} / TOP_BOTTOM_OFFSET_PX :${TOP_BOTTOM_OFFSET_PX}`
}
const step = () => {
    setInfo()
    renderInfo()
    render()
    window.requestAnimationFrame(step)
}
window.requestAnimationFrame(step)
