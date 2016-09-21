Meteor.startup(defer)

function defer () {
  Meteor.defer(init)
}

function init () {
  const container = document.getElementById('container')
  Render(Components.App(), container)
}
