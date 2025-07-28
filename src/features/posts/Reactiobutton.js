import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postSlice'



const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffea: '☕'
}


const Reactiobutton = ({post}) => {
        const dispatch = useDispatch()

        const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    dispatch(reactionAdded({ postId: post.id, reaction: name }))
                }
            >
            {emoji} {post.reactions?.[name] ?? 0}
            </button>
        )
    })

  return (
    <div>{reactionButtons}</div>
  )
}

export default Reactiobutton