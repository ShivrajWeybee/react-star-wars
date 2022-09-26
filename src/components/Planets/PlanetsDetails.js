import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'

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

    return (
        <div>
            {
                data &&
                <div>
                    <div>
                        <img src={`https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`} alt='planet' />
                        <p>{data.name}</p>
                        <p>{data.population}</p>
                        <p>{data.rotation_period} days</p>
                        <p>{data.orbital_period} days</p>
                        <p>{data.diameter} km</p>
                        <p>{data.gravity}</p>
                        <p>{data.terrain}</p>
                        <p>{data.surface_water}%</p>
                        <p>{data.climate}</p>
                    </div>
                    <div>
                        <div className='flex flex-column'>
                            <h2>Related Films</h2>
                            <div className='flex'>
                                {
                                    films.map(film => <Link to={`/films/${film.imgId}`} ><RelatedLinks key={films[film]} imgUrl={film.imgUrl} linkTitle={film.title} /></Link>)
                                }
                            </div>
                        </div>
                        <div className='flex flex-column wrap'>
                            <h2>Related Characters</h2>
                            <div className='flex'>
                                {
                                    residents.map(resident => <Link to={`/character/${resident.imgId}`}><RelatedLinks key={residents[resident]} imgUrl={resident.imgUrl} linkTitle={resident.name} /></Link>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
