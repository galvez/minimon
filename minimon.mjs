#!/usr/bin/env node

import JSON5 from 'json5'
import chokidar from 'chokidar'
import { registerGlobals } from './zx.mjs'
import { EventEmitter } from 'events'

registerGlobals()

let node

const ee = new EventEmitter() 
const config = await loadConfig()

chokidar
  .watch(config.watch, {
    ignoreInitial: true,
    ignored: config.ignored,
  })
  .on('all', () => {
    restart()
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

function restart () {
  node.catch(() => start())
  node.kill()
  console.log('ℹ restarting')
}

async function loadConfig () {
  const defaults = {
    watch: ['**/*.mjs', '**/*.js'],
    ignored: ['**/node_modules/**'],
  }
  if (await fs.exists('./minimon.conf')) {
    return Object.assign(defaults, JSON5.parse(await fs.readFile('./minimon.conf', 'utf8')))
  } else {
    return defaults
  }
}
