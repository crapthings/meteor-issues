Posts.remove({})

_.times(10, () => Posts.insert({
  title: faker.lorem.sentence(),
  createdAt: new Date()
}))

Meteor.methods({
  'posts:empty' () {
    Posts.remove({})
  },

  'posts:update' (id) {
    Posts.update(id, {
      $set: {
        title: faker.lorem.sentence()
      }
    })
  }
})
