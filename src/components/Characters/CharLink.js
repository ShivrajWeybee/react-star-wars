import React from 'react'

export const CharLink = ({charId}) => {

    const imgId = charId.url.split('/')

    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length-2]}.jpg`} alt='character' />
            </div>
            <div className='char-link_card_info'>
                <p>{charId.name}</p>
            </div>
        </div>
    )
}