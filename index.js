let timer = true

let W = window.innerWidth
let H = window.innerHeight - 100
let FPS = 60
let COUNT_PER_PAGE = 30
let SAFE_HEIGHT_PERCENT = 75
let DOT_LINE_WIDTH = 3
let DOT_WIDTH = 5
let TOP_BOTTOM_OFFSET_PX = 120
let INFO = {}
let POINT_WIDTH = W / COUNT_PER_PAGE
let CURSOR_PRICE = 0
let CLICKED = false
let CLICKED_POS = {x:0,y:0}
let SIDE_OFFSET = H/2
let HOVERED_COLUMN = null
let AVG_PRICE = 0
let MIN_PRICE = 0
let MAX_PRICE = 0
let LAST_PRICE = 0

const canvas = document.createElement('canvas')
const infoBlock = document.querySelector('.info')
canvas.width = W
canvas.height = H
let dataArray = []
let cursorOnCanvas = false
document.body.prepend(canvas)
const rand = (min, max) => Number( (Math.random() * (max - min) + min).toFixed() )
const cursor = { x: 0,y: 0 }
const colors = {
    background: '#131722',
    success: '#26a69a',
    danger: '#db4931',
    secondary: '#333',
    chartGradient: 'rgba(38,198,218, 0.56)'
}
const ctx = canvas.getContext('2d')
ctx.translate(0.5, 0.5);
ctx.lineWidth = 1
const minusButton = document.querySelector('.minus')
let savedCoordinates = []

const getVisibleItems = () => {
    let limit = Math.floor(COUNT_PER_PAGE / 1.5)

    let m = (el, index) => ({...el, index, y: getYPosition(el)})

    if(dataArray.length > limit) {
        const items = dataArray.slice(Math.max(dataArray.length - limit, 1))
        return items.map(m)
    }
    return dataArray.map(m)
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
    savedCoordinates = []
}
canvas.addEventListener('click', (e) => {
    // dataArray = []
    savedCoordinates = []

    savedCoordinates.push({x: e.clientX, y: e.clientY, price: CURSOR_PRICE })
})
canvas.addEventListener('mousedown', (e) => {
    CLICKED = true
    CLICKED_POS = {x: e.clientX, y: e.clientY}
})
canvas.addEventListener('mouseup', (e) => {
    CLICKED = false
})
canvas.addEventListener('mouseleave', (e) => {
    CLICKED = false
})
canvas.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        COUNT_PER_PAGE = COUNT_PER_PAGE + 3
        // TOP_BOTTOM_OFFSET_PX += 0.3
    } else {
        if(COUNT_PER_PAGE <= 6) {
            return
        }
        COUNT_PER_PAGE = COUNT_PER_PAGE - 3
        // TOP_BOTTOM_OFFSET_PX -= 0.3
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
window.onresize = () => {
    console.log('resize')
    W = window.innerWidth
    H = window.innerHeight - 100
    canvas.width = W
    canvas.height = H
}
canvas.addEventListener('mousemove', e => {
    setCursorPrice()
})
const changeOffset = s => {
    if(s) {
        SIDE_OFFSET +=50
    } else {
        SIDE_OFFSET -=50
    }
}
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
    ctx.font = "12px sans-serif";
    ctx.fillText(`BID: ${CURSOR_PRICE}`, c.x + 5, c.y - 5);
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
    ctx.closePath()
    // draw X
    // ctx.beginPath()
    // ctx.moveTo( 0, cursor.y)
    // ctx.lineTo(W, cursor.y)
    // ctx.stroke()
    // ctx.arc(cursor.x,cursor.y, DOT_WIDTH, 0, 2 * Math.PI)
    // ctx.fill()
    ctx.beginPath()
    ctx.setLineDash([0,0])
    ctx.strokeStyle = colors.success
    ctx.lineWidth = 2
    ctx.moveTo(cursor.x - 15, cursor.y)
    ctx.lineTo(cursor.x + 15, cursor.y)
    ctx.moveTo(cursor.x, cursor.y - 15)
    ctx.lineTo(cursor.x, cursor.y + 15)
    ctx.stroke()
    ctx.closePath()
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

    ctx.fillStyle = '#fff'
    ctx.font = "12px sans-serif";
    ctx.fillText(`BID:${last.bid}`, W-160 + 5, yPos - 5);
}
const drawAvgPriceLine = () => {
    if(!dataArray.length) { return }
    ctx.lineWidth = 1
    const yPos = getYPosition({bid: AVG_PRICE})
    
    ctx.strokeStyle = 'red'
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
        
        ctx.moveTo(c.x, 0)
        ctx.lineTo(c.x, W)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo( 0, c.y)
        ctx.lineTo(W, c.y)
        ctx.stroke()
        ctx.fillStyle = colors.success
        ctx.font = "14px sans-serif";
        ctx.fillText(c.price, c.x, c.y);
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
const setCursorPrice = () => {

    const cur = (H/2) - cursor.y
    const halfSide = (H/2) - ( (H/2) - (SIDE_OFFSET/2) )
    const cursorPrice = ( (MAX_PRICE - AVG_PRICE) * cur / halfSide) + AVG_PRICE
    CURSOR_PRICE = cursorPrice

}
checkPointIntersections = () => {
    const items = getVisibleItems()
    if(!items.length) {
        return
    }
    const pointIndex = Math.floor( (cursor.x + POINT_WIDTH/2) / (POINT_WIDTH))
    const point = items[pointIndex]
    if(!point) {
        return
    }
    const isIntersected = ((cursor.y - 10) <= point.y) && ((cursor.y + 10) >= point.y)
    if( isIntersected ){
        HOVERED_COLUMN = pointIndex
    } else {
        HOVERED_COLUMN = null
    }
    
    // console.log(point)
    if(point.y === cursor.y) {
        console.log('EEEE')
    }
    // const dotX = 
    // console.log(  )
}
const getYPosition = (el) => {
    const of = (H + SIDE_OFFSET)
    const offset = of / 2
    const CUR = el.bid
    const CUR_OFF = (CUR - MIN_PRICE)
    const RES =  (H-of) * CUR_OFF / (MAX_PRICE - MIN_PRICE)
    return RES + offset

}
const drawDot = (el, i, prev) => {
    // COLORS
    const isHovered = el.index === HOVERED_COLUMN
    if(isHovered) {
        ctx.fillStyle = '#fff'
    }
    else if((el && prev) && el.bid > prev.bid) {
        ctx.fillStyle = colors.success
    } else {
        ctx.fillStyle = colors.danger
    }
    const dotWidth = isHovered ? DOT_WIDTH*2 : DOT_WIDTH
    const x = POINT_WIDTH * el.index
    const y = el.y
    
    ctx.beginPath()
    ctx.arc(x,y, dotWidth, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = colors.secondary
    ctx.font = "12px sans-serif";
    ctx.fillText(`BID:${el.bid}`, x + 5, y - 5);

    // TEST
    // drawCandle(el)

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
const checkPrice = () => {
    if(savedCoordinates[0] && savedCoordinates[0].price <= LAST_PRICE) {
        console.log('trigger')
        savedCoordinates = []
    }
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
    checkPrice()
    drawBackground()
    drawCurrentPriceLine()
    drawAvgPriceLine()
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
    drawCursorLine()
    if(HOVERED_COLUMN && cursorOnCanvas) {
        document.body.style.cursor = 'pointer'
    } else {
        document.body.style.cursor = 'default'
    }
}
const drawCandle = (el) => {
    ctx.fillStyle = '#fff'
    const halfHeight = 30
    const lineHeight = 100
    const width = 6
    const x = (POINT_WIDTH * el.index) - width/2
    // draw line

    ctx.fillRect(x+2, (el.y - lineHeight/2), 1, lineHeight)

    // draw top
    ctx.fillStyle = 'red'
    let ay = (el.y) - halfHeight
    ctx.fillRect(x,ay, width,halfHeight)
    
    // draw bot
    ctx.fillStyle = 'red'
    const by = (el.y)
    ctx.fillRect(x,by, width,halfHeight)
}
const setData = (obj) => {
    dataArray.push(obj)
    LAST_PRICE = dataArray[dataArray.length - 1].bid
    MAX_PRICE = Math.max(...dataArray.map(el => el.bid))
    MIN_PRICE = Math.min(...dataArray.map(el => el.bid))
    AVG_PRICE = (MAX_PRICE + MIN_PRICE) / 2
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
const pushRandom = (item) => {
    setData(item || { bid: rand(10, 160),ask: rand(10, 20) })
}
setInterval(() => {
    timer && pushRandom(testData[iter])
    iter ++
},1200)
const log = () => {

    if(!dataArray.length) { return }
    const min = Math.min(...dataArray.map(el => el.bid))
    const max = Math.max(...dataArray.map(el => el.bid))
    const logContainer = document.querySelector('.info')
    logContainer.textContent = `
    CUR_BID: ${dataArray[dataArray.length - 1].bid.toFixed(0)}
    MAX_BID: ${max.toFixed(0)}
    MIN_BID: ${min.toFixed(0)}
    DIFF: ${(max - min).toFixed(0)},
    CLICKED: ${CLICKED},
    CLICKED_POS: ${CLICKED_POS.x} - ${CLICKED_POS.y}
    CURSOR_POS: ${cursor.x} - ${cursor.y}
    `
}
const drawCursorLine = () => {
    let start = CLICKED_POS
    let end = cursor
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.setLineDash([4,4])
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
}
const toggleTimer = () => { timer = !timer }
// for (let index = 0; index < 2500; index++) {
//     setData({ bid: rand(10, 20),ask: rand(10, 20) })
    
// }
const step = () => {
    checkPointIntersections()
    log()
    render()
    window.requestAnimationFrame(step)
}
window.requestAnimationFrame(step)
let iter = 0
const testData = [
{ time: '2018-10-19', ask: 54.62, high: 55.50, low: 54.52, bid: 54.90 },
{ time: '2018-10-22', ask: 55.08, high: 55.27, low: 54.61, bid: 54.98 },
{ time: '2018-10-23', ask: 56.09, high: 57.47, low: 56.09, bid: 57.21 },
{ time: '2018-10-24', ask: 57.00, high: 58.44, low: 56.41, bid: 57.42 },
{ time: '2018-10-25', ask: 57.46, high: 57.63, low: 56.17, bid: 56.43 },
{ time: '2018-10-26', ask: 56.26, high: 56.62, low: 55.19, bid: 55.51 },
{ time: '2018-10-29', ask: 55.81, high: 57.15, low: 55.72, bid: 56.48 },
{ time: '2018-10-30', ask: 56.92, high: 58.80, low: 56.92, bid: 58.18 },
{ time: '2018-10-31', ask: 58.32, high: 58.32, low: 56.76, bid: 57.09 },
{ time: '2018-11-01', ask: 56.98, high: 57.28, low: 55.55, bid: 56.05 },
{ time: '2018-11-02', ask: 56.34, high: 57.08, low: 55.92, bid: 56.63 },
{ time: '2018-11-05', ask: 56.51, high: 57.45, low: 56.51, bid: 57.21 },
{ time: '2018-11-06', ask: 57.02, high: 57.35, low: 56.65, bid: 57.21 },
{ time: '2018-11-07', ask: 57.55, high: 57.78, low: 57.03, bid: 57.65 },
{ time: '2018-11-08', ask: 57.70, high: 58.44, low: 57.66, bid: 58.27 },
{ time: '2018-11-09', ask: 58.32, high: 59.20, low: 57.94, bid: 58.46 },
{ time: '2018-11-12', ask: 58.84, high: 59.40, low: 58.54, bid: 58.72 },
{ time: '2018-11-13', ask: 59.09, high: 59.14, low: 58.32, bid: 58.66 },
{ time: '2018-11-14', ask: 59.13, high: 59.32, low: 58.41, bid: 58.94 },
{ time: '2018-11-15', ask: 58.85, high: 59.09, low: 58.45, bid: 59.08 },
{ time: '2018-11-16', ask: 59.06, high: 60.39, low: 58.91, bid: 60.21 },
{ time: '2018-11-19', ask: 60.25, high: 61.32, low: 60.18, bid: 60.62 },
{ time: '2018-11-20', ask: 61.03, high: 61.58, low: 59.17, bid: 59.46 },
{ time: '2018-11-21', ask: 59.26, high: 59.90, low: 58.88, bid: 59.16 },
{ time: '2018-11-23', ask: 58.86, high: 59.00, low: 58.29, bid: 58.64 },
{ time: '2018-11-26', ask: 58.64, high: 59.51, low: 58.31, bid: 59.17 },
{ time: '2018-11-27', ask: 59.21, high: 60.70, low: 59.18, bid: 60.65 },
{ time: '2018-11-28', ask: 60.70, high: 60.73, low: 59.64, bid: 60.06 },
{ time: '2018-11-29', ask: 59.42, high: 59.79, low: 59.26, bid: 59.45 },
{ time: '2018-11-30', ask: 59.57, high: 60.37, low: 59.48, bid: 60.30 },
{ time: '2018-12-03', ask: 59.50, high: 59.75, low: 57.69, bid: 58.16 },
{ time: '2018-12-04', ask: 58.10, high: 59.40, low: 57.96, bid: 58.09 },
{ time: '2018-12-06', ask: 58.18, high: 58.64, low: 57.16, bid: 58.08 },
{ time: '2018-12-07', ask: 57.91, high: 58.43, low: 57.34, bid: 57.68 },
{ time: '2018-12-10', ask: 57.80, high: 58.37, low: 56.87, bid: 58.27 },
{ time: '2018-12-11', ask: 58.77, high: 59.40, low: 58.63, bid: 58.85 },
{ time: '2018-12-12', ask: 57.79, high: 58.19, low: 57.23, bid: 57.25 },
{ time: '2018-12-13', ask: 57.00, high: 57.50, low: 56.81, bid: 57.09 },
{ time: '2018-12-14', ask: 56.95, high: 57.50, low: 56.75, bid: 57.08 },
{ time: '2018-12-17', ask: 57.06, high: 57.31, low: 55.53, bid: 55.95 },
{ time: '2018-12-18', ask: 55.94, high: 56.69, low: 55.31, bid: 55.65 },
{ time: '2018-12-19', ask: 55.72, high: 56.92, low: 55.50, bid: 55.86 },
{ time: '2018-12-20', ask: 55.92, high: 56.01, low: 54.26, bid: 55.07 },
{ time: '2018-12-21', ask: 54.84, high: 56.53, low: 54.24, bid: 54.92 },
{ time: '2018-12-24', ask: 54.68, high: 55.04, low: 52.94, bid: 53.05 },
{ time: '2018-12-26', ask: 53.23, high: 54.47, low: 52.40, bid: 54.44 },
{ time: '2018-12-27', ask: 54.31, high: 55.17, low: 53.35, bid: 55.15 },
{ time: '2018-12-28', ask: 55.37, high: 55.86, low: 54.90, bid: 55.27 },
{ time: '2018-12-31', ask: 55.53, high: 56.23, low: 55.07, bid: 56.22 },
{ time: '2019-01-02', ask: 56.16, high: 56.16, low: 55.28, bid: 56.02 },
{ time: '2019-01-03', ask: 56.30, high: 56.99, low: 56.06, bid: 56.22 },
{ time: '2019-01-04', ask: 56.49, high: 56.89, low: 55.95, bid: 56.36 },
{ time: '2019-01-07', ask: 56.76, high: 57.26, low: 56.55, bid: 56.72 },
{ time: '2019-01-08', ask: 57.27, high: 58.69, low: 57.05, bid: 58.38 },
{ time: '2019-01-09', ask: 57.68, high: 57.72, low: 56.85, bid: 57.05 },
{ time: '2019-01-10', ask: 57.29, high: 57.70, low: 56.87, bid: 57.60 },
{ time: '2019-01-11', ask: 57.84, high: 58.26, low: 57.42, bid: 58.02 },
{ time: '2019-01-14', ask: 57.83, high: 58.15, low: 57.67, bid: 58.03 },
{ time: '2019-01-15', ask: 57.74, high: 58.29, low: 57.58, bid: 58.10 },
{ time: '2019-01-16', ask: 57.93, high: 57.93, low: 57.00, bid: 57.08 },
{ time: '2019-01-17', ask: 57.16, high: 57.40, low: 56.21, bid: 56.83 },
{ time: '2019-01-18', ask: 56.92, high: 57.47, low: 56.84, bid: 57.09 },
{ time: '2019-01-22', ask: 57.23, high: 57.39, low: 56.40, bid: 56.99 },
{ time: '2019-01-23', ask: 56.98, high: 57.87, low: 56.93, bid: 57.76 },
{ time: '2019-01-24', ask: 57.61, high: 57.65, low: 56.50, bid: 57.07 },
{ time: '2019-01-25', ask: 57.18, high: 57.47, low: 56.23, bid: 56.40 },
{ time: '2019-01-28', ask: 56.12, high: 56.22, low: 54.80, bid: 55.07 },
{ time: '2019-01-29', ask: 53.62, high: 54.30, low: 52.97, bid: 53.28 },
{ time: '2019-01-30', ask: 53.10, high: 54.02, low: 52.28, bid: 54.00 },
{ time: '2019-01-31', ask: 54.05, high: 55.19, low: 53.53, bid: 55.06 },
{ time: '2019-02-01', ask: 55.21, high: 55.30, low: 54.47, bid: 54.55 },
{ time: '2019-02-04', ask: 54.60, high: 54.69, low: 53.67, bid: 54.04 },
{ time: '2019-02-05', ask: 54.10, high: 54.34, low: 53.61, bid: 54.14 },
{ time: '2019-02-06', ask: 54.11, high: 54.37, low: 53.68, bid: 53.79 },
{ time: '2019-02-07', ask: 53.61, high: 53.73, low: 53.02, bid: 53.57 },
{ time: '2019-02-08', ask: 53.36, high: 53.96, low: 53.30, bid: 53.95 },
{ time: '2019-02-11', ask: 54.13, high: 54.37, low: 53.86, bid: 54.05 },
{ time: '2019-02-12', ask: 54.45, high: 54.77, low: 54.19, bid: 54.42 },
{ time: '2019-02-13', ask: 54.35, high: 54.77, low: 54.28, bid: 54.48 },
{ time: '2019-02-14', ask: 54.38, high: 54.52, low: 53.95, bid: 54.03 },
{ time: '2019-02-15', ask: 54.48, high: 55.19, low: 54.32, bid: 55.16 },
{ time: '2019-02-19', ask: 55.06, high: 55.66, low: 54.82, bid: 55.44 },
{ time: '2019-02-20', ask: 55.37, high: 55.91, low: 55.24, bid: 55.76 },
{ time: '2019-02-21', ask: 55.55, high: 56.72, low: 55.46, bid: 56.15 },
{ time: '2019-02-22', ask: 56.43, high: 57.13, low: 56.40, bid: 56.92 },
{ time: '2019-02-25', ask: 57.00, high: 57.27, low: 56.55, bid: 56.78 },
{ time: '2019-02-26', ask: 56.82, high: 57.09, low: 56.46, bid: 56.64 },
{ time: '2019-02-27', ask: 56.55, high: 56.73, low: 56.35, bid: 56.72 },
{ time: '2019-02-28', ask: 56.74, high: 57.61, low: 56.72, bid: 56.92 },
{ time: '2019-03-01', ask: 57.02, high: 57.15, low: 56.35, bid: 56.96 },
{ time: '2019-03-04', ask: 57.15, high: 57.34, low: 55.66, bid: 56.24 },
{ time: '2019-03-05', ask: 56.09, high: 56.17, low: 55.51, bid: 56.08 },
{ time: '2019-03-06', ask: 56.19, high: 56.42, low: 55.45, bid: 55.68 },
{ time: '2019-03-07', ask: 55.76, high: 56.40, low: 55.72, bid: 56.30 },
{ time: '2019-03-08', ask: 56.36, high: 56.68, low: 56.00, bid: 56.53 },
{ time: '2019-03-11', ask: 56.76, high: 57.62, low: 56.75, bid: 57.58 },
{ time: '2019-03-12', ask: 57.63, high: 58.11, low: 57.36, bid: 57.43 },
{ time: '2019-03-13', ask: 57.37, high: 57.74, low: 57.34, bid: 57.66 },
{ time: '2019-03-14', ask: 57.71, high: 58.09, low: 57.51, bid: 57.95 },
{ time: '2019-03-15', ask: 58.04, high: 58.51, low: 57.93, bid: 58.39 },
{ time: '2019-03-18', ask: 58.27, high: 58.32, low: 57.56, bid: 58.07 },
{ time: '2019-03-19', ask: 58.10, high: 58.20, low: 57.31, bid: 57.50 },
{ time: '2019-03-20', ask: 57.51, high: 58.05, low: 57.11, bid: 57.67 },
{ time: '2019-03-21', ask: 57.58, high: 58.49, low: 57.57, bid: 58.29 },
{ time: '2019-03-22', ask: 58.16, high: 60.00, low: 58.13, bid: 59.76 },
{ time: '2019-03-25', ask: 59.63, high: 60.19, low: 59.53, bid: 60.08 },
{ time: '2019-03-26', ask: 60.30, high: 60.69, low: 60.17, bid: 60.63 },
{ time: '2019-03-27', ask: 60.56, high: 61.19, low: 60.48, bid: 60.88 },
{ time: '2019-03-28', ask: 60.88, high: 60.89, low: 58.44, bid: 59.08 },
{ time: '2019-03-29', ask: 59.20, high: 59.27, low: 58.32, bid: 59.13 },
{ time: '2019-04-01', ask: 59.39, high: 59.41, low: 58.79, bid: 59.09 },
{ time: '2019-04-02', ask: 59.22, high: 59.23, low: 58.34, bid: 58.53 },
{ time: '2019-04-03', ask: 58.78, high: 59.07, low: 58.41, bid: 58.87 },
{ time: '2019-04-04', ask: 58.84, high: 59.10, low: 58.77, bid: 58.99 },
{ time: '2019-04-05', ask: 59.02, high: 59.09, low: 58.82, bid: 59.09 },
{ time: '2019-04-08', ask: 59.02, high: 59.13, low: 58.72, bid: 59.13 },
{ time: '2019-04-09', ask: 58.37, high: 58.56, low: 58.04, bid: 58.40 },
{ time: '2019-04-10', ask: 58.40, high: 58.70, low: 58.36, bid: 58.61 },
{ time: '2019-04-11', ask: 58.65, high: 58.73, low: 58.20, bid: 58.56 },
{ time: '2019-04-12', ask: 58.75, high: 58.79, low: 58.52, bid: 58.74 },
{ time: '2019-04-15', ask: 58.91, high: 58.95, low: 58.59, bid: 58.71 },
{ time: '2019-04-16', ask: 58.79, high: 58.98, low: 58.66, bid: 58.79 },
{ time: '2019-04-17', ask: 58.40, high: 58.46, low: 57.64, bid: 57.78 },
{ time: '2019-04-18', ask: 57.51, high: 58.20, low: 57.28, bid: 58.04 },
{ time: '2019-04-22', ask: 58.14, high: 58.49, low: 57.89, bid: 58.37 },
{ time: '2019-04-23', ask: 57.62, high: 57.72, low: 56.30, bid: 57.15 },
{ time: '2019-04-24', ask: 57.34, high: 57.57, low: 56.73, bid: 57.08 },
{ time: '2019-04-25', ask: 56.82, high: 56.90, low: 55.75, bid: 55.85 },
{ time: '2019-04-26', ask: 56.06, high: 56.81, low: 55.83, bid: 56.58 },
{ time: '2019-04-29', ask: 56.75, high: 57.17, low: 56.71, bid: 56.84 },
{ time: '2019-04-30', ask: 56.99, high: 57.45, low: 56.76, bid: 57.19 },
{ time: '2019-05-01', ask: 57.23, high: 57.30, low: 56.52, bid: 56.52 },
{ time: '2019-05-02', ask: 56.81, high: 58.23, low: 56.68, bid: 56.99 },
{ time: '2019-05-03', ask: 57.15, high: 57.36, low: 56.87, bid: 57.24 },
{ time: '2019-05-06', ask: 56.83, high: 57.09, low: 56.74, bid: 56.91 },
{ time: '2019-05-07', ask: 56.69, high: 56.81, low: 56.33, bid: 56.63 },
{ time: '2019-05-08', ask: 56.66, high: 56.70, low: 56.25, bid: 56.38 },
{ time: '2019-05-09', ask: 56.12, high: 56.56, low: 55.93, bid: 56.48 },
{ time: '2019-05-10', ask: 56.49, high: 57.04, low: 56.26, bid: 56.91 },
{ time: '2019-05-13', ask: 56.72, high: 57.34, low: 56.66, bid: 56.75 },
{ time: '2019-05-14', ask: 56.76, high: 57.19, low: 56.50, bid: 56.55 },
{ time: '2019-05-15', ask: 56.51, high: 56.84, low: 56.17, bid: 56.81 },
{ time: '2019-05-16', ask: 57.00, high: 57.80, low: 56.82, bid: 57.38 },
{ time: '2019-05-17', ask: 57.06, high: 58.48, low: 57.01, bid: 58.09 },
{ time: '2019-05-20', ask: 59.15, high: 60.54, low: 58.00, bid: 59.01 },
{ time: '2019-05-21', ask: 59.10, high: 59.63, low: 58.76, bid: 59.50 },
{ time: '2019-05-22', ask: 59.09, high: 59.37, low: 58.96, bid: 59.25 },
{ time: '2019-05-23', ask: 59.00, high: 59.27, low: 58.54, bid: 58.87 },
{ time: '2019-05-24', ask: 59.07, high: 59.36, low: 58.67, bid: 59.32 },
{ time: '2019-05-28', ask: 59.21, high: 59.66, low: 59.02, bid: 59.57 },
]