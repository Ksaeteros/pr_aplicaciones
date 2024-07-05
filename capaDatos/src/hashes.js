const bcrypt = require('bcrypt');

const plainPasswords = {
  admin: 'admin',
  gerente: 'gerente',
  encargado: 'encargado'
};

const generateHashes = async () => {
  const hashes = {};
  for (const user in plainPasswords) {
    hashes[user] = await bcrypt.hash(plainPasswords[user], 10);
  }
  console.log(hashes);
};

generateHashes();
