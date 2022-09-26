import React from 'react'

export const VehiclesLink = ({ vehicleId }) => {
    const imgId = vehicleId.url.split('/')
    return (
        <div className='char-link_card'>
            <div className='char-link_img-container'>
                <img src={`https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`} alt='vehicle' />
            </div>
            <div className='char-link_card_info'>
                <p>{vehicleId.name}</p>
            </div>
        </div>
    )
}
