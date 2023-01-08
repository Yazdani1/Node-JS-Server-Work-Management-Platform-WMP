const FavouriteTPI = require("../model/favourite_tpi");

// to save favourite tpi id

exports.saveFavouriteTPI = async (req, res) => {
  try {
    const { tpi_id } = req.body;

    if (!tpi_id) {
      return res.status(422).json({ error: "Please select a tpi" });
    }

    const alreadySaved = await FavouriteTPI.findOne({ tpi_id });

    if (alreadySaved) {
      return res.status(422).json({ error: "This tpi already saved" });
    }
    const tpidetails = FavouriteTPI({ tpi_id });

    const savetpi = await FavouriteTPI.create(tpidetails);

    res.status(201).json(savetpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
// to get all favourite tpi

exports.getFavouriteTPI = async (req, res) => {
  try {
    const favourite_tpi = await FavouriteTPI.find().sort({ date: "DESC" }).populate("tpi_id","tpi_name wm_id slug")

    res.status(200).json(favourite_tpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};


// to get all favourite tpi


exports.deleteFavouriteTPI = async (req, res) => {
  try {
    const deletesingleid = { _id: req.params.id };

    const idisnotavailable = await FavouriteTPI.findOne(deletesingleid);

    if (!idisnotavailable) {
        return res.status(422).json({ error: "id could not found" });
      }
  
    const delete_favourite_tpi = await FavouriteTPI.findByIdAndDelete(
      deletesingleid
    );

    res.status(200).json(delete_favourite_tpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
