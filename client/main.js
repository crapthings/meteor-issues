import React from 'react'

import ReactDOM from 'react-dom'

import { observable } from 'mobx'

import { observer } from 'mobx-react'

import DevTools from 'mobx-react-devtools'

import functional from 'react-functional'

// model = observable({
//   posts: []
// })

model = {
  @observable posts: []
}

model.add = function () {
  Posts.insert({
    title: faker.lorem.sentence(),
    createdAt: new Date()
  })
}

const List = observer(({model}) => <div>
  <button onClick={model.add}>add</button>
  <button onClick={() => Meteor.call('posts:empty')}>remove all</button>
  <h3>posts {model.posts.length}</h3>
  {model.posts.map(post => <Item key={post._id} post={post} />)}
</div>)

// const Item = observer(({post}) => <p>
//   {console.log(post._id, new Date())}
//   <Span ctx={post.title} id={post._id} />
// </p>)

// const Span = observer(({ctx, id}) => <span onClick={() => Meteor.call('posts:update', id)}>{ctx}</span>)

@observer
class Item extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    // console.log(nextProps.post.title, this.props.post.title)
    return nextProps.post.title !== this.props.post.title
    // return true
  }

  render () {
    return <p>
      {console.log(new Date().getTime())}
      <span onClick={() => Meteor.call('posts:update', this.props.post._id)}>{this.props.post.title}</span>
    </p>
  }
}

const App = () => <div>
  <DevTools />
  <List model={model} />
</div>

Meteor.startup(function () {
  const welcome = ReactDOM.render(App(), document.getElementById('container'))
})

Meteor.autorun(function() {

  const posts = Posts.find({}, {
    sort: {
      createdAt: -1
    }
  }).fetch()

  model.posts = posts

})
