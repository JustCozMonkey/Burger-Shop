import { menuArray } from "/data.js"

let orderList = []

const getElements = (arr) => {
    let foodArr = arr.map((food) => {
        const { emoji, name, ingredients, id, price } = food
        return `<li class="food-list">
                    <p class="food-emoji">${emoji}</p>
                    <div class="food-description">
                        <p class="food-name">${name}</p>
                        <p class="food-ingredients">${ingredients}</p>
                        <p class="food-price">$${price}</p>
                    </div>
                    <button class="food-add-btn" data-food=${id}>+</button>
                </li>`
    }).join("")
    return `<ul id="food-list">${foodArr}</ul>`
}
document.addEventListener("click", (e) => {
    if (e.target.dataset.food === "0" || e.target.dataset.food === "1" || e.target.dataset.food === "2") {
        addOrder(e.target.dataset.food)
    }
    if (e.target.dataset.index) {
        removeOrder(e.target.dataset.index)
    }
    if (e.target.id === "close-payment") {
        closePayment()
    }
    console.log(e.target.id)
    if (e.target.id === "order-btn") {
        openPayment()
    }
    if (e.target.id === "card-btn") {
        endPayment()
    }
})
const addOrder = (id) => {
    const food = menuArray.filter(el => {
        return el.id == id
    })[0]
    orderList.push(food)
    document.querySelector(".finalMessage").classList.add("hidden")
    renderOrder()
}
const removeOrder = (id) => {
    console.log(id)
    orderList = orderList.filter((item, index) => {
        return index != id;
    });
    if (orderList.length === 0) {
        document.querySelector(".order").classList.add("hidden")
    }
    renderOrder()
}
const closePayment = () => {
    document.querySelector(".payment-box").classList.add("hidden")
}

const openPayment = () => {
    document.querySelector(".payment-box").classList.remove("hidden")

}
const endPayment = () => {
    document.querySelector(".payment-box").addEventListener("submit", (e) => {
        e.preventDefault()
        document.querySelector(".order").classList.add("hidden")
        orderList = []
        document.querySelector(".payment-box").classList.add("hidden")
        document.querySelector(".finalMessage").classList.remove("hidden")
        document.querySelector(".payment-box").classList.reset()
    })
}

const getOrder = (foodArr) => {
    let orders = foodArr.map((order, index) => {
        const { emoji, name, ingredients, id, price } = order
        return `<li class="food-order">
                   <p class="order-name">${name}</p> 
                   <p class="order-remove-btn" data-index=${index}>remove</p>
                   <p class="order-price">$${price}</p>
               </li>`
    }).join("")
    return `<ul id="food-list">${orders}</ul>`

}
const render = () => {
    document.getElementById("item-container").innerHTML += getElements(menuArray)
}
const renderOrder = () => {
    console.log(orderList.length)
    if (orderList.length > 0) {
        document.querySelector(".order").classList.remove("hidden")
    }
    document.getElementById("order-food").innerHTML = getOrder(orderList)
    document.getElementById("total-price").innerHTML = "$" + orderList.reduce((total, current) => {
        return total + current.price
    }, 0)
}

render()

