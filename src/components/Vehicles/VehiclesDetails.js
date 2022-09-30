import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'
import { fetchVehicles } from './vehicleAction'
import { connect } from 'react-redux'

let vehicleId;

function VehiclesDetails(props) {
    const params = useParams()
    vehicleId = params.vehiclesId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    // const [pilot, setPilot] = useState([])

    useEffect(() => {
        props.fetchVehicle()
    }, [])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/vehicles/${vehicleId}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [vehicleId])

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
                props.vehicleData.vehicle.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.vehicleData.vehicle.users.name || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.model || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.manufacturer || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.vehicle_class || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.cost_in_credits || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.max_atmosphering_speed || 'unknown'} km/h</p>
                                <p>{props.vehicleData.vehicle.users.length || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.cargo_capacity || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.crew || 'unknown'}</p>
                                <p>{props.vehicleData.vehicle.users.passengers || 'unknown'}</p>
                            </div>
                        </div>
                        <div className='all-related-carousels-parent flex'>
                            <div className='carousel-parent'>
                                <h2>Related Films</h2>
                                <div className='releted-cards'>
                                    {
                                        props.vehicleData.film.loading ? <Loader /> :
                                            props.vehicleData.film.related.length === 0 ? "There are no related items for this category" :
                                                <Slider {...settings}>
                                                    {
                                                        props.vehicleData.film.related && props.vehicleData.film.related.map((film, index) =>
                                                            <Link
                                                                key={index}
                                                                to={`/films/${film.url.split('/').at(-2)}`} >
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
        vehicleData: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVehicle: () => dispatch(fetchVehicles(vehicleId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesDetails)