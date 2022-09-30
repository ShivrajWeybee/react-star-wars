import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'
import { connect } from 'react-redux'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchUsers } from './charAction'

let charId;

function Details(props) {

    const params = useParams()
    charId = params.charactersId

    useEffect(() => {
        props.fetchChar()
    }, [])

    var settings = {
        className: "slider variable-width",
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 3,
        variableWidth: true
    };

    return (
        <div>
            {
                props.charData.char.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${charId}.jpg`} alt='character' />
                            <div className='details_info'>
                                <p className='title'>{props.charData.char.users.name || 'unknown'}</p>
                                <p>Birthyear: {props.charData.char.users.birth_year || 'unknown'}</p>
                                <p>Species: {props.charData.char.users.species || 'unknown'}</p>
                                <p>Height: {props.charData.char.users.height || 'unknown'} cm</p>
                                <p>Mass: {props.charData.char.users.mass || 'unknown'} kg</p>
                                <p>Gender: {props.charData.char.users.gende || 'unknown'}</p>
                                <p>Hair color: {props.charData.char.users.hair_color || 'unknown'}</p>
                                <p>Skin color: {props.charData.char.users.skin_color || 'unknown'}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Films</h2>
                                <div className='releted-cards'>
                                    {
                                        props.charData.film.loading ? <Loader /> :
                                            props.charData.film.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.charData.film.related && props.charData.film.related.map((film, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/films/${film.url.split('/').at(-2)}`}
                                                            >
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/films/${film.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={film.title}
                                                                />
                                                            </Link>)
                                                    }
                                                </Slider>

                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Vehicles</h2>
                                <div className='releted-cards'>
                                    {
                                        props.charData.vehicle.loading ? <Loader /> :
                                            props.charData.vehicle.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.charData.vehicle.related && props.charData.vehicle.related.map((vehicle, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/vehicles/${vehicle.url.split('/').at(-2)}`}
                                                            >
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={vehicle.name}
                                                                />
                                                            </Link>)
                                                    }
                                                </Slider>
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Starships</h2>
                                <div className='releted-cards'>
                                    {
                                        props.charData.starship.loading ? <Loader /> :
                                            props.charData.starship.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.charData.starship.related && props.charData.starship.related.map((starship, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/starships/${starship.url.split('/').at(-2)}`}
                                                            >
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/starships/${starship.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={starship.name}
                                                                />
                                                            </Link>)
                                                    }
                                                </Slider>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        charData: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchChar: () => dispatch(fetchUsers(charId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)