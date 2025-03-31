const productList = document.getElementById('product-list');
const fetchButton = document.getElementById('fetch-products');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

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

    if (!searchQuery) return;

    fetch(`/api/v1/products?search=${searchQuery}`)
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
