#!/usr/bin/env node

import 'zx/globals'

let node

setTimeout(() => {
  // Force restart after 5 seconds
  node.kill()
}, 5000)

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
