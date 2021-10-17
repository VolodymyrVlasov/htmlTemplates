let checkedParams = {
    figure: "rounded",
    size: "50mm",
    material: "paper",
    cut: "sheet-A4"
}

const replaceSizes = (id) => {
    const sizesCards = document.getElementById("sizes-cards").children

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
    const roundSizes = document.getElementById("round_sizes").children
    const squaredSizes = document.getElementById("squared_sizes").children;

    [roundSizes, squaredSizes].forEach(sizes => {
        Object.values(sizes).forEach((labelNode, index) => {
            let input = labelNode.firstElementChild
            if (index < 3) {
                input.disabled = setDisable
            }
        })
    })
}

const toggleCutType = (onlyEachOne) => {
    const dieCut = document.getElementById("each_one")
    const cutAtA4 = document.getElementById("sheet-A4")
    const cutAtA3 = document.getElementById("sheet-A3")
    if (onlyEachOne) {
        dieCut.checked = true
        cutAtA4.disabled = true
        cutAtA3.disabled = true
    } else {
        cutAtA4.disabled = false
        cutAtA3.disabled = false
    }
}

const setDefaultChoice = (e) => {
    document.getElementById("50mm").checked = true
    document.getElementById("50x50").checked = true
    document.getElementById("A5ST").checked = true
    if (e?.target.id !== "each_one") {
        document.getElementById("sheet-A3").checked = true
    }
}

const setCheckedParams = (obj, key, value) => {
    if (obj != null) {
        checkedParams = {...checkedParams, ...obj}
    } else {
        checkedParams[key] = value
    }
    console.log(checkedParams)
}

const setStickerShape = (shapeId, sizesId, calcParams, isPetDisable, onlyEachOne) => {
    replaceSizes(sizesId)
    togglePet(isPetDisable)
    toggleCutType(onlyEachOne)
    setDefaultChoice()
    setCheckedParams(calcParams)
    if (!isPetDisable) {
        toggleSmallSizes(false)
    }
}

const setCutType = (e) => {
    if (e.target.id === "each_one") {
        toggleSmallSizes(true)
        setDefaultChoice(e)
        if (checkedParams.figure === "rounded") {
            setCheckedParams({"cut": e.target.id, "size": "50mm"})
        } else if (checkedParams.figure === "squared") {
            setCheckedParams({"cut": e.target.id, "size": "50x50"})
        }
    } else {
        toggleSmallSizes(false)
    }
}

document.addEventListener("click", (e => {
    const id = e?.target.id
    switch (id) {
        case "rounded":
            setStickerShape(id, "round_sizes", {"figure": id, "size": "50mm", "cut": "sheet-A3"})
            break
        case "squared":
            setStickerShape(id, "squared_sizes", {"figure": id, "size": "50x50", "cut": "sheet-A3"})
            break
        case "stickerset":
            setStickerShape(id, "stickerset_sizes", {"figure": id, "size": "A5ST", "cut": "each_one"},
                true, true)
            break
        case "each_one":
            setCutType(e)
            break
        case "sheet-A4":
            setCutType(e)
            break
        case "sheet-A3":
            setCutType(e)
            break
    }
    calculatePrice()
}));

document.getElementById("sizes-cards").addEventListener("click", (e) => {
    const target = e.target
    if (!target.classList.contains("label") && target.id !== "sizes-cards" &&
        target.id !== "round_sizes" && target.id !== "squared_sizes" && target.id !== "stickerset_sizes") {
        setCheckedParams(null, "size", target.id)
    }
})

document.getElementById("materials").addEventListener("click", (e) => {
    const target = e.target
    if (target.nodeName !== "P" && !target.classList.contains("label")) {
        setCheckedParams(null, "material", target.id)
    }
})

const calculatePrice = () => {

}