import * as collections from '/collections'

const dummy = {
  makeAuthors,
  makePosts
}

const idsHolder = {}

_.each(collections, collection => {

  const _name = collection._name

  const _Name = _.capitalize(_name)

  collection.remove({})

  idsHolder[_name] = _.times(10, () => collection.insert(dummy['make' + _Name]()))

})

function makeAuthors () {
  return {
    name: faker.name.findName()
  }
}

function makePosts () {
  return {
    title: faker.lorem.sentence(),
    createdAt: new Date(),
    authorId: _.sample(idsHolder.authors)
  }
}
