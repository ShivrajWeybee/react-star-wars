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
                        currentTarget.src = 'https://bookmychefs.com/uploads/dish/default_food.jpg'
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