import React from 'react'

export const PlanetsLink = ({ planetId }) => {
    const imgId = planetId.url.split('/')
    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/planets/${imgId[imgId.length - 2]}.jpg`} alt='character' />
            </div>
            <div className='char-link_card_info'>
                <p>{planetId.name}</p>
            </div>
        </div>
    )
}
