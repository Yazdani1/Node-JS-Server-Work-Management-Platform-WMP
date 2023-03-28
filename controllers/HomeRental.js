const HomeRental = require("../model/HomeRental");

// to create home rental

exports.createHomeRentalAdvertise = async (req, res) => {
  const { title, des, city, price, photo, room, latitude, longitude } =
    req.body;

  try {
    if (!title) {
      return res.status(422).json({ error: "Please add title" });
    }

    if (!des) {
      return res.status(422).json({ error: "Please add des" });
    }

    if (!city) {
      return res.status(422).json({ error: "Please add city" });
    }

    if (!price) {
      return res.status(422).json({ error: "Please add price" });
    }

    if (!room) {
      return res.status(422).json({ error: "Please add room" });
    }

    if (!latitude) {
      return res.status(422).json({ error: "Please add room" });
    }

    if (!longitude) {
      return res.status(422).json({ error: "Please add room" });
    }

    if (!photo) {
      return res.status(422).json({ error: "Please add photo" });
    }

    const homeRentalDetails = HomeRental({
      title,
      des,
      city,
      price,
      photo,
      room,
      latitude,
      longitude,
    });

    const saveHomeRental = await HomeRental.create(homeRentalDetails);

    res.status(201).json(saveHomeRental);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// to get all home rental advertise

exports.getAllHomeRentalAdvertise = async (req, res) => {
  try {
    const allHomeRental = await HomeRental.find().sort({ date: -1 });
    res.status(200).json(allHomeRental);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To delete home rental
 */

exports.deleteHomeRentalAdvertise = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };

    if (!deleteQuery) {
      return res.status(422).json({ error: "Home rental id could not find" });
    }

    const deleteSingleHomeRental = await HomeRental.findByIdAndDelete(
      deleteQuery
    );

    res.status(200).json(deleteSingleHomeRental);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * Get single home rental details
 */

exports.getSingleHomeRentalDetails = async (req, res) => {
  try {
    const singleHomerentalQuery = { _id: req.params.id };

    const singleHomeRental = await HomeRental.findOne(singleHomerentalQuery);

    res.status(200).json(singleHomeRental);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
