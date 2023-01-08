const WM_Target = require("../model/wm_target");
const WorkManagement = require("../model/work_management");

exports.createWMTarget = async (req, res) => {
  try {
    const { target, status, wm_id } = req.body;

    if (!target) {
      return res.status(422).json({ error: "Please add wm target" });
    }

    if (!wm_id) {
      return res.status(422).json({ error: "Please add wm id" });
    }

    const wmtarget = WM_Target({ target, status, wm_id });

    const save_wm_target = await WM_Target.create(wmtarget);

    res.status(201).json(save_wm_target);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get wm target based on single wm

exports.getAllWMTargets = async (req, res) => {
  try {
    const singleWMId = { slug: req.params.slug };

    const single_wm = await WorkManagement.findOne(singleWMId);

    if (!single_wm)
      return res.status(404).json({ error: "WM ID could not found" });

    // sort value: -1 means Desending order data will show
    // sort value: 1 means Assending order data will show

    const wmtargets = await WM_Target.find({ wm_id: single_wm._id }).sort({
      // status: -1,
      status:-1,
      date: -1,
    });

    // const wmtargets = await WM_Target.find({wm_id:single_wm._id}).sort({status: req.query.status,date:req.query.date,});

    res.status(200).json(wmtargets);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// update wm targets

exports.updateWMTarget = async (req, res) => {
  try {
    const targetID = { _id: req.params.id };

    const { target, status } = req.body;

    const payload = { target, status, date: new Date() };

    const single_wm_targets = await WM_Target.findByIdAndUpdate(targetID, {
      $set: payload,
    });

    res.status(200).json(single_wm_targets);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// delete wm targets

exports.deleteWMTargets = async (req, res) => {
  try {
    const singleWMTargetID = { _id: req.params.id };

    const wm_target = await WM_Target.findOne(singleWMTargetID);
    if (!wm_target)
      return res.status(404).json({ error: "WM Target id could not found" });

    const delete_wm_target = await WM_Target.findByIdAndDelete(
      singleWMTargetID
    );

    res
      .status(200)
      .json({ message: "WM Target Deleted Successfully", delete_wm_target });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
