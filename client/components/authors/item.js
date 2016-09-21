// these part of codes look really weird, but it works

import { Authors, Posts } from '/collections'

import { PostList } from './posts'

const Item = ({author}) => {

  const toggle = new ReactiveVar(false)

  const test = _.throttle(function () {
    toggle.set(!toggle.get())
  }, 1000)

  const _comp = ({show}) => <div>
    <h3>
      <button onClick={test}>{show ? 'hide posts' : 'show posts'}</button>
      <span>{author.name}</span>
    </h3>
    {show && <button onClick={() => Meteor.call('posts:random', author._id)}>add random posts</button>}
    {show && <PostList authorId={author._id} />}
  </div>

  const tracker = (props, onData) => {
    const show = toggle.get()
    onData(null, { show })
  }

  const comp = Container(tracker)(_comp)

  return new comp()

}

export default Item
