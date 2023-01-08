const slugify = require("slugify");
const WorkManagement = require("../model/work_management");
const TPI = require("../model/tpi");

exports.createWorkManagement = async (req, res) => {
  try {
    const { wm_name } = req.body;
    const slug = slugify(wm_name);
    const alreadyExist = await WorkManagement.findOne({ wm_name });
    if (alreadyExist) {
      return res
        .status(422)
        .json({ error: "Title already exist. try a new title" });
    }

    if (!wm_name) {
      return res.status(422).json({ error: "Please Add WM  Name" });
    }

    const wm_details = WorkManagement({ wm_name, slug });

    const saveworkMangement = await WorkManagement.create(wm_details);

    res.status(201).json(saveworkMangement);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get single wm details info

exports.getSingleWMDetails = async (req, res) => {
  try {
    const singlewmID = { slug: req.params.slug };

    const singleWmDetails = await WorkManagement.findOne(singlewmID);

    res.status(200).json(singleWmDetails);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all work management

exports.getAllWorkManagement = async (req, res) => {
  try {
    const allWorkManagementPosts = await WorkManagement.find().sort({
      date: "DESC",
    });

    res.status(200).json(allWorkManagementPosts);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to delete work managment project

exports.deleteWorkManagement = async (req, res) => {
  try {
    const deleteId = { _id: req.params.id };
    const workmanagement = await WorkManagement.findOne(deleteId);
    if (!workmanagement)
      return res
        .status(404)
        .json({ error: "Work Management ID could not found" });

    // to delete all the tpi based on the same wm if user delete one wm.

    const deletealltpifromwm = await TPI.find({ wm_id: deleteId });
    const tpiidlist = deletealltpifromwm.map((r) => r._id);
    const tpi_delete_result = await TPI.deleteMany({ _id: { $in: tpiidlist } });

    // to delete single wm
    const delteWorkManagement = await WorkManagement.findByIdAndDelete(
      deleteId
    );

    res.status(200).json({ delteWorkManagement, Message: "WM Deleted" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};


