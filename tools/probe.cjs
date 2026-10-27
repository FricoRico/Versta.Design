// paint probes: count acid (#E6FF00), ink (#0B0B0B), red-ish px per state shot
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const dir = process.argv[2];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort()) {
  const raw = execFileSync('convert', [path.join(dir, f), 'rgb:-'], { maxBuffer: 1 << 28 });
  let acid = 0, ink = 0, red = 0;
  for (let i = 0; i + 2 < raw.length; i += 3) {
    const r = raw[i], g = raw[i + 1], b = raw[i + 2];
    if (r === 0xE6 && g === 0xFF && b === 0x00) acid++;
    if (r === 0x0B && g === 0x0B && b === 0x0B) ink++;
    if (r > 150 && g < 90 && b < 90) red++;
  }
  console.log(`${f.padEnd(28)} acid=${String(acid).padStart(7)} ink=${String(ink).padStart(8)} red=${red}`);
}
