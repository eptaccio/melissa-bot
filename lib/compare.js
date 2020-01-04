function diff (first, second) {
  return first.filter(element => !second.includes(element))
}

function compare (newProducts, oldProducts) {
  const added = diff(newProducts, oldProducts)
  const removed = diff(oldProducts, newProducts)

  return {
    removed: {
      count: removed.length,
      items: removed
    },
    added: {
      count: added.length,
      items: added
    }
  }
}

module.exports = {
  compare
}
