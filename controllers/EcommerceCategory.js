const slugify = require("slugify");
const EcommerceCategory = require("../model/EcommerceCategory");

// to create ecommercecategory

exports.createECategory = async (req, res) => {
  try {
    const { ecategoryname } = req.body;

    if (!ecategoryname) {
        return res.status(422).json({ error: "Please add category name" });
      }

    const slug = slugify(ecategoryname);
    const alreadyExist = await EcommerceCategory.findOne({ ecategoryname });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Category name already exist. try a new name" });
    }

    const categoryDetails = EcommerceCategory({ ecategoryname, slug });

    const categoryName = await EcommerceCategory.create(categoryDetails);

    res.status(201).json(categoryName);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all ecommercecategory


exports.getAllECommerceCategory = async (req, res) => {
  try {
    const allECommerceCategory = await EcommerceCategory.find().sort({
      date: "DESC",
    });
    res.status(200).json(allECommerceCategory);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
