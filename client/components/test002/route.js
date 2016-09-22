FlowRouter.route('/test002', {
  action () {
    Mount(Components.App, {
      content: () => <Components.Test002 />
    })
  }
})
