async function loadProduct() {
    const id = window.location.pathname.split('/').pop()

    const response = await fetch(`/api/product/${id}`)
    const data = await response.json()

    const product = data[0]

    document.getElementById('image').src = product.image_url
    document.getElementById('title').textContent = product.title
    document.getElementById('brand').textContent = product.brand
    document.getElementById('category').textContent = product.category
    document.getElementById('price').textContent = `$${product.price}`
    document.getElementById('rating').textContent = `Rating: ${product.rating}`
    document.getElementById('description').textContent = product.description
}

async function loadRecommendation() {
    const id = window.location.pathname.split('/').pop()

    const response = await fetch(`/api/rec/${id}`)
    const data = await response.json()

    const container = document.getElementById('recommendation')

    data.forEach(i => {
        const card = document.createElement('div')
        card.className = 'prod'

        card.innerHTML = `
            <img src="${i.image_url}" alt="${i.title}">
            <h2>${i.title}</h2>
            <p>$${i.price}</p>
        `

        card.onclick = () => {
            window.location.href = `/product/${i.product_id}`
        }

        container.appendChild(card)
    })
}

loadProduct()
loadRecommendation()
