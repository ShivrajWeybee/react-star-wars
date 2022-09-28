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

let charId;

function Details(props) {

    const params = useParams()
    charId = params.charactersId

    // const character = useSelector(state => state.char)
    // const dispatchChar = useDispatch()
    // useEffect(() => {
    //     dispatchChar(fetchUsers(charId))
    // }, [charId])

    // const films = useSelector(state => state.film)
    // const dispatchFilm = useDispatch()
    // useEffect(() => {
    //     dispatchFilm(fetchFilms())
    // })

    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [homeworld, setHomeworld] = useState('')
    const [species, setSpecies] = useState('')

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people/${charId}`)
            .then(res => {
                setData(res.data);
                return res.data
            })
            .then(data => {
                console.log(data.films);
                data.films.forEach(element => {
                    axios
                        .get(element)
                        .then(res => {
                            const imgId = res.data.url.split('/')
                            setFilms(films => [...films, { title: res.data.title, imgUrl: `https://starwars-visualguide.com/assets/img/films/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                        })
                        .catch(err => console.log(err))
                });
                data.vehicles.forEach(element => {
                    axios
                        .get(element)
                        .then(res => {
                            const imgId = res.data.url.split('/')
                            setVehicles(vehicles => [...vehicles, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                        })
                        .catch(err => console.log(err))
                });
                data.starships.forEach(element => {
                    axios
                        .get(element)
                        .then(res => {
                            const imgId = res.data.url.split('/')
                            setStarships(starships => [...starships, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/starships/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                        })
                        .catch(err => console.log(err))
                });
                console.log(data.homeworld);
                axios
                    .get(data.homeworld)
                    .then(res => setHomeworld(res.data.name))
                    .catch(err => console.log(err))

                data.species && axios
                    .get(data.species)
                    .then(res => setSpecies(res.data.name))
                    .catch(err => console.log(err))
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

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
            <NavigationBar />
            {
                props.charData.char.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${charId}.jpg`} alt='character' />
                            <div className='details_info'>
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
                                        films.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    films && films.map(film => <Link to={`/films/${film.imgId}`} ><RelatedLinks key={films[film]} imgUrl={film.imgUrl} linkTitle={film.title} /></Link>)
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
                                                    vehicles && vehicles.map(vehicle => <Link to={`/vehicles/${vehicle.imgId}`}><RelatedLinks key={vehicles[vehicle]} imgUrl={vehicle.imgUrl} linkTitle={vehicle.title} /></Link>)
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
                                                    starships && starships.map(starship => <Link to={`/starships/${starship.imgId}`}><RelatedLinks key={starships[starship]} imgUrl={starship.imgUrl} linkTitle={starship.title} /></Link>)
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
        charData: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log(charId)
    return {
        fetchChar: () => dispatch(fetchUsers(charId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)