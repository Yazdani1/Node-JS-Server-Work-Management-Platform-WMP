const slugify = require("slugify");
const ECommerceItem = require("../model/ECommerceItem");
const EcommerceCategory = require("../model/EcommerceCategory");

// to create ecommercecategory

exports.createECommerceItem = async (req, res) => {
  try {
    const { title, price, ecategoryid } = req.body;

    if (!title) {
      return res.status(422).json({ error: "Please add title" });
    }

    if (!price) {
      return res.status(422).json({ error: "Please add price" });
    }

    if (!ecategoryid) {
      return res.status(422).json({ error: "Please add ecategoryid" });
    }

    const slug = slugify(title);
    const alreadyExist = await ECommerceItem.findOne({ title });
    if (alreadyExist) {
      return res.status(422).json({
        error: "ECommerce product title is not available. Try a new one",
      });
    }

    const ecommerceItemDetails = ECommerceItem({
      title,
      price,
      ecategoryid,
      slug,
    });

    const ecommerceItem = await ECommerceItem.create(ecommerceItemDetails);

    res.status(201).json(ecommerceItem);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all ecommerce item

exports.getAllECommerceItem = async (req, res) => {
  try {
    const allecommerceitem = await ECommerceItem.find()
      .sort({ date: "DESC" })
      .populate("ecategoryid", "ecategoryname slug date _id");

    res.status(200).json(allecommerceitem);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

//search item by query

exports.searchECommerceItem = async (req, res) => {
  try {

    // const allEcommerceCategory = await EcommerceCategory.find().sort({date:"DESC"});

    const searchResult = await ECommerceItem.find({
    //   price: { $gte: req.query.min, $lte: req.query.max },
    ecategoryid: req.query.category.split(",")
    }).populate("ecategoryid", "ecategoryname slug date _id");

    res.status(200).json(searchResult);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
