import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'

export const StartshipsDetails = () => {

    const params = useParams()
    const starshipId = params.starshipId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    // const [pilot, setPilot] = useState([])

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

    return (
        <div>
            {
                data &&
                <div>
                    <div>
                        <img src={`https://starwars-visualguide.com/assets/img/starships/${starshipId}.jpg`} alt='movie poster' />
                        <p>{data.name}</p>
                        <p>{data.model}</p>
                        <p>{data.starship_class}</p>
                        <p>{data.manufacturer}</p>
                        <p>{data.cost_in_credits}</p>
                        <p>{data.max_atmosphering_speed} km/h</p>
                        <p>{data.hyperdrive_rating}</p>
                        <p>{data.MGLT}</p>
                        <p>{data.length}</p>
                        <p>{data.cargo_capacity}</p>
                        <p>{data.crew}</p>
                        <p>{data.passengers}</p>
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
                        {/* <div className='flex flex-column wrap'>
                            <h2>Related Characters</h2>
                            <div className='flex'>
                                {
                                    pilot && pilot.map(p => <Link to={`/character/${p.imgId}`}><RelatedLinks key={pilot[p]} imgUrl={p.imgUrl} linkTitle={p.name} /></Link>)
                                }
                            </div>
                        </div> */}
                    </div>
                </div>
            }
        </div>
    )
}
