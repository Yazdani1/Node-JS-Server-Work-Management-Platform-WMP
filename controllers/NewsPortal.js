const uuid = require("uuid");
const NewsPortal = require("../model/NewsPortal");


/**
 * To create news portal news
 * @param {*} req
 * @param {*} res
 * @returns
 */


exports.createNewsForPortal = async (req, res) => {
  try {

    const { title, des } = req.body;
    if (!title) {
      return res.status(422).json({ error: "Please add title" });
    }
    if (!des) {
      return res.status(422).json({ error: "Please add des" });
    }
    const newsPortalDetails = NewsPortal({
      title,
      des,
      slug: uuid.v4(),
    });
    const saveNewsPortalNews = await NewsPortal.create(newsPortalDetails);
    res.status(201).json(saveNewsPortalNews);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To get news portal all the news
 */

exports.getAllNewsPortalNews = async (req, res) => {
  try {
    const allNewsPortalNews = await NewsPortal.find().sort({ date: -1 });

    res.status(200).json(allNewsPortalNews);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To get a single news details
 */

exports.getSingleNews = async (req, res) => {
  try {
    const singlePostQuery = { slug: req.params.slug };

    const singleNewsPostDetails = await NewsPortal.findOne(singlePostQuery);

    res.status(200).json(singleNewsPostDetails);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
