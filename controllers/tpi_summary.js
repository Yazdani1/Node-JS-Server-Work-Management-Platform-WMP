const slugify = require("slugify");
const TPI = require("../model/tpi");
const TPI_Summary = require("../model/tpi_summary");

// to create tpi summary

exports.createTpiSummary = async (req, res) => {
  try {
    const { tpi_summary, tpi_id } = req.body;

    if (!tpi_summary) {
      return res.status(422).json({ error: "Please add tpi summary" });
    }

    if (!tpi_id) {
      return res.status(422).json({ error: "Please add tpi id" });
    }

    const slug = slugify(tpi_summary);

    const tpi_summary_details = TPI_Summary({ tpi_summary, tpi_id, slug });
    const savetpi_summary = await TPI_Summary.create(tpi_summary_details);

    res.status(201).json(savetpi_summary);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get single tpi info

exports.getSingleTPI = async (req, res) => {
  try {
    const singleTPIID = { slug: req.params.slug };

    const single_tpi = await TPI.findOne(singleTPIID);

    res.status(200).json(single_tpi);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to load all tpi summary based on a single tpi

exports.getAllTpiSummary = async (req, res) => {
  try {
    const singleTPIID = { slug: req.params.slug };
    const single_tpi = await TPI.findOne(singleTPIID);

    if(!single_tpi) return res.status(422).json({error:"TPI Could not found"})

    // to get all the tpi summary length
    const tpi_summary_length = await TPI_Summary.find({ tpi_id: single_tpi._id }).sort(
      { date: "DESC" }
    );

    // to get all tpi summary based on a single tpi and with limit query
    const tpi_summary = await TPI_Summary.find({ tpi_id: single_tpi._id }).sort(
      { date: "DESC" }
    ).limit(req.query.limit);

    // this req.query.limit will help to add load more pagination

    res.status(200).json({tpi_summary,tpi_summary_length});
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to delte tpi summary

exports.deleteTpiSummary = async (req, res) => {
  try {

    const singleTpiSummary = { _id: req.params.id};

    const tpi_summary = await TPI_Summary.findOne(singleTpiSummary);
    if (!tpi_summary) return res.status(404).json({ error: "TPI Summary id could not found" });


    const delte_tpi_summary = await TPI_Summary.findByIdAndDelete(singleTpiSummary);


    res.status(200).json({message:"TPI Summary deleted successfully",delte_tpi_summary});


  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
