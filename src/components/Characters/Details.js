import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'
import { connect, useDispatch, useSelector } from 'react-redux'
import { FETCH_CHAR_FAILURE, FETCH_CHAR_REUEST, FETCH_CHAR_SUCCESS } from "../../redux/types"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'
import { fetchUsers } from './charAction'
import { fetchFilms } from '../Films/filmAction'
import { fetchVehicles } from '../Vehicles/vehicleAction'
import { fetchStarships } from '../Starships/starshipAction'

let charId;

function Details(props) {

    const params = useParams()
    charId = params.charactersId

    // const character = useSelector(state => state.char)
    // const dispatchChar = useDispatch()
    // useEffect(() => {
    //     dispatchChar(fetchUsers(charId))
    // }, [charId])

    const rfilms = useSelector(state => state.char.users.films)
    const dispatchFilm = useDispatch()
    useEffect(() => {
        rfilms?.forEach(film => dispatchFilm(fetchFilms(film.split('/').at(-2))))
    }, [rfilms])

    const rVehicle = useSelector(state => state.char.users.vehicles)
    const dispatchVehicle = useDispatch()
    useEffect(() => {
        rVehicle?.forEach(v => dispatchVehicle(fetchVehicles(v.split('/').at(-2))))
    }, [rVehicle])

    const rStarships = useSelector(state => state.char.users.starships)
    const dispatchStarship = useDispatch()
    useEffect(() => {
        rStarships?.forEach(starship => dispatchStarship(fetchStarships(starship.split('/').at(-2))))
    }, [rStarships])

    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [homeworld, setHomeworld] = useState('')
    const [species, setSpecies] = useState('')

    // useEffect(() => {
    //     axios
    //         .get(`https://swapi.dev/api/people/${charId}`)
    //         .then(res => {
    //             setData(res.data);
    //             return res.data
    //         })
    //         .then(data => {
    //             console.log(data.films);
    //             data.films.forEach(element => {
    //                 axios
    //                     .get(element)
    //                     .then(res => {
    //                         const imgId = res.data.url.split('/')
    //                         setFilms(films => [...films, { title: res.data.title, imgUrl: `https://starwars-visualguide.com/assets/img/films/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
    //                     })
    //                     .catch(err => console.log(err))
    //             });
    //             data.vehicles.forEach(element => {
    //                 axios
    //                     .get(element)
    //                     .then(res => {
    //                         const imgId = res.data.url.split('/')
    //                         setVehicles(vehicles => [...vehicles, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
    //                     })
    //                     .catch(err => console.log(err))
    //             });
    //             data.starships.forEach(element => {
    //                 axios
    //                     .get(element)
    //                     .then(res => {
    //                         const imgId = res.data.url.split('/')
    //                         setStarships(starships => [...starships, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/starships/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
    //                     })
    //                     .catch(err => console.log(err))
    //             });
    //             console.log(data.homeworld);
    //             axios
    //                 .get(data.homeworld)
    //                 .then(res => setHomeworld(res.data.name))
    //                 .catch(err => console.log(err))

    //             data.species && axios
    //                 .get(data.species)
    //                 .then(res => setSpecies(res.data.name))
    //                 .catch(err => console.log(err))
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [])

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
                                {/* <p>{rrFilms ? rrFilms : 1}</p> */}
                                <p className='title'>{props.charData.char.users.name}</p>
                                <p>Birthyear: {props.charData.char.users.birth_year}</p>
                                <p>Species: {props.charData.char.users.species}</p>
                                {/* <p>{props.charData.char.users.name}</p> */}
                                <p>Height: {props.charData.char.users.height} cm</p>
                                <p>Mass: {props.charData.char.users.mass} kg</p>
                                <p>Gender: {props.charData.char.users.gender}</p>
                                <p>Hair color: {props.charData.char.users.hair_color}</p>
                                <p>Skin color: {props.charData.char.users.skin_color}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Films</h2>
                                <div className='releted-cards'>
                                    {
                                        props.charData.film.related ?
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
                                            : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Vehicles</h2>
                                <div className='releted-cards'>
                                    {
                                        props.charData.vehicle.related ?
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
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Starships</h2>
                                <div className='releted-cards'>
                                    {
                                        props.charData.starship.related ?
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
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div >
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        charData: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchChar: () => dispatch(fetchUsers(charId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)