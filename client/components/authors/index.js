import { Authors, Posts } from '/collections'

import Item from './item'

const List = Observer(({ model }) => <div>
  <button onClick={() => Meteor.call('authors:random')}>add random author</button>
  <h3>authors {model.authors.length}</h3>
  {model.authors.map(author => <Item key={author._id} author={author} />)}
</div>)

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
