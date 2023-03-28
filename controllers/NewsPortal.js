const uuid = require('uuid');
const NewsPortal = require("../model/NewsPortal");

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
      slug:uuid.v4()
    });

    const saveNewsPortalNews = await NewsPortal.create(newsPortalDetails);

    res.status(201).json(saveNewsPortalNews);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
