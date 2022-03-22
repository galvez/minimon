#!/usr/bin/env node

import 'zx/globals'
import chokidar from 'chokidar'

let node

chokidar
  .watch(['**/*.mjs', '**/*.js'], {
    ignoreInitial: true,
    ignored: ['**/node_modules/**'],
  })
  .on('all', () => node.kill())

await start()

async function start () {  
  node = $`node ${process.argv[2]}`
  try {
    await node
  } catch {
    start()
  }
}
