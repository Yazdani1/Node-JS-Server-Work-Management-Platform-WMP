const slugify = require("slugify");
const Product = require("../model/Product");


/**
 * To create new project
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createProduct = async (req, res) => {
  try {
    const { title, price, city, doors, brands, color, deliverytype, featured } =
      req.body;

    if (!title) {
      return res.status(422).json({ error: "Please add title" });
    }
    if (!price) {
      return res.status(422).json({ error: "Please add price" });
    }
    if (!city) {
      return res.status(422).json({ error: "Please add city" });
    }
    if (!doors) {
      return res.status(422).json({ error: "Please add doors" });
    }
    if (!brands) {
      return res.status(422).json({ error: "Please add brands" });
    }
    if (!color) {
      return res.status(422).json({ error: "Please add color" });
    }
    if (!deliverytype) {
      return res.status(422).json({ error: "Please add deliverytype" });
    }

    const slug = slugify(title);
    const alreadyExist = await Product.findOne({ title });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Title already exist. try a new title" });
    }

    const product_Details = Product({
      title,
      price,
      city,
      doors,
      brands,
      color,
      deliverytype,
      featured,
      slug,
    });

    const saveproduct = await Product.create(product_Details);

    res.status(201).json(saveproduct);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get all the products list
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllProducts = async (req, res) => {
  try {
    const allproducts = await Product.find().sort({ date: "DESC" });

    res.status(200).json(allproducts);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To get features products list
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllFeaturedProducts = async (req, res) => {
  try {
    const featuredproducts = await Product.find({ featured: true }).sort({
      date: "DESC",
    });

    res.status(200).json(featuredproducts);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// to search product by using query.
// query is used to search product from database.
/**
 * To add search query and find out the product based on the search query
 * @param {*} req 
 * @param {*} res 
 */
exports.getFilteredProducts = async (req, res) => {
  const { min, max } = req.query;
  try {
    const products = await Product.find({
      //   featured: req.query.featuredproduct.split(","),
      featured: req.query.featuredproduct,
      price: { $gte: min | 1, $lte: max || 99999 },
      color: req.query.color.split(","),
      // color: req.query.color || "Red",
    })
      .limit(req.query.limit)
      .sort({ date: "DESC" });
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to perform agregation, match group and get product info

exports.getProductPriceCount = async (req, res) => {
  try {
    const productResult = await Product.aggregate([
      // { $match: { color: "Red"}},
      // project is used to return some predefined fileds. for example color, brands and price will be return but other fields wont return.
      { $project: { _id: 1, color: 1, brands: true, price: 1 } },
      // { $match: { price: { $gt: 5, $lt: 1200}}},

      // to sum all the price from a group of category,.for example all the price from BMW group
      // { $group: { _id: "$brands", total: { $sum: "$price" } } },

      // this group is to count number of post in one category. brands is a category for each post and it will count how many posts are there in the same category
      // { $group: { _id: "$brands", carcount: { $sum: 1 } } },

      // this group is to group brand and color and count number of posts
      //   { "$group": {
      //     "_id": {
      //         "brand": "$brands",
      //         "color": "$color"
      //     },
      //     "carCount": { "$sum": 1 }
      // }},

      // { "$group": {
      //     "_id": "$_id.brand",
      //     "Cars": {
      //         "$push": {
      //             "color": "$_id.color",
      //             "count": "$carCount"
      //         },
      //     },
      //     "count": { "$sum": "$carCount" }
      // }},

      //test and example from stackoverflow
      //   { "$group": {
      //     "_id": {
      //         "addr": "$brands",
      //         "book": "$color"
      //     },
      //     "bookCount": { "$sum": 1 }
      // }},
      // { "$group": {
      //     "_id": "$_id.addr",
      //     "books": {
      //         "$push": {
      //             "book": "$_id.book",
      //             "count": "$bookCount"
      //         },
      //     },
      //     "count": { "$sum": "$bookCount" }
      // }},

      //   { "$group": {
      //     "_id": {
      //         "Brand": "$brands",
      //         "Color": "$color"
      //     },
      //     "count": { "$sum": 1 }
      // }},
    ]);

    res.status(200).json(productResult);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To delete a single product
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteProduct = async (req, res) => {
  try {
    const delete_product_Id = { _id: req.params.id };
    const singleProduct = await Product.findOne(delete_product_Id);
    if (!singleProduct)
      return res.status(404).json({ error: "Product id could not found" });

    const deleteProduct = await Product.findByIdAndDelete(delete_product_Id);
    res.status(200).json({ deleteProduct, Message: "Product Deleted" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
