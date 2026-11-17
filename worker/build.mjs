import { readFileSync, writeFileSync } from 'node:fs';
const html=readFileSync(new URL('./admin.html',import.meta.url),'utf8');
const worker=readFileSync(new URL('./worker.mjs',import.meta.url),'utf8');
writeFileSync(new URL('./src.mjs',import.meta.url),`const ADMIN_HTML = ${JSON.stringify(html)};\n${worker}`);
