const PhotoLibrary = require("../model/PhotoLibrary");

// to create photo library

exports.ceratePhotoLibrary = async (req, res) => {
  const { imageUrl } = req.body;
  try {
    if (!imageUrl) {
      return res.status(422).json({ error: "Please add image url" });
    }
    const libraryDetails = PhotoLibrary({ imageUrl });
    const savePhoto = await PhotoLibrary.create(libraryDetails);
    res.status(201).json(savePhoto);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all the photo for library

/**
 * To get all the list of photo libary
 * @param {*} req 
 * @param {*} res 
 */

exports.getAllPhoto = async (req, res) => {
  try {
    const allPhotos = await PhotoLibrary.find().sort({ date: -1 });

    res.status(200).json(allPhotos);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

//////////////////////////////////////////////
/////// Photos Library with pagination////////
//////////////////////////////////////////////

// to get all the photos from libary with pagination system

exports.getPhotoLibrary = async (req, res) => {
  try {
    // these are query to add pagination
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var skip = (page - 1) * limit;

    // to count the total posts and generate number of pages.
    const count = await PhotoLibrary.count();
    const totalPages = Math.ceil(count / limit);
    const items = await PhotoLibrary.find().skip(skip).limit(limit).sort({date:-1});
    res.status(200).json({ totalPages,items });

    // PhotoLibrary.count().exec(function (err, count) {
    //   PhotoLibrary.find()
    //     .skip(skip)
    //     .limit(limit)
    //     .exec(function (err, items) {
    //       res.send({
    //         items: items,
    //         totalPages: Math.ceil(count / limit),
    //       });
    //     });
    // });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
