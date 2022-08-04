import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons'
import EmojiPicker, { IEmojiData } from 'emoji-picker-react'
import { faker } from '@faker-js/faker';

import './_styles.scss'
import { IComment } from '../../interfaces'

interface CommentInputProps {
    inputRef: React.RefObject<HTMLInputElement>
    onComment: (comment: IComment) => void
    className?: string
}

const CommentInput = ({className, inputRef, onComment}: CommentInputProps) => {

    const [text, setText] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const sendComment = () => {
        onComment({
            date: new Date(),
            text: text.trim(),
            user: {
                name: 'My Fake User',
                user: 'myfakeuser123',
                img: faker.image.avatar()
            }
        })

        setShowPicker(false)
        setText('')
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter')
            sendComment()
    }

    const handlePickEmoji = (e: React.MouseEvent, data: IEmojiData) => {
        setText(text + data.emoji)
    }

    return (
        <div className='comment-input-container'>
            {showPicker && <EmojiPicker onEmojiClick={handlePickEmoji} disableAutoFocus disableSearchBar/>}
            <div className={`comment-input ${className}`}>
                <FontAwesomeIcon icon={faSmileBeam} size='2x' onClick={() => setShowPicker(!showPicker)}/>
                <input 
                    ref={inputRef}
                    type="text"
                    placeholder='Add a comment...'
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                    value={text}
                    onClick={() => setShowPicker(false)}
                />
                <button disabled={!(text.length > 0)} onClick={sendComment}>
                    <strong>Post</strong>
                </button>
            </div>
        </div>
    )
}

export default CommentInput
