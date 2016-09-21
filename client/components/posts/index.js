import { Authors, Posts } from '/collections'

export const model = {
  @Observable posts: []
}

function subscribe (dom) {
  console.log('subscribe')
  Meteor.subscribe('authors')
  Meteor.subscribe('posts')
}

export const List = Observer(({model}) => <div onCreated={subscribe}>
  <button onClick={add}>add</button>
  <button onClick={() => Meteor.call('posts:empty')}>remove all</button>
  <h3>posts {model.posts.length}</h3>
  {model.posts.map(post => <Item key={post._id} post={post} />)}
</div>)

const Item = Observer(({post}) => <p>
  {/* console.log(Mobx.toJS(post)) */}
  <span onClick={() => Meteor.call('posts:update', post._id)}>{post.author.name}: {post.title}</span>
</p>)

function add () {
  Posts.insert({
    title: faker.lorem.sentence(),
    createdAt: new Date()
  })
}

Meteor.autorun(function() {

  const posts = Posts.find({}, {
    sort: {
      createdAt: -1
    }
  }).map(post => _.extend(post, {
    author: Authors.findOne(post.authorId) || {
      name: 'unknown'
    }
  }))

  model.posts.replace(posts)

})
