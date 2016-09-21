import { Authors, Posts } from '/collections'

// export const model = {
//   @Observable posts: []
// }

const List = Observer(({model}) => <div>
  <button onClick={() => Meteor.call('posts:random')}>add</button>
  <button onClick={() => Meteor.call('posts:empty')}>remove all</button>
  <h3>posts {model.posts.length}</h3>
  {model.posts.map(post => <Item key={post._id} post={post} />)}
</div>)

const Item = Observer(({post}) => <p>
  <b>{post.author.name}: </b>
  <span style={{cursor: 'pointer'}} onClick={() => Meteor.call('posts:update', post._id)}>{post.title}</span>
</p>)

function tracker (props, onData) {

  const SubscriptionsAreReady = _.every([
    Subs.subscribe('authors').ready(),
    Subs.subscribe('posts').ready(),
  ])

  const posts = Posts.find({}, {
    sort: {
      createdAt: -1
    }
  }).map(post => _.extend(post, {
    author: Authors.findOne(post.authorId) || {
      name: 'unknown'
    }
  }))

  const model = {
    posts: posts
  }

  SubscriptionsAreReady && onData(null, { model })

}

Components.Posts = Container(tracker)(List)
