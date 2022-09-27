import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'

export const VehiclesDetails = () => {
    const params = useParams()
    const vehicleId = params.vehicleId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    // const [pilot, setPilot] = useState([])

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
                data &&
                <div className='detailpage-container'>
                    <div className='details_info-container flex'>
                        <img src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleId}.jpg`} alt='movie poster' />
                        <div className='details_info'>
                            <p className='title'>{data.name}</p>
                            <p>{data.model}</p>
                            <p>{data.manufacturer}</p>
                            <p>{data.vehicle_class}</p>
                            <p>{data.cost_in_credits}</p>
                            <p>{data.max_atmosphering_speed} km/h</p>
                            <p>{data.length}</p>
                            <p>{data.cargo_capacity}</p>
                            <p>{data.crew}</p>
                            <p>{data.passengers}</p>
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
