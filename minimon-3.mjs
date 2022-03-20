#!/usr/bin/env node

import 'zx/globals'
import chokidar from 'chokidar'
import { EventEmitter } from 'events'

let node
let ee = new EventEmitter() 

chokidar
  .watch(['**/*.mjs', '**/*.js'], {
    ignoreInitial: true,
    ignored: ['**/node_modules/**'],
  })
  .on('all', () => {
    node.kill()
  })

ee.on('restart', async () => {
  console.log('Restarting')
  await start()
})

await start()

async function start () {  
  node = $`node ${process.argv[2]}`
  try {
    await node
  } catch {
    ee.emit('restart')
  }
}