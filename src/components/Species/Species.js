import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { SpeciesLink } from './SpeciesLink'
import { Loader } from '../Loader'

export const Species = () => {

    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('https://swapi.dev/api/species/')
            .then(res => {
                setData(res.data.results)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (param.hasOwnProperty('speciesId') === true) return <Outlet />

    return (
        <div className='character-display_container'>
            {
                data.length > 0 ? data.map(i => <div>
                    <Link key={i.name} to={`/species/${i.url.split('/').at(-2)}`}>{<SpeciesLink speciesId={i} />}</Link>
                </div>) : <Loader />
            }
        </div>
    )
}