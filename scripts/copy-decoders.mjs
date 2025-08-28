
import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const root = resolve(__dirname, '..');
const nodeRoot = resolve(root, 'node_modules/three-stdlib');

const copies = [
  ['examples/jsm/libs/draco/gltf/', 'public/decoders/draco/'],
  ['examples/jsm/libs/basis/', 'public/decoders/basis/'],
];

for (const [fromRel, toRel] of copies) {
  const from = resolve(nodeRoot, fromRel);
  const to = resolve(root, toRel);
  await mkdir(to, { recursive: true });
  try {
    await cp(from, to, { recursive: true });
    console.log('Copied', fromRel, '->', toRel);
  } catch (e) {
    console.warn('Warn: could not copy', fromRel, e?.message || e);
  }
}
