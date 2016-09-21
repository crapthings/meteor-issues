FlowRouter.route('/authors', {
  action () {
    Mount(Components.App, {
      content: () => <Components.Authors />
    })
  }
})
