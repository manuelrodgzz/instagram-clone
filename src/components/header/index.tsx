import React from 'react'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCompass, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import './_styles.scss'

const Header = () => {

    return (
        <nav className='header'>
            <div>
                <img className='logo' src={logo}/>
            </div>

            <div className='icons-container'>
                <FontAwesomeIcon icon={faHome} size='lg'/>
                <FontAwesomeIcon icon={faFacebookMessenger} size='lg'/>
                <FontAwesomeIcon icon={faCompass} size='lg'/>
                <FontAwesomeIcon icon={faHeart} size='lg'/>
                <img className='user' src='https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'/>
            </div>

        </nav>
    )
}

export default Header
