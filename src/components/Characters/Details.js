import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'
import { Loader } from '../Loader'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavigationBar } from '../NavigationBar'

export const Details = () => {

    const params = useParams()
    const charId = params.characterId
    const [data, setData] = useState({})
    // const [films, setFilms] = useState([])
    // const [vehicles, setVehicles] = useState([])
    // const [starships, setStarships] = useState([])
    // const [homeworld, setHomeworld] = useState('')
    // const [species, setSpecies] = useState('')

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
                            <img src={`https://starwars-visualguide.com/assets/img/characters/${charId}.jpg`} alt='character' />
                            <div className='details_info'>
                                <p className='title'>{data.name}</p>
                                <p>Birthyear: {data.birth_year}</p>
                                <p>Species: {data.species}</p>
                                <p>Homeworld: {homeworld}</p>
                                <p>Height: {data.height} cm</p>
                                <p>Mass: {data.mass} kg</p>
                                <p>Gender: {data.gender}</p>
                                <p>Hair color: {data.hair_color}</p>
                                <p>Skin color: {data.skin_color}</p>
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
                    </div> : <Loader />
            }
        </div>
    )
}