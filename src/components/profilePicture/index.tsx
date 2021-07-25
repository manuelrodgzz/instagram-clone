import React from 'react'
import { IUser } from '../../interfaces'
import './_styles.scss'

interface ProfilePicturesProps {
    user: IUser
    size?: 'sm' | 'md'
}

const ProfilePicture = ({user, size = 'sm'}: ProfilePicturesProps) => {

    return (
        <div className={`profile-picture ${size} ${user.stories ? (user.stories.every(story => story.seen) ? 'seen' : '') : 'seen'}`}>
            <img src={user.img}/>
        </div>
    )
}

export default ProfilePicture
