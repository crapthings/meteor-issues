export const Authors = new Mongo.Collection('authors')

Meteor.methods({
  'authors:random' () {
    Authors.insert({
      name: faker.name.findName(),
      createdAt: new Date(),
    })
  }
})

Meteor.isServer && Meteor.publish('authors', function () {
  // Meteor._sleepForMs(1000)
  return Authors.find({}, {
    sort: {
      createdAt: -1
    }
  })
})
