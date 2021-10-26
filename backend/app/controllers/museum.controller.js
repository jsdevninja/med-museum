const fetch = require("node-fetch");

exports.getMuseums = async (req, res) => {
  try {
    const today = new Date();
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`
    );
    const data = await response.json();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Unknown error occured.",
    });
  }
};

exports.getObject = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );
    const data = await response.json();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Unknown error occured.",
    });
  }
};
