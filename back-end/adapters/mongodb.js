const { MongoClient } = require('mongodb');

const uri =
  'mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const find = async (query_filter) => {
  // client.db.
};
