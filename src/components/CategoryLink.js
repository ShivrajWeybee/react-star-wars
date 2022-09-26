import React from 'react'

export const CategoryLink = ({ category, categoryId }) => {
    const imgId = categoryId.url.split('/')
    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/${category}/${imgId[imgId.length - 2]}.jpg`} alt={`${category}`} />
            </div>
            <div className='char-link_card_info'>
                <p>
                    {
                        category==='films' ? category.title : categoryId.name
                    }
                </p>
            </div>
        </div>
    )
}
