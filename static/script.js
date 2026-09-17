async function tes() {
    const response = await fetch('/item')
    const data = await response.json()

    const search = document.getElementById('search')
    const brand = document.getElementById('brand')
    const category = document.getElementById('category')
    const container = document.getElementById('tes')

    const brands = [...new Set(data.map(i => i.brand))]
    const categories = [...new Set(data.map(i => i.category))]

    brands.sort().forEach(i => {
        const option = document.createElement('option')
        option.value = i
        option.textContent = i
        brand.appendChild(option)
    })

    categories.sort().forEach(i => {
        const option = document.createElement('option')
        option.value = i
        option.textContent = i
        category.appendChild(option)
    })

    function display() {
        const text = search.value.toLowerCase()
        const selectedBrand = brand.value
        const selectedCategory = category.value

        const filtered = data.filter(i =>
            i.title.toLowerCase().includes(text) &&
            (selectedBrand === '' || i.brand === selectedBrand) &&
            (selectedCategory === '' || i.category === selectedCategory)
        )

        container.innerHTML = ''

        filtered.forEach(i => {
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

    search.addEventListener('input', display)
    brand.addEventListener('change', display)
    category.addEventListener('change', display)

    display()
}

tes()