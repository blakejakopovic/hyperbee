const test = require('brittle')
const b4a = require('b4a')
const { create } = require('./helpers')

test('bee.put({ cas }) succeds if cas(last, next) returns truthy', async function (t) {
  const key = 'key'
  const value = 'value'

  {
    const db = create()
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value + '^', { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
  }

  {
    const db = create()
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value + '^', { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const cas = (lst, nxt) => JSON.stringify(lst.value) !== JSON.stringify(nxt.value)
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    await db.put(key, { value: value + '^' }, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const cas = (lst, nxt) => JSON.stringify(lst.value) !== JSON.stringify(nxt.value)
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    await db.put(key, { value }, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
  }

  {
    const db = create({ keyEncoding: 'binary', valueEncoding: 'binary' })
    const cas = (lst, nxt) => b4a.compare(lst.value, nxt.value) !== 0
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    await db.put(k0, b4a.from(value), { cas })
    const snd = await db.get(k0)
    t.alike(fst, snd)
  }

  {
    const db = create({ keyEncoding: 'binary', valueEncoding: 'binary' })
    const cas = (lst, nxt) => b4a.compare(lst.value, nxt.value) !== 0
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    await db.put(k0, b4a.from(value + '^'), { cas })
    const snd = await db.get(k0)
    t.unlike(fst, snd)
  }
})

test('bee.batch().put({ cas }) succeds if cas(last, next) returns truthy', async function (t) {
  const key = 'key'
  const value = 'value'

  {
    const bee = create()
    const db = bee.batch()
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value + '^', { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
  }

  {
    const bee = create()
    const db = bee.batch()
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    const db = bee.batch()
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value + '^', { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    const db = bee.batch()
    const cas = (lst, nxt) => nxt.value !== lst.value
    await db.put(key, value)
    const fst = await db.get(key)
    await db.put(key, value, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const db = bee.batch()
    const cas = (lst, nxt) => JSON.stringify(lst.value) !== JSON.stringify(nxt.value)
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    await db.put(key, { value: value + '^' }, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const db = bee.batch()
    const cas = (lst, nxt) => JSON.stringify(lst.value) !== JSON.stringify(nxt.value)
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    await db.put(key, { value }, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'binary' })
    const db = bee.batch()
    const cas = (lst, nxt) => b4a.compare(lst.value, nxt.value) !== 0
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    await db.put(k0, b4a.from(value), { cas })
    const snd = await db.get(k0)
    t.alike(fst, snd)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'binary' })
    const db = bee.batch()
    const cas = (lst, nxt) => b4a.compare(lst.value, nxt.value) !== 0
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    await db.put(k0, b4a.from(value + '^'), { cas })
    const snd = await db.get(k0)
    t.unlike(fst, snd)
  }
})

test('bee.del({ cas }) succeds if cas(last, tomb) returns truthy', async function (t) {
  const key = 'key'
  const value = 'value'

  {
    const db = create()
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value === value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const db = create()
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value !== value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value === value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value !== value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) === JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) !== JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) === JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const db = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) !== JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const db = create({ keyEncoding: 'binary', valueEncoding: 'binary' })
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    const cas = (lst, nxt) => b4a.compare(lst.value, v0) === 0
    await db.del(key, { cas })
    const snd = await db.get(k0)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const db = create({ keyEncoding: 'binary', valueEncoding: 'binary' })
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    const cas = (lst, nxt) => b4a.compare(lst.value, v0) !== 0
    await db.del(key, { cas })
    const snd = await db.get(k0)
    t.alike(fst, snd)
    t.not(snd, null)
  }
})

test('bee.batch({ cas }) succeds if cas(last, tomb) returns truthy', async function (t) {
  const key = 'key'
  const value = 'value'

  {
    const bee = create()
    const db = bee.batch()
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value === value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const bee = create()
    const db = bee.batch()
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value !== value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    const db = bee.batch()
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value === value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'utf8' })
    const db = bee.batch()
    await db.put(key, value)
    const fst = await db.get(key)
    const cas = (lst) => lst.value !== value
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const db = bee.batch()
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) === JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const db = bee.batch()
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) !== JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const db = bee.batch()
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) === JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'json' })
    const db = bee.batch()
    const v = { value }
    await db.put(key, v)
    const fst = await db.get(key)
    const cas = (lst) => JSON.stringify(lst.value) !== JSON.stringify(v)
    await db.del(key, { cas })
    const snd = await db.get(key)
    t.alike(fst, snd)
    t.not(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'binary' })
    const db = bee.batch()
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    const cas = (lst, nxt) => b4a.compare(lst.value, v0) === 0
    await db.del(key, { cas })
    const snd = await db.get(k0)
    t.unlike(fst, snd)
    t.is(snd, null)
  }

  {
    const bee = create({ keyEncoding: 'utf8', valueEncoding: 'binary' })
    const db = bee.batch()
    const k0 = b4a.from(key)
    const v0 = b4a.from(value)
    await db.put(k0, v0)
    const fst = await db.get(k0)
    const cas = (lst, nxt) => b4a.compare(lst.value, v0) !== 0
    await db.del(key, { cas })
    const snd = await db.get(k0)
    t.alike(fst, snd)
    t.not(snd, null)
  }
})

test('flushing an empty batch after a "failed" cas op releases lock (allows progress)', async function (t) {
  const key = 'key'
  const value = 'value'

  {
    const cas = (lst, nxt) => lst.value !== nxt.value
    const db = create()
    await db.put(key, value)
    let b = db.batch()
    await b.put(key, value, { cas })
    t.is(b.length, 0, 'batch is empty')
    await b.flush()
    b = db.batch()
    await b.put(key, value, { cas })
    t.ok(true, 'made progress')
    b.destroy()
  }

  {
    const cas = (lst, nxt) => lst.value !== nxt.value
    const db = create()
    await db.put(key, value)
    let b = db.batch()
    await b.put(key, value, { cas })
    t.is(b.length, 0, 'batch is empty')
    await b.flush()
    b = db.batch()
    await b.del(key, value, { cas })
    t.ok(true, 'made progress')
    b.destroy()
  }

  {
    const cas = (lst) => lst.value !== value
    const db = create()
    await db.put(key, value)
    let b = db.batch()
    await b.del(key, { cas })
    t.is(b.length, 0, 'batch is empty')
    await b.flush()
    b = db.batch()
    await b.del(key)
    t.ok(true, 'made progress')
    b.destroy()
  }

  {
    const cas = (lst) => lst.value !== value
    const db = create()
    await db.put(key, value)
    let b = db.batch()
    await b.del(key, { cas })
    t.is(b.length, 0, 'batch is empty')
    await b.flush()
    b = db.batch()
    await b.put(key, value)
    t.ok(true, 'made progress')
    b.destroy()
  }
})
