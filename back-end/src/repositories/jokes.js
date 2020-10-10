const mongoAdapter = require('../adapters/mongodb');

const addJoke = async (database, text, username, password) => {
  let user = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user === null) {
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
    created_by_user_id: user.id,
    likes_by_user_ids: [],
  };
  await mongoAdapter.insertOne(database, 'jokes', insert_object);
  return { status_code: 201, data: { status: 'Add joke success' } };
};

const deleteJoke = async (database, id, username, password) => {
  let user = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user === null) {
    return {
      status_code: 401,
      data: { error: 'Username or password incorrect' },
    };
  }

  let data = await mongoAdapter.deleteOne(database, 'jokes', {
    _id: id,
    created_by_user_id: user.id,
  });
  if (data.deletedCount === 0) {
    return {
      status_code: 404,
      data: { error: `This joke id ${id} is not belong to you or not found` },
    };
  }
  return { status_code: 200, data: { status: 'Delete joke success' } };
};

const dislikeJoke = async (database, id, username, password) => {
  let user = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user === null) {
    return {
      status_code: 401,
      data: { error: 'Username or password incorrect' },
    };
  }

  let joke = await mongoAdapter.findOne(database, 'jokes', { _id: id });
  if (joke === null) {
    return {
      status_code: 404,
      data: { error: `Joke id ${id} not found` },
    };
  }
  let likes = joke.likes_by_user_ids;
  if (!likes.includes(user.id)) {
    return {
      status_code: 409,
      data: { error: `You didn't like this joke (joke id ${id})` },
    };
  }
  update_filter = { $pull: { likes_by_user_ids: user.id } };
  await mongoAdapter.updateOne(database, 'jokes', { _id: id }, update_filter);
  return { status_code: 200, data: { status: 'Dislike success' } };
};

const getAllJokes = async (database) => {
  let data = await mongoAdapter.find(database, 'jokes', {});
  return data;
};

const getJoke = async (database, id) => {
  let data = await mongoAdapter.findOne(database, 'jokes', { _id: id });
  return data;
};

const likeJoke = async (database, id, username, password) => {
  let user = await mongoAdapter.findOne(database, 'users', {
    username: username,
    password: password,
  });
  if (user === null) {
    return {
      status_code: 401,
      data: { error: 'Username or password incorrect' },
    };
  }

  let joke = await mongoAdapter.findOne(database, 'jokes', { _id: id });
  if (joke === null) {
    return {
      status_code: 404,
      data: { error: `Joke id ${id} not found` },
    };
  }
  let likes = joke.likes_by_user_ids;
  if (likes.includes(user.id)) {
    return {
      status_code: 409,
      data: { error: `You already like this joke (joke id ${id})` },
    };
  }
  update_filter = { $push: { likes_by_user_ids: user.id } };
  await mongoAdapter.updateOne(database, 'jokes', { _id: id }, update_filter);
  return { status_code: 200, data: { status: 'Like success' } };
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

module.exports = {
  addJoke,
  deleteJoke,
  dislikeJoke,
  getAllJokes,
  getJoke,
  likeJoke,
};
