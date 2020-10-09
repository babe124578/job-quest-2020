const find = async (db, collectionName, query_filter, skip = 0, limit = 0) => {
  let result = await db
    .collection(collectionName)
    .find(query_filter)
    .skip(skip)
    .limit(limit)
    .toArray();
  return result;
};

const findOneAndUpdate = async (
  db,
  collectionName,
  query_filter,
  update_object
) => {
  let result = await db
    .collection(collectionName)
    .findOneAndUpdate(query_filter, update_object);
  return result;
};

const findOne = async (db, collectionName, query_filter) => {
  let result = await db.collection(collectionName).findOne(query_filter);
  return result;
};

const insertOne = async (db, collectionName, insert_object) => {
  let result = await db.collection(collectionName).insertOne(insert_object);
  return result;
};

const updateOne = async (db, collectionName, query_filter, update_object) => {
  let result = await db
    .collection(collectionName)
    .updateOne(query_filter, { $set: update_object });
  return result;
};

module.exports = { find, findOneAndUpdate, findOne, insertOne, updateOne };
