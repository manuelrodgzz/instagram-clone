import React from 'react'
import { IUser } from '../../interfaces'
import ProfilePicture from '../profilePicture'
import './_styles.scss'

interface StoryProps {
    user: IUser
}

const Story = ({user}: StoryProps) => {

    return (
        <li className='story'>
            <ProfilePicture user={user} size='md'/>
            <div className='username'>
                {user.user}
            </div>
        </li>
    )
}

export default Story
