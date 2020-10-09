const mongoAdapter = require('../adapters/mongodb');

const addJoke = async (database, text, username, password) => {
  let user_id = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user_id === null) {
    return {
      status_code: 401,
      data: { error: 'Username or password incorrect' },
    };
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
  return { status_code: 201, data: { status: 'Success' } };
};

const deleteJoke = async (database, id, username, password) => {
  let user_id = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user_id === null) {
    return {
      status_code: 401,
      data: { error: 'Username or password incorrect' },
    };
  }

  let data = await mongoAdapter.deleteOne(database, 'jokes', {
    _id: id,
    created_by_user_id: user_id.id,
  });
  if (data.deletedCount === 0) {
    return {
      status_code: 404,
      data: { error: 'This joke not belong to you or not found this joke' },
    };
  }
  return { status_code: 200, data: { status: 'Success' } };
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

module.exports = { addJoke, deleteJoke, getAllJokes, getJoke };
