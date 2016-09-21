export const Posts = new Mongo.Collection('posts')

Meteor.methods({

  'posts:update' (id) {
    Posts.update(id, {
      $set: {
        title: faker.lorem.sentence()
      }
    })
  },

  'posts:empty' () {
    Posts.remove({})
  },

})

Meteor.isServer && Meteor.publish('posts', function () {
  Meteor._sleepForMs(500)
  return Posts.find({}, {
    sort: {
      createdAt: -1
    }
  })
})
