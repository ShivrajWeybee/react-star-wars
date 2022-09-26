import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const FilmDetails = () => {

    const params = useParams()
    const filmId = params.filmId
    // const imgId = filmId.url.split('/')
    const [data, setData] = useState({})
    const [chars, setChar] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])
    const [planets, setPlanets] = useState([])
    const [species, setSpecies] = useState([])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/films/${filmId}`)
            .then(res => {
                setData(res.data);
                console.log(res.data.characters)
            })
            .catch(err => {
                console.log(err);
            })
    }, [filmId])

    useEffect(() => {
        data.characters && data.characters.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setChar(characters => [...characters, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.characters])

    useEffect(() => {
        data.vehicles && data.vehicles.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setVehicles(vehicles => [...vehicles, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.vehicles])

    useEffect(() => {
        data.starships && data.starships.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setStarships(starships => [...starships, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/starships/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.starships])

    useEffect(() => {
        data.species && data.species.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setSpecies(species => [...species, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/species/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.species])

    useEffect(() => {
        data.planets && data.planets.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setPlanets(planets => [...planets, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/planets/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.planets])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    console.log(chars)

    return (
        <div>
            <div className='details_info-container flex'>
                <div className='details_img-container'>
                    <img src={`https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`} alt='movie poster' />
                </div>
                <p>- {data.title}</p>
                <p>- {data.opening_crawl}</p>
                <p>- {data.director}</p>
            </div>
            <div className='flex flex-column wrap'>
                <h2>Related Characters</h2>
                <div className='releted-cards flex'>
                    <Carousel
                        responsive={responsive}
                        swipeable={true}
                        infinite={false}
                        autoPlay={false}
                        keyBoardControl={false}
                        containerClass="carousel-container"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {
                            chars.map((char, index) => { return (<Link to={`/character/${char.imgId}`}><RelatedLinks key={index} imgUrl={char.imgUrl} linkTitle={char.title} /></Link>) })
                        }
                    </Carousel>
                </div>
            </div>
            <div className='flex flex-column'>
                <h2>Related Vehicles</h2>
                <div className='releted-cards flex'>
                    {
                        vehicles.map(vehicle => <Link to={`/vehicles/${vehicle.imgId}`}><RelatedLinks key={vehicles[vehicle]} imgUrl={vehicle.imgUrl} linkTitle={vehicle.title} /></Link>)
                    }
                </div>
            </div>
            <div className='flex flex-column'>
                <h2>Related Starships</h2>
                <div className='releted-cards flex'>
                    {
                        starships.map(starship => <Link to={`/starships/${starship.imgId}`}><RelatedLinks key={starships[starship]} imgUrl={starship.imgUrl} linkTitle={starship.title} /></Link>)
                    }
                </div>
            </div>
            <div className='flex flex-column'>
                <h2>Related Species</h2>
                <div className='releted-cards flex'>
                    {
                        species.map(specie => <Link to={`/species/${specie.imgId}`}><RelatedLinks key={species[specie]} imgUrl={specie.imgUrl} linkTitle={specie.title} /></Link>)
                    }
                </div>
            </div>
            <div className='flex flex-column'>
                <h2>Related planets</h2>
                <div className='releted-cards flex'>
                    {
                        planets.map(planet => <Link to={`/planets/${planet.imgId}`}><RelatedLinks key={planets[planet]} imgUrl={planet.imgUrl} linkTitle={planet.title} /></Link>)
                    }
                </div>
            </div>
        </div>
    )
}