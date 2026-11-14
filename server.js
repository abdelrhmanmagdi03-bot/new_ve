const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI ||
  'mongodb://appuser:apppass123@localhost:27017/profiledb?authSource=profiledb';
const PORT = process.env.PORT || 3000;

const Profile = mongoose.model('Profile', new mongoose.Schema({
  fullName: String,
  birthDate: String,
  job: String,
  company: String
}));

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/profile', async (req, res) => {
  res.json(await Profile.findOne());
});

async function start() {
  await mongoose.connect(MONGO_URI);
  if (!(await Profile.findOne())) {
    await Profile.create({
      fullName: 'Abdelrahman Magdy Fahmy',
      birthDate: '1999-07-17',
      job: 'IT',
      company: 'Bank of Alexandria'
    });
    console.log('Profile seeded');
  }
  app.listen(PORT, () => console.log('App running on port ' + PORT));
}
start().catch(err => { console.error(err); process.exit(1); });
