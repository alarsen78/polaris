// just a simple script to hash passwords using argon2
// usage: npx tsx hash.ts <password>

import * as argon2 from 'argon2';

async function main() {
  const plain = process.argv[2];
  if (!plain) {
    console.error('Usage: npx tsx hash.ts <password>');
    process.exit(1);
  }

  const hash = await argon2.hash(plain, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

  console.log('Hashed password:\n', hash);
}

main();
