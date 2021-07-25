import React, { useRef, useState } from 'react'
import { IComment, IPost, IUser } from '../../interfaces'
import ProfilePicture from '../profilePicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faBookmark } from '@fortawesome/free-regular-svg-icons'
import Comment from '../comment'
import CommentInput from '../commentInput'
import './_styles.scss'

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

const Post = (props: PostProps) => {

    const [post, setPost] = useState(props.post)
    const [showAllComments, setShowAllComments] = useState(false)
    const [newComments, setNewComments] = useState<IComment[]>([])
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

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
    const handleLike = () => {
        if(liked) {
            setPost({
                ...post,
                likes: post.likes - 1
            })

            setLiked(false)
        }
        else {
            setPost({
                ...post,
                likes: post.likes + 1
            })

            setLiked(true)
        }
    }

    const handleNewComment = (comment: IComment) => {
        setNewComments([...newComments, comment])
    }

    return (
        <div className='post'>

            {/* User and picture location */}
            <PostContainer>
                <div className='head'>
                    <ProfilePicture user={props.user} size='sm'/>

                    <div className='details'>
                        <strong>{props.user.user}</strong>
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
                            onClick={handleLike}
                        />
                        <FontAwesomeIcon 
                            icon={faComment} 
                            size='2x' 
                            onClick={() => inputRef.current?.focus()}
                        />
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
                <Comment user={props.user} comment={post.description}/>

                {/* Line to separate description from comments */}
                {(showAllComments || post.comments.length <= 2) && <hr />}

                {/* View all comments */}
                {
                    showAllComments 
                        ? post.comments.map(comment => (
                            <Comment key={comment.user + comment.date.toString()} user={comment.user} comment={comment.text}/>
                        ))
                        : post.comments.length > 2 && (
                        <div className="view-comments line text-dark-grey" onClick={() => setShowAllComments(true)}>
                            View all {post.comments.length} comments
                        </div>
                    )
                }

                {/* Last comments */}
                {
                    !showAllComments && lastComments.map(comment => (
                        <Comment key={comment.user + comment.date.toString()} user={comment.user} comment={comment.text}/>
                    ))
                }

                {/* New comments */}
                {
                    newComments.map(comment => (
                        <Comment key={comment.user + comment.date.toString()} user={comment.user} comment={comment.text}/>
                    ))
                }

                {/* Post published time */}
                <div className="text-dark-grey">
                    {getTime()} ago
                </div>

                <CommentInput inputRef={inputRef} className='line' onComment={handleNewComment}/>
            </PostContainer>

        </div>
    )
}

export default Post
