const { spawn } = require('child_process')
const fs = require('fs')

spawn('node_modules/.bin/tsc', ['-m', 'commonjs', '-t', 'es5', '--outDir', 'lib'])
// spawn('node_modules/.bin/tsc', ['-m', 'system', '--outDir', 'lib/system'])
// spawn('node_modules/.bin/tsc', ['-m', 'umd', '--outDir', 'lib/umd'])
const esm = spawn('node_modules/.bin/tsc', ['-m', 'esnext', '-t', 'esnext', '--outDir', 'lib/esm'])

esm.on('exit', () => {
  fs.readdirSync('lib/esm').map((x) => {
    if (/\.js$/.test(x)) {
      const contents = fs.readFileSync(`lib/esm/${x}`, 'utf-8')
      fs.writeFileSync(
        `lib/esm/${x}`,
        contents.replace(/\sfrom\s('\.\/.*?')/gm, (_, b) => ` from ${b.replace(/'$/, `.js'`)}`),
      )
      fs.writeFileSync(
        `lib/esm/${x.replace(/js$/, 'mjs')}`,
        contents.replace(/\sfrom\s('\.\/.*?')/gm, (_, b) => ` from ${b.replace(/'$/, `.mjs'`)}`),
      )
    }
    if (/\.d.ts$/.test(x)) fs.copyFileSync(`lib/esm/${x}`, `lib/esm/${x.replace(/ts$/, 'mts')}`)
  })
})
