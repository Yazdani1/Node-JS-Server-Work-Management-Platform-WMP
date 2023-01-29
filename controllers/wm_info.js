const WMInfo = require("../model/wm_info");
const WorkManagement = require("../model/work_management");

// to create am info

exports.createWMInfo = async (req, res) => {
  try {
    const { wminfo, status, wm_id } = req.body;

    if (!wminfo) {
      return res.status(422).json({ error: "Please add wm info" });
    }
    if (!status) {
      return res.status(422).json({ error: "Please add wm info status" });
    }

    if (!wm_id) {
      return res.status(422).json({ error: "Please add wm id" });
    }

    const wm_info_details = WMInfo({ wminfo, status, wm_id });

    const save_wm_info = await WMInfo.create(wm_info_details);

    console.log(save_wm_info);

    res.status(201).json(save_wm_info);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
    console.log(error);
  }
};
// to get wm info based on the single wm
exports.getWmInfo = async (req, res) => {
  try {
    const singleWMId = { slug: req.params.slug };
    const single_wm = await WorkManagement.findOne(singleWMId);
    if (!single_wm)
      return res.status(404).json({ error: "WM ID could not found" });
    const allWmInfo = await WMInfo.find({ wm_id: single_wm._id }).sort({
      date: "DESC",
    });
    res.status(200).json(allWmInfo);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to update wm info

exports.updateWmInfo = async (req, res) => {
  try {
    const singleWMInfoID = { _id: req.params.id };
    const { wminfo, status } = req.body;
    const payload = { wminfo, status };
    const updatewmInfo = await WMInfo.findByIdAndUpdate(singleWMInfoID, {
      $set: payload,
    });
    res.status(200).json(updatewmInfo);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to delete wm info

exports.deleteWMInfo = async (req, res) => {
  try {
    const singleWMInfoID = { _id: req.params.id };
    const checkIfIdExits = await WMInfo.findOne(singleWMInfoID);
    if (!checkIfIdExits) {
      return res.status(404).json({ error: "WM Info id could not found" });
    }
    const deletewminfo = await WMInfo.findByIdAndDelete(singleWMInfoID);
    res
      .status(200)
      .json({ deletewminfo, message: "WM Info Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
