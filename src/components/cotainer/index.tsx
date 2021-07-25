import React from 'react'
import './_styles.scss'

interface ContainerProps {
    children?: any
}

const Container = ({children}: ContainerProps) => {

    return (
        <div className='container'>
            {children}
        </div>
    )
}

export default Container
