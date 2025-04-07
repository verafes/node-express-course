const express = require('express');
const app = express();
const PORT = 3000;
const { products, people } = require('./data');
const peopleRouter = require('./routes/people');


const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleString();
    console.log(`[${time}] ${method} ${url}`);
    next();
};

app.use(logger);
app.use(express.static('./methods-public'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/api/v1/people', peopleRouter);

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
    res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
    // const idToFind = Number(req.params.productID);
    const idToFind = parseInt(req.params.productID, 10);
    const product = products.find((p) => p.id === idToFind);
    if (!product) {
        return res.status(404).send("Product does not exist");
    }
    return res.json(product);
});

app.get("/api/v1/query", (req, res, err) => {
    try {
        let response = [...products];
        let {search, limit, priceGreaterThan, priceLessThan} = req.query;
        limit = Number(limit)
        if (isNaN(limit) || limit < 0) limit = 0;

        if (search) {
            const searchNumber = Number(search.trim());

            response = response.filter((item) => {
                if (!isNaN(searchNumber)) {
                    // match exact price or close prices for searching numbers
                    if (item.price === searchNumber || Math.abs(item.price - searchNumber) <= 1) {
                        return true;
                    }
                } else {
                    // match full or partial product names for searching text
                    const regex = new RegExp(search.toLowerCase().split('').join('.*'), 'i');
                    if (item.name.toLowerCase().includes(search.toLowerCase()) || regex.test(item.name)) {
                        return true;
                    }
                }
                return false;
            });
        }

        if (limit) {
            response = response.slice(0, Number(limit));
        }
        if (priceGreaterThan) {
            response = response.filter((p) => p.price > Number(priceGreaterThan));
        }
        if (priceLessThan) {
            response = response.filter((p) => p.price < Number(priceLessThan));
        }

        if (response.length < 1) {
            return res.status(200).json({ message: "No products matched your search." });
        }

        res.status(200).json(response);
    }
    catch (err) {
        return res.status(500).json({ message: "Server error." });
    }
});


app.all("*", (req, res) => {
    res.status(404).send("Oops! Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
