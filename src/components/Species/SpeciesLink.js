import React from 'react'

export const SpeciesLink = ({ speciesId }) => {
    const imgId = speciesId.url.split('/')
    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/species/${imgId[imgId.length - 2]}.jpg`} alt='character' />
            </div>
            <div className='char-link_card_info'>
                <p>{speciesId.name}</p>
            </div>
        </div>
    )
}
