const Tpi_Items = require("../model/Tpi_Items");

/**
 * To create tpi item
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.createTpiItem = async (req, res) => {
  try {
    const { tpi_item_info } = req.body;

    if (!tpi_item_info) {
      return res.status(422).json({ error: "Please add tpi_item_info" });
    }

    const tpi_Item_Details = Tpi_Items({
      tpi_item_info,
    });

    const saveTpiItems = await Tpi_Items.create(tpi_Item_Details);

    res.status(201).json(saveTpiItems);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To get all the tpi item list
 */

exports.getAllItemList = async (req, res) => {
  try {
    const allList = await Tpi_Items.find().sort({ date: -1 });

    res.status(200).json(allList);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
