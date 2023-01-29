const OnlineStore = require("../model/OnlineStore");

// to create online store

exports.createOnlineStore = async (req, res) => {
  const { title, des, price, photo } = req.body;

  try {
    if (!title) {
      return res.status(422).json({ error: "Please add title" });
    }

    if (!des) {
      return res.status(422).json({ error: "Please add description" });
    }

    if (!price) {
      return res.status(422).json({ error: "Please add price" });
    }
    if (!photo) {
      return res.status(422).json({ error: "Please add photo" });
    }

    const onlineStoreDetails = OnlineStore({ title, des, price, photo });

    const saveOnlineStore = await OnlineStore.create(onlineStoreDetails);

    res.status(201).json(saveOnlineStore);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// to get all online store

exports.getAllOnlineStore = async (req, res) => {
  try {
    const allOnlineStore = await OnlineStore.find().sort({ date: -1 });

    res.status(200).json(allOnlineStore);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
