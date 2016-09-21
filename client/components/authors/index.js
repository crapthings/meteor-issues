import { Authors, Posts } from '/collections'

const List = Observer(({ model }) => <div>
  <button onClick={() => Meteor.call('authors:random')}>add random author</button>
  <h3>authors {model.authors.length}</h3>
  {model.authors.map(author => <Item key={author._id} author={author} />)}
</div>)

// these part of codes look really weird, but it works

const Item = ({author}) => {

  const toggle = new ReactiveVar(false)

  const test = _.throttle(function () {
    toggle.set(!toggle.get())
  }, 300)

  const _comp = ({show, posts}) => <div>
    <h3>
      <button onClick={test}>{show ? 'hide posts' : 'show posts'}</button>
      <span>{author.name}</span>
    </h3>
    {show && <button onClick={() => Meteor.call('posts:random', author._id)}>add random posts</button>}
    {show && posts.map(post => <p key={post._id}>
      {post.title}
    </p>
    )}
  </div>

  let subHandler

  const tracker = (props, onData) => {
    const show = toggle.get()
    const posts = show ? Posts.find({
      authorId: author._id
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch() : []
    if (show) {
     subHandler = Meteor.subscribe('postsByAuthorId', author._id)
     subHandler.ready && onData(null, { show, posts})
    } else {
      subHandler && subHandler.stop()
      onData(null, { show, posts})
    }
  }

  const comp = Container(tracker)(_comp)

  return new comp()

}

function tracker (props, onData) {

  const SubscriptionsAreReady = _.every([
    Subs.subscribe('authors').ready(),
  ])

  const authors = Authors.find({}, {
    sort: {
      createdAt: -1
    }
  }).fetch()

  const model = {
    authors
  }

  SubscriptionsAreReady && onData(null, { model })

}

Components.Authors = Container(tracker)(List)
