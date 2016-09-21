export const Posts = new Mongo.Collection('posts')

import { Authors } from './authors'

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

  'posts:random' (id) {

    _.times(_.random(1, 5), () => {
      const authorId = id || Authors.aggregate([{
        $sample: { size: 1 }
      }])[0]._id

      Posts.insert({
        title: faker.lorem.sentence(),
        createdAt: new Date(),
        authorId,
      })
    })

  }

})

Meteor.isServer && Meteor.publish('posts', function () {
  // Meteor._sleepForMs(1000)
  return Posts.find({}, {
    sort: {
      createdAt: -1
    }
  })
})

Meteor.isServer && Meteor.publish('postsByAuthorId', function (authorId) {
  // Meteor._sleepForMs(1000)
  return Posts.find({
    authorId
  }, {
    sort: {
      createdAt: -1
    }
  })
})
