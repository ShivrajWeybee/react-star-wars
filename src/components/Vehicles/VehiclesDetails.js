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
    })

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
            <NavigationBar />
            {
                props.vehicleData.loading ? <Loader /> :
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`} alt='movie poster' />
                            <div className='details_info'>
                                <p className='title'>{props.vehicleData.users.name}</p>
                                <p>{props.vehicleData.users.model}</p>
                                <p>{props.vehicleData.users.manufacturer}</p>
                                <p>{props.vehicleData.users.vehicle_class}</p>
                                <p>{props.vehicleData.users.cost_in_credits}</p>
                                <p>{props.vehicleData.users.max_atmosphering_speed} km/h</p>
                                <p>{props.vehicleData.users.length}</p>
                                <p>{props.vehicleData.users.cargo_capacity}</p>
                                <p>{props.vehicleData.users.crew}</p>
                                <p>{props.vehicleData.users.passengers}</p>
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

const mapStateToProps = (state, ownProps) => {
    return {
        vehicleData: state.vehicle,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchVehicle: () => dispatch(fetchVehicles(vehicleId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesDetails)