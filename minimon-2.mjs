#!/usr/bin/env node

import 'zx/globals'
import chokidar from 'chokidar'

let node

chokidar
  .watch(['**/*.mjs', '**/*.js'], {
    ignoreInitial: true,
    ignored: ['**/node_modules/**'],
  })
  .on('all', () => {
    node.kill()
  })

while (true) {
  node = getNode()
  try {
    await node
  } catch {
    console.log('Restarting')
  }
}

function getNode () {
  return $`node ${process.argv[2]}`
}
