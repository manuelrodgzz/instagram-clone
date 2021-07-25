import React from 'react'
import Story from '../story'

import { IUser } from '../../interfaces'
import './_styles.scss'

interface StoriesProps {
    users: IUser[]
}

const Stories = ({users}: StoriesProps) => {

    return (
        <div className='stories'>
            { users.map(user => (
                user.stories.length > 0 && <Story key={user.name + user.user} user={user}/>
            )) }
        </div>
    )
}

export default Stories
