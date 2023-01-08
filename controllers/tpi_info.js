const slugify = require("slugify");
const TPI_INFO = require("../model/tpi_info");
const TPI = require("../model/tpi");

exports.createTPIInfo = async (req, res) => {
  try {
    const { message, issues, responsible, tpi_id } = req.body;

    if (!message) {
      return res.status(422).json({ error: "Please add message" });
    }

    if (!issues) {
      return res.status(422).json({ error: "Please add issues" });
    }

    if (!responsible) {
      return res.status(422).json({ error: "Please add responsible" });
    }
    if (!tpi_id) {
      return res.status(422).json({ error: "Please add responsible" });
    }

    const slug = slugify(message);
    const alreadyExist = await TPI_INFO.findOne({ message });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Title already exist. try a new message" });
    }

    const tpi_info_details = TPI_INFO({
      message,
      issues,
      responsible,
      tpi_id,
      slug,
    });

    const save_tpi_info = await TPI_INFO.create(tpi_info_details);

    res.status(201).json(save_tpi_info);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all tpi info

exports.getAllTPIInfo = async (req, res) => {
  try {
    const singleTPIID = { slug: req.params.slug };
    const single_tpi = await TPI.findOne(singleTPIID);

    if (!single_tpi)
      return res.status(422).json({ error: "TPI Could not found" });

    const tpiinfo = await TPI_INFO.find({ tpi_id: single_tpi._id }).sort({
      date: "DESC",
    });

    res.status(200).json(tpiinfo);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to update tpi info

exports.updateTPIinfo = async (req, res) => {
  try {
    const singleTpiInfoID = { _id: req.params.id };
    const { message, issues, responsible } = req.body;

    const payload = { message, issues, responsible, updatedAt: new Date()};

    const updateTPIInfo = await TPI_INFO.findByIdAndUpdate(singleTpiInfoID, {
      $set: payload,
    });

    res.status(200).json(updateTPIInfo);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to delete tpi info

exports.deleteTPIInfo = async (req, res) => {
  try {
    const tpi_info_id = { _id: req.params.id };
    const tpi_info = await TPI_INFO.findOne(tpi_info_id);
    if (!tpi_info)
      return res.status(404).json({ error: "TPI Info id could not found" });
    const tpiInfoDetails = await TPI_INFO.findByIdAndDelete(tpi_info_id);
    res.status(200).json({ message: "TPI Info Deleted", tpiInfoDetails });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
