import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'
import { fetchStarships } from './starshipAction'
import { connect } from 'react-redux'

let starshipId;

function StartshipsDetails(props) {

    const params = useParams()
    starshipId = params.starshipsId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    // const [pilot, setPilot] = useState([])

    useEffect(() => {
        props.fetchStarship()
    }, [])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/starships/${starshipId}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [starshipId])

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
                props.starshipData.starship.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.starshipData.starship.users.name || 'unknown'}</p>
                                <p>Modal - {props.starshipData.starship.users.model || 'unknown'}</p>
                                <p>Class - {props.starshipData.starship.users.starship_class || 'unknown'}</p>
                                <p>Manufacturer - {props.starshipData.starship.users.manufacturer || 'unknown'}</p>
                                <p>Cost in Credits - {props.starshipData.starship.users.cost_in_credits || 'unknown'}</p>
                                <p>Speed - {props.starshipData.starship.users.max_atmosphering_speed || 'unknown'} km/h</p>
                                <p>HyperDrive Rating - {props.starshipData.starship.users.hyperdrive_rating || 'unknown'}</p>
                                <p>MGLT - {props.starshipData.starship.users.MGLT || 'unknown'}</p>
                                <p>Length - {props.starshipData.starship.users.length || 'unknown'}</p>
                                <p>Cargo Capacity - {props.starshipData.starship.users.cargo_capacity || 'unknown'}</p>
                                <p>Crew - {props.starshipData.starship.users.crew || 'unknown'}</p>
                                <p>Passanger - {props.starshipData.starship.users.passengers || 'unknown'}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Films</h2>
                                <div className='releted-cards'>
                                    {
                                        props.starshipData.film.loading ? <Loader /> :
                                            props.starshipData.film.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.starshipData.film.related && props.starshipData.film.related.map((starship, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/starships/${starship.url.split('/').at(-2)}`} >
                                                                <RelatedLinks
                                                                    imgUrl={`https://starwars-visualguide.com/assets/img/films/${starship.url.split('/').at(-2)}.jpg`}
                                                                    linkTitle={starship.title}
                                                                />
                                                            </Link>)
                                                    }
                                                </Slider>
                                    }
                                </div>
                            </div>
                            {/* <div className='carousel-parent'>
                            <h2>Related Films</h2>
                            <div className='releted-cards'>
                                {
                                    pilot.length > 0 ?
                                        <Slider {...settings}>
                                            {
                                                pilot && pilot.map(p => <Link to={`/character/${p.imgId}`}><RelatedLinks key={pilot[p]} imgUrl={p.imgUrl} linkTitle={p.name} /></Link>)
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

const mapStateToProps = (state) => {
    return {
        starshipData: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStarship: () => dispatch(fetchStarships(starshipId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartshipsDetails)