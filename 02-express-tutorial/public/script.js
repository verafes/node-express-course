const productList = document.getElementById('product-list');
const fetchButton = document.getElementById('fetch-products');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const priceGreaterThanInput = document.getElementById('price-greater-than');
const priceLessThanInput = document.getElementById('price-less-than');
const limitInput = document.getElementById('limit');

fetchButton.addEventListener("click", async () => {
    try {
        fetch('/api/v1/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(displayProducts);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.toLowerCase();
    const priceGreaterThan = priceGreaterThanInput.value;
    const priceLessThan = priceLessThanInput.value;
    const limit = limitInput.value;

    let url = `/api/v1/query?`;

    if (searchQuery) {
        url += `&search=${searchQuery}`;
    }
    if (priceGreaterThan) {
        url += `&priceGreaterThan=${priceGreaterThan}`;
    }
    if (priceLessThan) {
        url += `&priceLessThan=${priceLessThan}`;
    }
    if (limit) {
        url += `&limit=${limit}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(displayProducts)
        .catch(error => console.error('Search error:', error));
});

function displayProducts(data) {
    if (!data || !Array.isArray(data)) {
        productList.innerHTML = `<p>No products found</p>`;
        return;
    }

    productList.innerHTML = '';

    data.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: $${product.price}</p>
            <p>${product.desc}</p>
        `;
        productList.appendChild(productItem);
    });
}
