#!/usr/bin/env node

import chokidar from 'chokidar'
import { registerGlobals } from './zx.mjs'
import { on, EventEmitter } from 'events'

registerGlobals()

let node
let ee = new EventEmitter() 

chokidar
  .watch(['**/*.mjs', '**/*.js'], {
    ignoreInitial: true,
    ignored: ['**/node_modules/**'],
  })
  .on('all', () => {
    ee.emit('restart')
  })

ee.on('restart', async () => {
  node.catch(() => start())
  node.kill()
  console.log('ℹ restarting')
})

await start()

async function start () {
  node = $`${
    process.argv[0]
  } ${
    process.argv.slice(2).map($.originalQuote).join(' ')
  }`
  try {
    console.log('ℹ started')
    await node
  } catch {
    // No need to do anything as zx will print the original stderr
  }
}
