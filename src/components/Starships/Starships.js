import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { StarshipsLink } from './StarshipsLink'
import { Loader } from '../Loader'

export const Starships = () => {
    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('https://swapi.dev/api/starships/')
            .then(res => {
                setData(res.data.results)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (param.hasOwnProperty('starshipId') === true) return <Outlet />

    return (
        <div className='character-display_container'>
            {
                data.length > 0 ? data.map(i => <div>
                    <Link key={i.name} to={`/starships/${i.url.split('/').at(-2)}`}>{<StarshipsLink starshipId={i} />}</Link>
                </div>) : <Loader />
            }
        </div>
    )
}
