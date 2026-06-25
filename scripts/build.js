import { spawnSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const currentVersion = process.versions.node;
console.log(`Current Node.js version: v${currentVersion}`);

const majorVersion = parseInt(currentVersion.split('.')[0], 10);

if (majorVersion >= 22) {
  console.log('Node.js version is sufficient (>= 22). Running astro build...');
  const result = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', shell: true });
  process.exit(result.status ?? 0);
} else {
  console.log('Node.js version is below 22. Attempting to locate a compatible Node.js version...');
  
  const nvmVersionsDir = '/opt/buildhome/.nvm/versions/node';
  let nodeBinPath = null;
  
  if (existsSync(nvmVersionsDir)) {
    const versions = readdirSync(nvmVersionsDir);
    const compatibleVersions = versions
      .filter(v => {
        const match = v.match(/^v(\d+)\./);
        return match && parseInt(match[1], 10) >= 22;
      })
      .sort((a, b) => {
        const parse = v => v.replace(/^v/, '').split('.').map(Number);
        const pa = parse(a);
        const pb = parse(b);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
          const va = pa[i] ?? 0;
          const vb = pb[i] ?? 0;
          if (va !== vb) return vb - va;
        }
        return 0;
      });
      
    if (compatibleVersions.length > 0) {
      const selectedVersion = compatibleVersions[0];
      const targetBin = join(nvmVersionsDir, selectedVersion, 'bin/node');
      if (existsSync(targetBin)) {
        nodeBinPath = targetBin;
        console.log(`Found compatible Node.js version ${selectedVersion} at ${nodeBinPath}`);
      }
    }
  }
  
  if (nodeBinPath) {
    const binDir = join(nodeBinPath, '..');
    console.log(`Executing astro build with PATH prepended with: ${binDir}`);
    const newEnv = {
      ...process.env,
      PATH: `${binDir}:${process.env.PATH}`
    };
    
    const result = spawnSync('npx', ['astro', 'build'], {
      stdio: 'inherit',
      shell: true,
      env: newEnv
    });
    process.exit(result.status ?? 0);
  } else {
    console.error('Error: No compatible Node.js version (>= 22) found in nvm directory.');
    // Fallback to running with current node, which will print Astro's standard unsupported error
    const result = spawnSync('npx', ['astro', 'build'], { stdio: 'inherit', shell: true });
    process.exit(result.status ?? 0);
  }
}
