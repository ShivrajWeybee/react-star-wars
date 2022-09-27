import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { CharLink } from './CharLink'
import { Loader } from '../Loader'

export const Character = () => {

    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('https://swapi.dev/api/people/')
            .then(res => {
                setData(res.data.results)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (param.hasOwnProperty('characterId') === true) return <Outlet />

    return (
        <div className='character-display_container'>
            {
                data.length > 0 ? data.map(i => <div>
                    <Link key={i.name} to={`/character/${i.url.split('/').at(-2)}`}>{<CharLink charId={i} type='characters' />}</Link>
                </div>) : <Loader />
            }
            {/* <Outlet /> */}
        </div>
    )
}