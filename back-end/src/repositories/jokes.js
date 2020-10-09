const mongoAdapter = require('../adapters/mongodb');

const addJoke = async (database, text, username, password) => {
  let user_id = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user_id === null) {
    return 401;
  }
  let next_sequence = await _getNextSequenceValue(
    database,
    'counters',
    'joke_id'
  );

  let insert_object = {
    _id: next_sequence,
    text: text,
    created_by_user_id: user_id.id,
    likes_by_user_ids: [],
  };
  let data = await mongoAdapter.insertOne(database, 'jokes', insert_object);
  return data;
};

const getAllJokes = async (database) => {
  let data = await mongoAdapter.find(database, 'jokes', {});
  return data;
};

const getJoke = async (database, id) => {
  let data = await mongoAdapter.find(database, 'jokes', { _id: id });
  return data;
};

const _getNextSequenceValue = async (
  database,
  collectionName,
  sequenceName
) => {
  let query_filter = { _id: sequenceName };
  let update_filter = { $inc: { sequence_value: 1 } };
  let next_sequence = await mongoAdapter.findOneAndUpdate(
    database,
    collectionName,
    query_filter,
    update_filter
  );
  return next_sequence.value.sequence_value + 1;
};

module.exports = { addJoke, getAllJokes, getJoke };
