import React from 'react'
import { IPost, IUser } from '../../interfaces'
import ProfilePicture from '../profilePicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faBookmark } from '@fortawesome/free-regular-svg-icons'
import './_styles.scss'
import Container from '../cotainer'
import Comment from '../comment'

interface PostProps {
    post: IPost,
    user: IUser
}

const Post = ({post, user}: PostProps) => {

    const lastComments = post.comments.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 2)
    console.log(post.comments.sort((a, b) =>  b.date.getTime() - a.date.getTime()))

    const getTime = () => {
        const diffTime = new Date().getTime() - post.date.getTime()
        const diffSeconds = diffTime / 1000
        const diffMinutes = diffSeconds / 60
        const diffHours = diffMinutes / 60
        const diffDays = diffHours / 24

        if(diffMinutes < 1)
            return `${Math.floor(diffSeconds)} seconds`

        if(diffHours < 1)
            return `${Math.floor(diffMinutes)} minutes`

        if(diffDays < 1)
            return `${Math.floor(diffHours)} hours`

        return `${Math.floor(diffDays)} days`
    }

    return (
        <div className='post'>
            <Container>
                <div className='head'>
                    <ProfilePicture user={user} size='sm'/>

                    <div className='details'>
                        <strong>{user.user}</strong>
                        <span>{post.location}</span>
                    </div>

                    <FontAwesomeIcon icon={faEllipsisH}/>
                </div>
            </Container>

            <img src={post.picture} />

            <Container>    
                <div className='actions'>

                    <div className="primary">
                        <FontAwesomeIcon icon={faHeart} size='2x'/>
                        <FontAwesomeIcon icon={faComment} size='2x'/>
                        <FontAwesomeIcon icon={faPaperPlane} size='2x'/>
                    </div>

                    <div className="secondary">
                        <FontAwesomeIcon icon={faBookmark} size='2x'/>
                    </div>
                </div>

                <div className='line'>
                    <strong>{new Intl.NumberFormat().format(post.likes)} likes</strong>
                </div>

                <Comment user={user} comment={post.description}/>

                {
                    post.comments.length > 2 && (
                        <div className="line text-dark-grey">
                            View all {post.comments.length} comments
                        </div>
                    )
                }

                {
                    lastComments.map(comment => (
                        <Comment key={comment.user + comment.date.toString()} user={comment.user} comment={comment.text}/>
                    ))
                }

                <div className="text-dark-grey">
                    {getTime()} ago
                </div>
            </Container>

        </div>
    )
}

export default Post
