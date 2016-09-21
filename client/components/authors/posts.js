import { Posts } from '/collections'

const comp = ({ authorId, posts }) => <div>
	{posts.length ? posts.map(post => <p key={post._id}>
		{post.title}
	</p>) : <p>nothing</p>}
</div>

function tracker(props, onData) {

	const { authorId } = props

	const ready = _.every([
		Meteor.subscribe('postsByAuthorId', authorId).ready(),
	])

	const posts = Posts.find({
      authorId
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch()

	ready && onData(null, { posts })
}

export const PostList = Container(tracker)(comp)
