// it doesn't work well, whats wrong ?

DDPRateLimiter.addRule({
  type: 'subscription',
  name: 'postsByAuthorId'
}, 1, 300)
