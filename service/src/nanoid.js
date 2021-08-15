const { customAlphabet } = require('nanoid');

const nanoid = () => {
  const nanoidFn = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
  return nanoidFn()
}

module.exports = {
  nanoid
}