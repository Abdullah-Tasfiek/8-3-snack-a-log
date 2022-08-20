const db = require("../db/dbConfig.js");

const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (error) {
    return error;
  }
};

const getSnack = async (id) => {
  try {
    const oneSnack = await db.one("SELECT * FROM snacks WHERE id=$1", id);
    return oneSnack;
  } catch (error) {
    return error;
  }
};

const deleteSnack = async (id) => {
  try {
    const oneSnack = await db.one(
      "DELETE FROM snacks WHERE id=$1 RETURNING *",
      id
    );
    return oneSnack;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

const createSnack = async ({
  name,
  fiber,
  protein,
  added_sugar,
  is_healthy,
  image,
}) => {
  try {
    if (!image) {
      image = "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image";
    }
    const newSnack = await db.one(
      "INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, fiber, protein, added_sugar, is_healthy, image]
    );
    return newSnack;
  } catch (error) {
    return error;
  }
};

const updateSnack = async (
  id,
  { name, fiber, protein, added_sugar, is_healthy, image, ...otherStuff }
) => {
  try {
    const updateSnack = await db.one(
      "UPDATE snacks SET name=$1, fiber=$2, protein=$3, added_sugar=$4 , is_healthy=$5, image=$6 where id=$7 RETURNING *",
      [name, fiber, protein, added_sugar, is_healthy, image, id]
    );
    return updateSnack;
  } catch (error) {
    console.log(error.message || error);
    return error;
  }
};

module.exports = {
  getAllSnacks,
  getSnack,
  deleteSnack,
  createSnack,
  updateSnack,
};
