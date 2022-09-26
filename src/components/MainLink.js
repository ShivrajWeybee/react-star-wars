import React from 'react'

export const MainLink = ({imgURL, linkName}) => {
    return (
        <div className='main-link'>
            <div className='main-link_img-container'>
                <img src={imgURL} alt='link' />
            </div>
            <div className='main-link_info'>
                <p>{linkName}</p>
            </div>
        </div>
    )
}