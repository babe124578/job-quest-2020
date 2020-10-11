var db = connect('mongodb://root:password@localhost:27017/admin');

db = db.getSiblingDB('job-quest');

db.counters.drop();
db.jokes.drop();
db.users.drop();

db.createCollection('counters');
db.createCollection('jokes');
db.createCollection('users');

db.users.insert({
  _id: 'admin',
  id: NumberInt(1),
  username: 'admin',
  password: 'password',
});

db.users.insert({
  _id: 'user1',
  id: NumberInt(2),
  username: 'user1',
  password: 'password',
});

db.jokes.insertMany([
  {
    _id: NumberInt(1),
    text: 'Facebook​ ล่ม​ IG​ ล่ม​ Umbrella ก็ล่ม',
    created_by_user_id: NumberInt(1),
    likes_by_user_ids: [],
  },
  {
    _id: NumberInt(2),
    text: 'จะจีบเราไม่ต้องซื้อชาแนล เลี้ยงชาบูกับชานมก็พอ',
    created_by_user_id: NumberInt(1),
    likes_by_user_ids: [NumberInt(1)],
  },
]);

db.counters.insertMany([
  {
    _id: 'joke_id',
    sequence_value: NumberInt(2),
  },
  {
    _id: 'user_id',
    sequence_value: NumberInt(2),
  },
]);

// db.createUser({
//   user: 'job-quest',
//   pwd: 'job-quest',
//   roles: [{ role: 'root', db: 'admin' }],
// });
