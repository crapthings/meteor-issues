import { Posts, Authors } from '/collections'

const DataSource = ({ ...dataSourceProps }) => {

  if (!_.isPlainObject(dataSourceProps.subscribe))
    throw new Error('props type subscribe should be an object...')

  const _subscriptions = dataSourceProps.subscribe

  function tracker (trackerProps, onData) {

    const _dataset = {}

    const _subscriptionsAreReady = _.map(_subscriptions, (cursor, publishName) => {
      const ready = Meteor.subscribe(publishName).ready()
      _dataset[publishName] = cursor()
      return ready
    })

    const _data = _dataset

    onData(null, _data)

  }

  return new (Container(tracker)(dataSourceProps.children))() || <div>you need a children...</div>
}

const Subscriptions = {
  posts () {
    return Posts.find().fetch()
  },

  authors () {
    return Authors.find().fetch()
  }
}

Components.Test002 = () => <div>
  {__filename}
  <DataSource subscribe={Subscriptions} children={({...props}) => <div>
    {console.log(props)}
    <h3>posts</h3>
    {props.posts.map(post => <p key={post._id}>{post.title}</p>)}

    <h3>authors</h3>
    {props.authors.map(doc => <p key={doc._id}>{doc.name}</p>)}
  </div>} />
</div>
