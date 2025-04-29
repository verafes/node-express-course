const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // const products = await Product.find({ featured: true });

    // const products = await Product.find({ name: 'albany' })

    // const products = await Product.find({ company: { $eq: 'ikea' } })
    //     .select(['name', 'price']);
    //
    // const products = await Product.find({ price: { $gte: 50 } })
    //   .sort('price')
    //   .select(['name', 'rating', 'company'])


    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true';
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };

            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            const options = ['price', 'rating'];

            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            );

            filters = filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            });
            console.log(queryObject);
    }

    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};