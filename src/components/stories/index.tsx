import React, { useRef, useState } from 'react'
import Story from '../story'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import scrollTo from 'animated-scroll-to'

import { IUser } from '../../interfaces'
import './_styles.scss'

interface ArrowProps {
    type: 'left' | 'right'
    onClick: () => void
}

const Arrow = ({type, onClick}: ArrowProps) => {

    return (
        <div onClick={onClick} className={`arrow-${type}`}>
            <FontAwesomeIcon icon={type === 'right' ? faChevronRight : faChevronLeft}/>
        </div>
    )
}

interface StoriesProps {
    users: IUser[]
}

const Stories = ({users}: StoriesProps) => {

    const scrollableDiv = useRef<HTMLDivElement>(null)
    const [leftArrow, setLeftArrow] = useState(false)
    const [rightArrow, setRightArrow] = useState(true)

    const scroll = async (direction: 'forward' | 'backward') => {
        if(!scrollableDiv.current) return

        const offsetWidth = scrollableDiv.current.offsetWidth
        const scrollWidth = scrollableDiv.current.scrollWidth
        const pixelsScrolled = scrollableDiv.current.scrollLeft
        const pixelsAvailableToScroll = scrollWidth - pixelsScrolled
        let positionToScroll = (pixelsAvailableToScroll < offsetWidth 
            ? pixelsAvailableToScroll 
            : (direction === 'forward') ? pixelsScrolled + offsetWidth : pixelsScrolled - offsetWidth)

        await scrollTo(
            [positionToScroll, 0], 
            {
                elementToScroll: scrollableDiv.current,
                speed: 1800
            }
        )
    }

    const handleStoriesScroll = () => {
        const scrollPosition = scrollableDiv.current?.scrollLeft
        const offsetWidth = scrollableDiv.current?.offsetWidth
        const scrollWidth = scrollableDiv.current?.scrollWidth

        if(!scrollPosition || !offsetWidth || !scrollWidth ) return

        if(scrollPosition < 50)
            setLeftArrow(false)
        else
            setLeftArrow(true)

        if(scrollPosition + offsetWidth > scrollWidth - 50)
            setRightArrow(false)
        else
            setRightArrow(true)
    }

    return (
        <div className='stories'>
            {leftArrow && <Arrow type={'left'} onClick={() => scroll('backward')}/>}
            <div ref={scrollableDiv} onScroll={handleStoriesScroll}>
                <ul>
                    { users.map(user => (
                        user.stories && user.stories.length > 0 && <Story key={user.name + user.user} user={user}/>
                    )) }
                </ul>
            </div>
            {rightArrow && <Arrow type={'right'} onClick={() => scroll('forward')}/>}
        </div>
    )
}

export default Stories
