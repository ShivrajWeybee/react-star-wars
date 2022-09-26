import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'

export const Details = () => {

    const params = useParams()
    const charId = params.characterId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [starships, setStarships] = useState([])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people/${charId}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [charId])

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
        data.vehicles && data.vehicles.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setVehicles(vehicles => [...vehicles, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/vehicles/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
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

    return (
        <div>
            {
                data ?
                    <div className='details-container'>
                        {/* <div className='details_background-img'>
                            <img src="https://images.unsplash.com/photo-1647316857313-c738f4c6cee5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1561&q=80" alt='background' />
                        </div> */}
                        <div className='details_info-container flex'>
                            <div className='details_img-container'>
                                <img src={`https://starwars-visualguide.com/assets/img/characters/${charId}.jpg`} alt='character' />
                            </div>
                            <div className='card-info'>
                                <h1>{data.name}</h1>
                                <p>Birthyear: {data.birth_year}</p>
                                <p>Species: {data.species}</p>
                                <p>Homeworld: {data.homeworld}</p>
                                <p>Height: {data.height} cm</p>
                                <p>Mass: {data.mass} kg</p>
                                <p>Gender: {data.gender}</p>
                                <p>Hair color: {data.hair_color}</p>
                                <p>Skin color: {data.skin_color}</p>
                            </div>
                        </div>
                        <div className='flex flex-column'>
                            <h2>Related Films</h2>
                            <div className='releted-cards flex'>
                                {
                                    films && films.map(film => <Link to={`/films/${film.imgId}`} ><RelatedLinks key={films[film]} imgUrl={film.imgUrl} linkTitle={film.title} /></Link>)
                                }
                            </div>
                        </div>
                        <div className='flex flex-column'>
                            <h2>Related Vehicles</h2>
                            <div className='releted-cards flex'>
                                {
                                    vehicles && vehicles.map(vehicle => <Link to={`/vehicles/${vehicle.imgId}`}><RelatedLinks key={vehicles[vehicle]} imgUrl={vehicle.imgUrl} linkTitle={vehicle.title} /></Link>)
                                }
                            </div>
                        </div>
                        <div className='flex flex-column'>
                            <h2>Related Starships</h2>
                            <div className='releted-cards flex'>
                                {
                                    starships && starships.map(starship => <Link to={`/starships/${starship.imgId}`}><RelatedLinks key={starships[starship]} imgUrl={starship.imgUrl} linkTitle={starship.title} /></Link>)
                                }
                            </div>
                        </div>
                    </div> : 'loading character.....'
            }
        </div>
    )
}