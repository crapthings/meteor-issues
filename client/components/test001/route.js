FlowRouter.route('/test001', {
  action () {
    Mount(Components.App, {
      content: () => <Components.Test001 />
    })
  }
})
