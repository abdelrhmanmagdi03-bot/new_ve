db = db.getSiblingDB('profiledb');
db.createUser({
  user: 'appuser',
  pwd: 'apppass123',
  roles: [{ role: 'readWrite', db: 'profiledb' }]
});
