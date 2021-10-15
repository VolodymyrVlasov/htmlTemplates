const rounded = document.getElementById("rounded")
const squared = document.getElementById("squared")
const stickerset = document.getElementById("stickerset")

const roundSizes = document.getElementById("round_sizes").children
const squaredSizes = document.getElementById("squared_sizes").children
const stickerSetsSizes = document.getElementById("stickerset_sizes").children

const materials = document.getElementById("materials").children

const dieCut = document.getElementById("each_one")
const cutAtA4 = document.getElementById("sheet-A4")
const cutAtA3 = document.getElementById("sheet-A3")
const sizesCards = document.getElementById("sizes-cards").children

let checkedParams = {
    figure: "rounded",
    size: "50mm",
    material: "paper",
    cut: "sheet-A4"
}

const replaceSizes = (id) => {
    Object.values(sizesCards).forEach(cardNode => {
        if (cardNode.nodeName !== "P") {
            if (cardNode.id === id) {
                cardNode.classList.replace("sizes", "sizes-active")
            } else {
                cardNode.classList.replace("sizes-active", "sizes")
            }
        }
    })
}

const togglePet = (setDisable) => {
    if (setDisable) {
        document.getElementById("pet").disabled = true
        document.getElementById("paper").checked = true
    } else {
        document.getElementById("pet").disabled = false
    }
}

const toggleSmallSizes = (setDisable) => {
    [roundSizes, squaredSizes].forEach(sizes => {
        Object.values(sizes).forEach((labelNode, index) => {
            let input = labelNode.firstElementChild
            if (index < 3) {
                console.log(input.id)
                input.disabled = setDisable
            }
        })
    })
}

const toggleCutType = (onlyEachOne) => {
    if (onlyEachOne) {
        dieCut.checked = true
        cutAtA4.disabled = true
        cutAtA3.disabled = true
    } else {
        cutAtA4.disabled = false
        cutAtA3.disabled = false
    }
}

const setDefaultSize = () => {
    document.getElementById("50mm").checked = true
    document.getElementById("50x50").checked = true
    document.getElementById("A5ST").checked = true
}

const setCheckedParams = (obj, key, value) => {
    if (obj != null) {
        checkedParams = {...checkedParams, ...obj}
    } else {
        checkedParams[key] = value
    }
    console.log(checkedParams)
}
const calculatePrice = () => {

}

rounded.addEventListener("click", (e) => {
    replaceSizes("round_sizes")
    togglePet()
    toggleCutType()
    calculatePrice()
    setDefaultSize()
    setCheckedParams({
        "figure": e.target.id,
        "size": "50mm",
    })
})
squared.addEventListener("click", (e) => {
    replaceSizes("squared_sizes")
    togglePet()
    toggleCutType()
    calculatePrice()
    setDefaultSize()
    setCheckedParams({
        "figure": e.target.id,
        "size": "50x50",
    })
})
stickerset.addEventListener("click", (e) => {
    replaceSizes("stickerset_sizes")
    togglePet(true)
    toggleCutType(true)
    calculatePrice()
    setDefaultSize()
    setCheckedParams({
        "figure": e.target.id,
        "size": "A5ST",
        "cut": "each_one"
    })
})

dieCut.addEventListener("click", (e) => {
    toggleSmallSizes(true)
    calculatePrice()
    setCheckedParams(null, "cut", e.target.id)
    setDefaultSize()
})
cutAtA4.addEventListener("click", (e) => {
    toggleSmallSizes(false)
    calculatePrice()
    setCheckedParams(null, "cut", e.target.id)
})

cutAtA3.addEventListener("click", (e) => {
    toggleSmallSizes(false)
    calculatePrice()
    setCheckedParams(null, "cut", e.target.id)
});


[roundSizes, squaredSizes, stickerSetsSizes].forEach(sizes => {
    Object.values(sizes).forEach(node => {
        node.firstElementChild
            .addEventListener("click", (e) => setCheckedParams(null, "size", e.target.id))
    })
})

Object.values(materials).forEach(node => {
    if (node.nodeName !== "P") {
        node.firstElementChild
            .addEventListener("click", (e) => setCheckedParams(null, "material", e.target.id)
            )
    }
})

