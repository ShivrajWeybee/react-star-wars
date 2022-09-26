import React from 'react'

export const StarshipsLink = ({ starshipId }) => {
    const imgId = starshipId.url.split('/')
    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/starships/${imgId[imgId.length - 2]}.jpg`} alt='starship' />
            </div>
            <div className='char-link_card_info'>
                <p>{starshipId.name}</p>
            </div>
        </div>
    )
}
