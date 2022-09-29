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

    const rfilms = useSelector(state => state.planet.users.films)
    const dispatchFilm = useDispatch()
    useEffect(() => {
        rfilms?.forEach(film => dispatchFilm(fetchFilms(film.split('/').at(-2))))
    }, [rfilms])

    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [residents, setResidents] = useState([])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/planets/${planetId}`)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [planetId])


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

    useEffect(() => {
        data.residents && data.residents.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setResidents(residents => [...residents, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.residents])

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
                                <p className='title'>{props.planetData.planet.users.name}</p>
                                <p>{props.planetData.planet.population}</p>
                                <p>{props.planetData.planet.users.rotation_period} days</p>
                                <p>{props.planetData.planet.users.orbital_period} days</p>
                                <p>{props.planetData.planet.users.diameter} km</p>
                                <p>{props.planetData.planet.users.gravity}</p>
                                <p>{props.planetData.planet.users.terrain}</p>
                                <p>{props.planetData.planet.users.surface_water}%</p>
                                <p>{props.planetData.planet.users.climate}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Films</h2>
                                <div className='releted-cards'>
                                    {
                                        props.planetData.film.related ?
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
                                            : <Loader />
                                    }
                                </div>
                            </div>
                            {/* <div className='carousel-parent'>
                                <h2>Related Residents</h2>
                                <div className='releted-cards'>
                                    {
                                        residents.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    residents.map((resident, index) => <Link key={index} to={`/characters/${resident.imgId}`}><RelatedLinks imgUrl={resident.imgUrl} linkTitle={resident.title} /></Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div> */}
                        </div>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        planetData: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchPlanet: () => dispatch(fetchPlanets(planetId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetsDetails)