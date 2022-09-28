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
import { connect } from 'react-redux';

let filmId;

function FilmDetails(props) {

    const params = useParams()
    filmId = params.filmsId
    const [data, setData] = useState({})
    const [chars, setChar] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [planets, setPlanets] = useState([])
    const [species, setSpecies] = useState([])

    useEffect(() => {
        props.fetchFilm()
    })

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/films/${filmId}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [filmId])

    useEffect(() => {
        data.characters && data.characters.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setChar(characters => [...characters, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.characters])

    useEffect(() => {
        data.vehicles && data.vehicles.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setVehicles(vehicles => [...vehicles, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.vehicles])

    useEffect(() => {
        data.starships && data.starships.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setStarships(starships => [...starships, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/starships/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.starships])

    useEffect(() => {
        data.species && data.species.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setSpecies(species => [...species, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/species/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.species])

    useEffect(() => {
        data.planets && data.planets.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setPlanets(planets => [...planets, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/planets/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.planets])

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
                props.FilmData.users.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.FilmData.users.title}</p>
                                <p>Date created - {props.FilmData.users.release_date}</p>
                                <p>Director - {props.FilmData.users.director}</p>
                                <p>Producer - {props.FilmData.users.producer}</p>
                                <p>Opening Crawl - {props.FilmData.users.opening_crawl}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent'>
                            <div className='carousel-parent'>
                                <h2>Related Characters</h2>
                                <div className='releted-cards'>
                                    {
                                        chars.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    chars.map((char, index) => { return (<Link key={index} to={`/characters/${char.imgId}`}><RelatedLinks imgUrl={char.imgUrl} linkTitle={char.title} /></Link>) })
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Vehicles</h2>
                                <div className='releted-cards'>
                                    {
                                        vehicles.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    vehicles.map(vehicle => <Link to={`/vehicles/${vehicle.imgId}`}><RelatedLinks key={vehicles[vehicle]} imgUrl={vehicle.imgUrl} linkTitle={vehicle.title} /></Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Starships</h2>
                                <div className='releted-cards'>
                                    {
                                        starships.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    starships.map(starship => <Link to={`/starships/${starship.imgId}`}><RelatedLinks key={starships[starship]} imgUrl={starship.imgUrl} linkTitle={starship.title} /></Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Species</h2>
                                <div className='releted-cards'>
                                    {
                                        species.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    species.map(specie => <Link to={`/species/${specie.imgId}`}><RelatedLinks key={species[specie]} imgUrl={specie.imgUrl} linkTitle={specie.title} /></Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related planets</h2>
                                <div className='releted-cards'>
                                    {
                                        planets.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    planets.map(planet => <Link to={`/planets/${planet.imgId}`}><RelatedLinks key={planets[planet]} imgUrl={planet.imgUrl} linkTitle={planet.title} /></Link>)
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
        FilmData: state.film
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilm: () => dispatch(fetchFilms(filmId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails)