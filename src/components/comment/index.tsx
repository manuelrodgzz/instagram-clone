import React from 'react'
import { IUser } from '../../interfaces'

interface CommentProps {
    user: IUser,
    comment: string
}

const Comment = ({user, comment}: CommentProps) => {

    return (
        <div className="line">
        <strong>{user.user} &nbsp;</strong>
        
        <span>{comment}</span>
    </div>
    )
}

export default Comment
