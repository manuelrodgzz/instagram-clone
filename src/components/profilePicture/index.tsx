import React, { useState } from 'react'
import { IUser } from '../../interfaces'
import './_styles.scss'

interface ProfilePicturesProps {
    user: IUser
    size?: 'sm' | 'md'
}

const ProfilePicture = ({user, size = 'sm'}: ProfilePicturesProps) => {
    const [loaded, setLoaded] = useState(false)

    const setImageLoaded = () => setLoaded(true)

    return (
        <div className={`profile-picture ${size} ${user.stories ? (user.stories.every(story => story.seen) ? 'seen' : '') : 'seen'} ${loaded ? 'loaded' : ''}`}>
            <img src={user.img} onLoad={setImageLoaded}/>
        </div>
    )
}

export default ProfilePicture
