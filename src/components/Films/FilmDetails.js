import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar';
import { fetchFilms } from './filmAction';
import { connect } from 'react-redux';

let filmId;

function FilmDetails(props) {

    const params = useParams()
    filmId = params.filmsId

    useEffect(() => {
        props.fetchFilm()
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
                props.FilmData.film.users.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.FilmData.film.users.title || 'unknown'}</p>
                                <p>Date created - {props.FilmData.film.users.release_date || 'unknown'}</p>
                                <p>Director - {props.FilmData.film.users.director || 'unknown'}</p>
                                <p>Producer - {props.FilmData.film.users.producer || 'unknown'}</p>
                                <p>Opening Crawl - {props.FilmData.film.users.opening_crawl || 'unknown'}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent'>
                            <div className='carousel-parent'>
                                <h2>Related Characters</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.char.loading ? <Loader /> :
                                            props.FilmData.char.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.FilmData.char.related && props.FilmData.char.related.map((char, index) =>
                                                            <Link key={index}
                                                                to={`/characters/${char.url.split('/').at(-2)}`}>
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/characters/${char.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={char.name}
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
                                        props.FilmData.vehicle.loading ? <Loader /> :
                                            props.FilmData.vehicle.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.FilmData.vehicle.related && props.FilmData.vehicle.related.map((vehicle, index) =>
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
                                        props.FilmData.starship.loading ? <Loader /> :
                                            props.FilmData.starship.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.FilmData.starship.related && props.FilmData.starship.related.map((starship, index) =>
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
                            <div className='carousel-parent'>
                                <h2>Related Species</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.species.loading ? <Loader /> :
                                            props.FilmData.species.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.FilmData.species.related && props.FilmData.species.related.map((specie, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/species/${specie.url.split('/').at(-2)}`}
                                                            >
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/species/${specie.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={specie.name}
                                                                />
                                                            </Link>)
                                                    }
                                                </Slider>
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related planets</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.planet.loading ? <Loader /> :
                                            props.FilmData.planet.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.FilmData.planet.related && props.FilmData.planet.related.map((planet, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/planets/${planet.url.split('/').at(-2)}`}>
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/planets/${planet.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={planet.name}
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
        FilmData: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFilm: () => dispatch(fetchFilms(filmId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails)