import React from 'react'

export const RelatedLinks = (props) => {
    return (
        <div>
            <div className='related-card-item'>
                <img
                    src={props.imgUrl}
                    alt='link'
                    onError={({ currentTarget }) => {
                        currentTarget.src = 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                        currentTarget.onerror = null
                    }}
                />
                <p>{props.linkTitle}</p>
            </div>
        </div>
    )
}