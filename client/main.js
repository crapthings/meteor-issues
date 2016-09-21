import { Router, Route, Link, browserHistory } from 'inferno-router'

Meteor.startup(defer)

function defer () {
  Meteor.defer(init)
}

function init () {
  const container = document.getElementById('container')
  console.log(1)
  Render(<div>h</div>
  , container)
}
