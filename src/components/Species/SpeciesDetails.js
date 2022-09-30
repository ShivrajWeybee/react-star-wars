import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'
import { fetchSpecies } from './speciesAction'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from '../Films/filmAction'
import { fetchUsers } from '../Characters/charAction'

let speciesId;

function SpeciesDetails(props) {

    const params = useParams()
    speciesId = params.speciesId

    const rfilms = useSelector(state => state.species.users.films)
    const dispatchFilm = useDispatch()
    useEffect(() => {
        rfilms?.forEach(film => dispatchFilm(fetchFilms(film.split('/').at(-2))))
    }, [rfilms])

    const rchar = useSelector(state => state.species.users.people)
    const dispatchChar = useDispatch()
    useEffect(() => {
        rchar?.forEach(char => dispatchChar(fetchUsers(char.split('/').at(-2))))
    }, [rchar])

    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [chars, setChar] = useState([])

    useEffect(() => {
        props.fetchSpecie()
    }, [])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/species/${speciesId}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [speciesId])

    useEffect(() => {
        data.people && data.people.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setChar(characters => [...characters, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.people])

    useEffect(() => {
        data.films && data.films.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setFilms(films => [...films, { title: res.data.title, imgUrl: `https://starwars-visualguide.com/assets/img/films/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.films])

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
                props.speciesData.species.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/species/${speciesId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.speciesData.species.users.name || 'unknown'}</p>
                                <p>classification - {props.speciesData.species.users.classification || 'unknown'}</p>
                                <p>Designation -{props.speciesData.species.users.designation || 'unknown'}</p>
                                <p>Language - {props.speciesData.species.users.language || 'unknown'}</p>
                                <p>Avg Lifespan - {props.speciesData.species.users.average_lifespan || 'unknown'}</p>
                                <p>Avg Height - {props.speciesData.species.users.average_height || 'unknown'}</p>
                                <p>Hair Colors - {props.speciesData.species.users.hair_colors || 'unknown'}</p>
                                <p>Skin Color - {props.speciesData.species.users.skin_colors || 'unknown'}</p>
                                <p>Eye Color - {props.speciesData.species.users.eye_colors || 'unknown'}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Characters</h2>
                                <div className='releted-cards'>
                                    {
                                        props.speciesData.film.related.length === 0 ? "There are no related items for this category" :
                                            props.speciesData.film.related ?
                                                <Slider {...settings}>
                                                    {
                                                        props.speciesData.film.related && props.speciesData.film.related.map((film, index) =>
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
                                                </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Characters</h2>
                                <div className='releted-cards'>
                                    {
                                        props.speciesData.char.related.length === 0 ? "There are no related items for this category" :
                                            props.speciesData.char.related ?
                                                <Slider {...settings}>
                                                    {
                                                        props.speciesData.char.related && props.speciesData.char.related.map((char, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/characters/${char.url.split('/').at(-2)}`}
                                                            >
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
                        </div>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        speciesData: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchSpecie: () => dispatch(fetchSpecies(speciesId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesDetails)