export const Authors = new Mongo.Collection('authors')

Meteor.isServer && Meteor.publish('authors', function () {
  Meteor._sleepForMs(500)
  return Authors.find({}, {
    sort: {
      createdAt: -1
    }
  })
})
