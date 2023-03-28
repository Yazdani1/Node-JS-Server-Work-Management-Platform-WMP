const Tpi_Items = require("../model/Tpi_Items");

/**
 * To create tpi item
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.createTpiItem = async (req, res) => {
  try {
    const { tpi_item_info, tpi_Item_Name } = req.body;

    if (!tpi_item_info) {
      return res.status(422).json({ error: "Please add tpi_item_info" });
    }
    if (!tpi_Item_Name) {
      return res.status(422).json({ error: "Please add tpi_Item_Name" });
    }

    const tpi_Item_Details = Tpi_Items({
      tpi_item_info,
      tpi_Item_Name,
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

/**
 * To delete all the tpi items
 */

exports.deleteAllTPIItems = async (req, res) => {
  try {
    const deleteAllItems = await Tpi_Items.deleteMany({});

    res.status(200).json(deleteAllItems);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To delete a single tpi array item
 */

exports.deleteSingleItem = async (req, res) => {
    try {
      const itemId = req.params.id;
      const deleteQuery = { "tpi_item_info._id": itemId };
      const deleteUpdate = { $pull: { tpi_item_info: { _id: itemId } } };
  
      const result = await Tpi_Items.updateOne(deleteQuery, deleteUpdate);
  
      if (result.nModified === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
  
  