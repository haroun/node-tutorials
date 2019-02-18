const flavour = {
  strawberry: 'strawberry',
  vanilla: 'vanilla'
}

const flavourSold = flavour => ({
  name: 'flavour-sold',
  payload: {
    flavour
  }
})
const flavourRestocked = (flavour, quantity) => ({
  name: 'flavour-restocked',
  payload: {
    flavour,
    quantity
  }
})
const flavourWentOutOfStock = flavour => ({
  name: 'flavour-went-out-of-stock',
  payload: {
    flavour
  }
})
const flavourWasNotInStock = flavour => ({
  name: 'flavour-was-not-in-stock',
  payload: {
    flavour
  }
})

module.exports.flavour = flavour
module.exports.flavourSold = flavourSold
module.exports.flavourRestocked = flavourRestocked
module.exports.flavourWentOutOfStock = flavourWentOutOfStock
module.exports.flavourWasNotInStock = flavourWasNotInStock
