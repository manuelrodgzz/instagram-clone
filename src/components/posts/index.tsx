import React from 'react'
import { IUser } from '../../interfaces'
import Post from '../post'
import './_styles.scss'

interface PostsProps {
    users: IUser[]
}

const Posts = ({users}: PostsProps) => {

    return (
        <div className='posts'>
            {users.map(user => (
                user.posts && user.posts.length > 0 && user.posts.map(post => (
                    <Post key={user.user + String(post.likes)} post={post} user={user}/>
                ))
            ))}
        </div>
    )
}

export default Posts
