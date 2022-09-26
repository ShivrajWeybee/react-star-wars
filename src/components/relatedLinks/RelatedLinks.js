import React from 'react'

export const RelatedLinks = (props) => {
    return (
        <div>
            <div className='related-card-item'>
                <img src={props.imgUrl} alt='link' />
                <p>{props.linkTitle}</p>
            </div>
        </div>
    )
}