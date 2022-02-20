const imageRandomizer = (images) => {
  let max = images.length
  return Math.floor(Math.random() * (max + 1))
}

module.exports = imageRandomizer