import React, { useState } from 'react'
import { IPost, IUser } from '../../interfaces'
import ProfilePicture from '../profilePicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faBookmark } from '@fortawesome/free-regular-svg-icons'
import './_styles.scss'
import Comment from '../comment'

interface PostContainerProps {
    children?: any
}

const PostContainer = ({children}: PostContainerProps) => {

    return (
        <div className='post-container'>
            {children}
        </div>
    )
}

interface PostProps {
    post: IPost,
    user: IUser
}

const Post = ({post, user}: PostProps) => {

    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    const lastComments = post.comments.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 2)

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

            {/* User and picture location */}
            <PostContainer>
                <div className='head'>
                    <ProfilePicture user={user} size='sm'/>

                    <div className='details'>
                        <strong>{user.user}</strong>
                        <span>{post.location}</span>
                    </div>

                    <FontAwesomeIcon icon={faEllipsisH}/>
                </div>
            </PostContainer>

            {/* Picture */}
            <img 
                src={post.picture} 
                onDoubleClick={() => setLiked(!liked)}
            />

            <PostContainer>    
                <div className='actions'>

                    {/* Like, comment and share */}
                    <div className="primary">
                        <FontAwesomeIcon 
                            icon={liked ? faHeartSolid : faHeart} 
                            className={liked ? 'liked' : ''} 
                            size='2x' 
                            onClick={() => setLiked(!liked)}
                        />
                        <FontAwesomeIcon icon={faComment} size='2x'/>
                        <FontAwesomeIcon icon={faPaperPlane} size='2x'/>
                    </div>

                    {/* Bookmark */}
                    <div className="secondary">
                        <FontAwesomeIcon 
                            icon={bookmarked ? faBookmarkSolid : faBookmark} 
                            size='2x'
                            className={bookmarked ? 'bookmarked' : ''}
                            onClick={() => setBookmarked(!bookmarked)}
                        />
                    </div>
                </div>

                {/* Likes */}
                <div className='line'>
                    <strong>{new Intl.NumberFormat().format(post.likes)} likes</strong>
                </div>

                {/* Post description */}
                <Comment user={user} comment={post.description}/>

                {/* View all comments */}
                {
                    post.comments.length > 2 && (
                        <div className="line text-dark-grey">
                            View all {post.comments.length} comments
                        </div>
                    )
                }

                {/* Last comments */}
                {
                    lastComments.map(comment => (
                        <Comment key={comment.user + comment.date.toString()} user={comment.user} comment={comment.text}/>
                    ))
                }

                {/* Post published time */}
                <div className="text-dark-grey">
                    {getTime()} ago
                </div>
            </PostContainer>

        </div>
    )
}

export default Post
