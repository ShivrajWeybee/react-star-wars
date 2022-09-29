import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader';
import { FETCH_FILM_REUEST, FETCH_FILM_SUCCESS, FETCH_FILM_FAILURE } from '../../redux/types';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar';
import { fetchFilms } from './filmAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchSpecies } from '../Species/speciesAction'
import { fetchPlanets } from '../Planets/planetAction'
import { fetchVehicles } from '../Vehicles/vehicleAction'
import { fetchStarships } from '../Starships/starshipAction'

let filmId;

function FilmDetails(props) {

    const params = useParams()
    filmId = params.filmsId

    const rSpecies = useSelector(state => state.film.users.species)
    const dispatchSpecies = useDispatch()
    useEffect(() => {
        rSpecies?.forEach(specie => dispatchSpecies(fetchSpecies(specie.split('/').at(-2))))
    }, [rSpecies])

    const rPlanets = useSelector(state => state.film.users.planets)
    const dispatchPlanets = useDispatch()
    useEffect(() => {
        rPlanets?.forEach(planet => dispatchPlanets(fetchPlanets(planet.split('/').at(-2))))
    }, [rPlanets])

    const rVehicle = useSelector(state => state.film.users.vehicles)
    const dispatchVehicle = useDispatch()
    useEffect(() => {
        rVehicle?.forEach(v => dispatchVehicle(fetchVehicles(v.split('/').at(-2))))
    }, [rVehicle])

    const rStarships = useSelector(state => state.film.users.starships)
    const dispatchStarship = useDispatch()
    useEffect(() => {
        rStarships?.forEach(starship => dispatchStarship(fetchStarships(starship.split('/').at(-2))))
    }, [rStarships])

    const [data, setData] = useState({})
    const [chars, setChar] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [planets, setPlanets] = useState([])
    const [species, setSpecies] = useState([])

    useEffect(() => {
        props.fetchFilm()
    }, [])

    // useEffect(() => {
    //     axios
    //         .get(`https://swapi.dev/api/films/${filmId}`)
    //         .then(res => {
    //             setData(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [filmId])

    // useEffect(() => {
    //     data.characters && data.characters.forEach(element => {
    //         axios
    //             .get(element)
    //             .then(res => {
    //                 const imgId = res.data.url.split('/')
    //                 setChar(characters => [...characters, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}`, imgId: `${imgId[imgId.length - 2]}` }])
    //             })
    //             .catch(err => console.log(err))
    //     });
    // }, [data.characters])

    // useEffect(() => {
    //     data.vehicles && data.vehicles.forEach(element => {
    //         axios
    //             .get(element)
    //             .then(res => {
    //                 const imgId = res.data.url.split('/')
    //                 setVehicles(vehicles => [...vehicles, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}`, imgId: `${imgId[imgId.length - 2]}` }])
    //             })
    //             .catch(err => console.log(err))
    //     });
    // }, [data.vehicles])

    // useEffect(() => {
    //     data.starships && data.starships.forEach(element => {
    //         axios
    //             .get(element)
    //             .then(res => {
    //                 const imgId = res.data.url.split('/')
    //                 setStarships(starships => [...starships, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/starships/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
    //             })
    //             .catch(err => console.log(err))
    //     });
    // }, [data.starships])

    // useEffect(() => {
    //     data.species && data.species.forEach(element => {
    //         axios
    //             .get(element)
    //             .then(res => {
    //                 const imgId = res.data.url.split('/')
    //                 setSpecies(species => [...species, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/species/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
    //             })
    //             .catch(err => console.log(err))
    //     });
    // }, [data.species])

    // useEffect(() => {
    //     data.planets && data.planets.forEach(element => {
    //         axios
    //             .get(element)
    //             .then(res => {
    //                 const imgId = res.data.url.split('/')
    //                 setPlanets(planets => [...planets, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/planets/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
    //             })
    //             .catch(err => console.log(err))
    //     });
    // }, [data.planets])

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
            <NavigationBar />
            {
                props.FilmData.film.users.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.FilmData.film.users.title}</p>
                                <p>Date created - {props.FilmData.film.users.release_date}</p>
                                <p>Director - {props.FilmData.film.users.director}</p>
                                <p>Producer - {props.FilmData.film.users.producer}</p>
                                <p>Opening Crawl - {props.FilmData.film.users.opening_crawl}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent'>
                            <div className='carousel-parent'>
                                <h2>Related Characters</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.species.related ?
                                            <Slider {...settings}>
                                                {
                                                    props.FilmData.species.related && props.FilmData.species.related.map((char, index) =>
                                                        <Link key={index}
                                                            to={`/characters/${char.url.split('/').at(-2)}`}>
                                                            <RelatedLinks
                                                                imgUrl={`https://starwars-visualguide.com/assets/img/characters/${char.url.split('/').at(-2)}.jpg`}
                                                                linkTitle={char.name}
                                                            />
                                                        </Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Vehicles</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.vehicle.related ?
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
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Starships</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.starship.related ?
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
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Species</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.species.related ?
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
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related planets</h2>
                                <div className='releted-cards'>
                                    {
                                        props.FilmData.planet.related ?
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
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        FilmData: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilm: () => dispatch(fetchFilms(filmId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails)