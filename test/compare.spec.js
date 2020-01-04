const { compare } = require('../compare')

describe('compare lists', () => {
  it('should find new products', () => {
    const expected = {
      removed: [1, 2, 3],
      added: [4, 5]
    }

    const newProducts = [4, 5]
    const oldProducts = [1, 2, 3]

    const result = compare(newProducts, oldProducts)

    expect(result.added.items).toEqual(expected.added)
    expect(result.removed.items).toEqual(expected.removed)
  })
})
