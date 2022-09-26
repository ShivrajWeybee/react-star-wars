import React from 'react'

import { NavLink } from 'react-router-dom'
import { MainLink } from './MainLink'

export const Home = () => {
    return (
        <div className='home flex'>
            {/* <img className='home_logo' src='https://freepngimg.com/thumb/star_wars/22994-5-star-wars-logo-image.png' alt='logo' /> */}
            <nav>
                <NavLink className="home_links" to="/character">{<MainLink imgURL='https://starwars-visualguide.com/assets/img/categories/character.jpg' linkName='Characters' />}</NavLink>
                <NavLink className="home_links" to="/films">{<MainLink imgURL='https://starwars-visualguide.com/assets/img/categories/films.jpg' linkName='Films' />}</NavLink>
                <NavLink className="home_links" to="/species">{<MainLink imgURL='https://starwars-visualguide.com/assets/img/categories/species.jpg' linkName='Species' />}</NavLink>
                <NavLink className="home_links" to="/starships">{<MainLink imgURL='https://starwars-visualguide.com/assets/img/categories/starships.jpg' linkName='Starships' />}</NavLink>
                <NavLink className="home_links" to="/vehicles">{<MainLink imgURL='https://starwars-visualguide.com/assets/img/categories/vehicles.jpg' linkName='Vehicles' />}</NavLink>
                <NavLink className="home_links" to="/planets">{<MainLink imgURL='https://starwars-visualguide.com/assets/img/categories/planets.jpg' linkName='Planets' />}</NavLink>
            </nav>
        </div>
    )
}