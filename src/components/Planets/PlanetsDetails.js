import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'

export const PlanetsDetails = () => {
    const params = useParams()
    const planetId = params.planetId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [residents, setResidents] = useState([])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/planets/${planetId}`)
            .then(res => {
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

    return (
        <div>
            <NavigationBar />
            {
                data ?
                    <div className='detailpage-container'>
                        <div className='details_info-container flex'>
                            <img src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`} alt='planet' />
                            <div className='details_info'>
                                <p className='title'>{data.name}</p>
                                <p>{data.population}</p>
                                <p>{data.rotation_period} days</p>
                                <p>{data.orbital_period} days</p>
                                <p>{data.diameter} km</p>
                                <p>{data.gravity}</p>
                                <p>{data.terrain}</p>
                                <p>{data.surface_water}%</p>
                                <p>{data.climate}</p>
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
                                                    films.map(film => <Link to={`/films/${film.imgId}`} ><RelatedLinks key={films[film]} imgUrl={film.imgUrl} linkTitle={film.title} /></Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                            <div className='carousel-parent'>
                                <h2>Related Residents</h2>
                                <div className='releted-cards'>
                                    {
                                        residents.length > 0 ?
                                            <Slider {...settings}>
                                                {
                                                    residents.map(resident => <Link to={`/character/${resident.imgId}`}><RelatedLinks key={residents[resident]} imgUrl={resident.imgUrl} linkTitle={resident.name} /></Link>)
                                                }
                                            </Slider> : <Loader />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loader />
            }
        </div>
    )
}
