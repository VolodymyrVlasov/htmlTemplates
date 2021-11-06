const calcRequest = {
    width: 40,
    height: 60,
    amount: 1,
    material: "RitramaMatte",
    quality: "1440p",
    price: 210
}

const accordion = (elem) => {
    document.addEventListener('click', (e) => {
        const target = e.target
        if (!target.matches(elem + ' .a-btn')) return
        else {
            if (!target.parentElement.classList.contains('active')) {
                let elementList = document.querySelectorAll(elem + ' .a-container')
                elementList.forEach((e) => {
                    e.classList.remove('active')
                });
                target.parentElement.classList.add('active')
            } else {
                target.parentElement.classList.remove('active')
            }
        }
    }, {passive: true})
}

accordion('.accordion')

const map = (x, in_min, in_max, out_min, out_max) => {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const customRange = (id, thumbSize) => {
    const inputCnt = document.getElementById(id)
    let inputNode = inputCnt.lastElementChild
    const labelNode = inputCnt.firstElementChild
    const thumbHalfSize = thumbSize * 0.5
    const from = Number(inputNode.min)
    const to = Number(inputNode.max)
    const inputWidth = Math.floor(inputNode.offsetWidth)

    const changeRangeUI = () => {
        const value = Number(inputCnt.lastElementChild.value)
        const labelCenterX = labelNode.offsetWidth * 0.5
        labelNode.innerHTML = String(value)
        let gradientPosition = map(value, from, to, 0, 100)
        let labelPosition = map(value, from, to, 0, inputWidth)
        labelPosition = (value > to * 0.5) ?
            labelPosition - map(value, to * 0.5, to, labelCenterX, thumbSize + 1)
            :
            labelPosition - map(value, from, to * 0.5, labelCenterX - thumbHalfSize, labelCenterX)
        inputNode.style.background = `linear-gradient(90deg, var(--color-theme) ${gradientPosition}%, var(--color-light-gray) ${gradientPosition}%)`
        labelNode.style.transform = `translateX(${labelPosition}px)`
    }

    inputCnt.addEventListener("input", () => changeRangeUI())
}

const price = {
    RitramaMatte: {
        "720p": [210, 190, 160],
        "1440p": [260, 210, 190]
    },
    RitramaGlossy: {
        "720p": [210, 190, 160],
        "1440p": [260, 210, 190]
    },
    RitramaBlackout: {
        "720p": [210, 190, 160],
        "1440p": [260, 210, 190]
    },
    RitramaTransparent: {
        "720p": [210, 190, 160],
        "1440p": [260, 210, 190]
    }
}

const calculatePrice = () => {
    const outNode = document.getElementById("price")
    let sq = (calcRequest.width * calcRequest.height) / 10000
    console.table(price[calcRequest["material"]][[calcRequest["quality"]]][0], sq)
    calcRequest.price = sq * price[calcRequest["material"]][[calcRequest["quality"]]][0]
    outNode.innerText = calcRequest.price
}

const calculateTime = () => {
    console.log()
}

document.getElementById("calculator").addEventListener("change", (e) => {
    const target = e.target

    switch (target.id) {
        case "input_range-height":
            calcRequest.height = Number(target.value)
            break
        case "input_range-width":
            calcRequest.width = Number(target.value)
            break
        case "amount":
            calcRequest.amount = Number(target.value)
            break
        case "material":
            calcRequest.material = target.value
            break
        case "quality":
            calcRequest.quality = target.value
            break
    }
    calculatePrice()
    calculateTime()
})

customRange("input-height", 32)
customRange("input-width", 32)


