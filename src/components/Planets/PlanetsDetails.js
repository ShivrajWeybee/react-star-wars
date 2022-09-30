import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../Loader'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'
import { fetchPlanets } from './planetAction'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from '../Films/filmAction'

let planetId;

function PlanetsDetails(props) {
    const params = useParams()
    planetId = params.planetsId

    console.log(props.planetData)

    var settings = {
        className: "slider variable-width",
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 3,
        variableWidth: true
    };

    useEffect(() => {
        props.fetchPlanet()
    }, [])

    return (
        <div>
            {
                props.planetData.planet.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`} alt='planet' />
                            <div className='details_info'>
                                <p className='title'>{props.planetData.planet.users.name || 'unknown'}</p>
                                <p>{props.planetData.planet.users.population || 'unknown'}</p>
                                <p>{props.planetData.planet.users.rotation_period || 'unknown'} days</p>
                                <p>{props.planetData.planet.users.orbital_period || 'unknown'} days</p>
                                <p>{props.planetData.planet.users.diameter || 'unknown'} km</p>
                                <p>{props.planetData.planet.users.gravity || 'unknown'}</p>
                                <p>{props.planetData.planet.users.terrain || 'unknown'}</p>
                                <p>{props.planetData.planet.users.surface_water || 'unknown'}%</p>
                                <p>{props.planetData.planet.users.climate || 'unknown'}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Films</h2>
                                <div className='releted-cards'>
                                    {

                                        props.planetData.film.loading ? <Loader /> :
                                            props.planetData.film.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.planetData.film.related && props.planetData.film.related.map((film, index) =>
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
                                <h2>Related Residents</h2>
                                <div className='releted-cards'>
                                    {
                                        props.planetData.film.loading ? <Loader /> :
                                            props.planetData.film.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.planetData.film.related && props.planetData.film.related.map((film, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/films/${film.url.split('/').at(-2)}`}
                                                            >
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/characters/${film.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={film.title}
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        planetData: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPlanet: () => dispatch(fetchPlanets(planetId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsDetails)