const db = require("./config");
const { returning, where } = require("./config");

async function find() {
  try {
    const schemes = await db("schemes");
    return schemes;
  } catch (err) {
    console.log(err.stack);
    return null;
  }
}

async function findById(id) {
  try {
    const scheme = await db("schemes").where({ id });
    return scheme;
  } catch (err) {
    console.log(err.stack);
    return null;
  }
}

async function findSteps(id) {
  try {
    const steps = await db("steps").where("scheme_id", id);
    return steps;
  } catch (error) {
    console.log(err.stack);
    return null;
  }
}

async function add(scheme) {
  try {
    const ids = await db("schemes").insert(scheme).returning("id");
    return await findById(ids[0]);
  } catch (err) {
    console.log(err.stack);
    return null;
  }
}

async function update(changes, id) {
  try {
    await db("schemes").where({ id }).update(changes);
    return await findById(id);
  } catch (err) {
    console.log(err.stack);
    return null;
  }
}

async function remove(id) {
  try {
    const removedItem = await findById(id);

    if (removedItem) {
      await db("schemes").delete().where({ id });
      return removedItem;
    }
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
