import React from 'react'

export const CharLink = ({ charId, type }) => {

    const imgId = charId.url.split('/')

    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img
                    src={`https://starwars-visualguide.com/assets/img/${type}/${imgId[imgId.length - 2]}.jpg`}
                    alt='character'
                    onError={({ currentTarget }) => {
                        currentTarget.src = 'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                        currentTarget.onerror = null
                    }}
                />
            </div>
            <div className='char-link_card_info'>
                <p>{type === 'films' ? charId.title : charId.name}</p>
            </div>
        </div>
    )
}