FlowRouter.route('/', {
  action () {
    Mount(Components.App, {
      content: () => <Components.Posts />
    })
  }
})
