import React from 'react'

export const FilmLink = ({filmId}) => {

    const imgId = filmId.url.split('/')

    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/films/${imgId[imgId.length-2]}.jpg`} alt='Film' />
            </div>
            <div className='char-link_card_info'>
                <p>{filmId.title}</p>
            </div>
        </div>
    )
}