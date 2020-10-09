var db = connect('mongodb://root:password@localhost:27017/admin');

db = db.getSiblingDB('job-quest');

db.createCollection('counters');
db.createCollection('jokes');
db.createCollection('users');

db.users.insert({
  _id: NumberInt(1),
  username: 'admin',
  password: 'password',
});

db.jokes.insertMany([
  {
    _id: NumberInt(1),
    text: 'Facebook​ ล่ม​ IG​ ล่ม​ Umbrella ก็ล่ม',
    created_by_user_id: NumberInt(1),
    likes_by_user_ids: [NumberInt(1)],
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
    sequence_value: NumberInt(1),
  },
]);

db.createUser({
  user: 'job-quest',
  pwd: 'job-quest',
  roles: [{ role: 'root', db: 'admin' }],
});
