import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RelatedLinks } from '../relatedLinks/RelatedLinks'

export const SpeciesDetails = () => {

    const params = useParams()
    const speciesId = params.speciesId
    const [data, setData] = useState({})
    const [films, setFilms] = useState([])
    const [chars, setChar] = useState([])

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/species/${speciesId}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [speciesId])

    useEffect(() => {
        data.people && data.people.forEach(element => {
            axios
                .get(element)
                .then(res => {
                    const imgId = res.data.url.split('/')
                    setChar(characters => [...characters, { title: res.data.name, imgUrl: `https://starwars-visualguide.com/assets/img/characters/${imgId[imgId.length - 2]}.jpg`, imgId: `${imgId[imgId.length - 2]}` }])
                })
                .catch(err => console.log(err))
        });
    }, [data.people])

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
                        <img src={`https://starwars-visualguide.com/assets/img/species/${speciesId}.jpg`} alt='movie poster' />
                        <p>{data.name}</p>
                        <p>{data.classification}</p>
                        <p>{data.designation}</p>
                        <p>{data.language}</p>
                        <p>{data.average_lifespan}</p>
                        <p>{data.average_height}</p>
                        <p>{data.hair_colors}</p>
                        <p>{data.skin_colors}</p>
                        <p>{data.eye_colors}</p>
                    </div>
                    <div>
                        <div className='flex flex-column wrap'>
                            <h2>Related Characters</h2>
                            <div className='releted-cards flex'>
                                {
                                    chars && chars.map(char => <Link to={`/character/${char.imgId}`}><RelatedLinks key={chars[char]} imgUrl={char.imgUrl} linkTitle={char.title} /></Link>)
                                }
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
                    </div>
                </div>
            }
        </div>
    )
}
