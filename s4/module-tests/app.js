const nothing = require('./nothing')
const SimpleObject = require('./simple-object')
const first = require('./first')
const second = require('./second')

nothing.doNothing()

const s0 = new SimpleObject('some object')
s0.doStuff()

first.doStuff()
second.doStuff()