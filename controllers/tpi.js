const slugify = require("slugify");
const TPI = require("../model/tpi");
const WorkManagement = require("../model/work_management");

exports.createTPI = async (req, res) => {
  try {
    const { tpi_name, wm_id } = req.body;
    if (!tpi_name) {
      return res.status(422).json({ error: "Please add tpi name" });
    }

    if (!wm_id) {
      return res.status(422).json({ error: "Please add wm id" });
    }

    const slug = slugify(tpi_name);
    const alreadyExist = await TPI.findOne({ tpi_name });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Title already exist. try a new title" });
    }
    const tpi_details = TPI({ tpi_name, wm_id, slug });
    const savetpi = await TPI.create(tpi_details);
    res.status(201).json(savetpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get tpi based on single wm

exports.getTPI = async (req, res) => {
  try {
    const singleWMId = { slug: req.params.slug };
    const wm_post = await WorkManagement.findOne(singleWMId);
    if (!wm_post)
      return res.status(404).json({ error: "WM ID could not found" });
    const tpi = await TPI.find({ wm_id: wm_post._id }).sort({ date: "desc" });
    res.status(200).json(tpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// test

// to get all tpi list for all the wm

exports.getAllTPIList = async (req, res) => {
  try {
    const alltpi = await TPI.find().sort({ date: -1 });

    res.status(200).json(alltpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

//test to do aggreation match and group test and get list of tpi for each wm..

exports.getTpiListUsingAggregation = async (req, res) => {
  try {
    const singlewmID = { slug: req.params.slug };

    const singleWmDetails = await WorkManagement.findOne(singlewmID);

    const tpi = await TPI.aggregate([

      // match is used to get all the TPI based on each WM ID
      { $match: {wm_id:singleWmDetails._id.toString()} },
      { $project: { __v:0} },
      { $group: { _id: "$slug", postcount: { $sum: 1 } } },

    ]);

    // const alltpi = await TPI.find({wm_id:singleWmDetails._id}).sort({ date: -1 });

    res.status(200).json({tpi,singleWmDetails});
    console.log(singleWmDetails._id.toString());
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to delete tpi

exports.deleteTPI = async (req, res) => {
  try {
    const delete_tpi_Id = { _id: req.params.id };
    const tpi = await TPI.findOne(delete_tpi_Id);
    if (!tpi) return res.status(404).json({ error: "TPI id could not found" });
    const deleteTPI = await TPI.findByIdAndDelete(delete_tpi_Id);
    res.status(200).json({ deleteTPI, Message: "TPI Deleted" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
