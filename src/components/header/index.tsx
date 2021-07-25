import React from 'react'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faCompass, faHeart, faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import './_styles.scss'

const Header = () => {

    const navIcons = [faHome, faFacebookMessenger, faCompass, faHeart, faUserCircle]

    return (
        <nav className='header'>
            <div>
                <div>
                    <img className='logo' src={logo}/>
                </div>

                <div className='icons-container'>
                    {
                        navIcons.map((icon, index) => <FontAwesomeIcon key={`head-icon-${index}`} icon={icon} size='2x'/>)
                    }
                </div>
            </div>

        </nav>
    )
}

export default Header
