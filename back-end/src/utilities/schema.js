let addJokeSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      required: true,
    },
  },
};

let registerSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
};

module.exports = {
  addJokeSchema,
  registerSchema,
};
