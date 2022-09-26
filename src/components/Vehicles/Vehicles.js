import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { VehiclesLink } from './VehiclesLink'
import { Loader } from '../Loader'

export const Vehicles = () => {
    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('https://swapi.dev/api/vehicles/')
            .then(res => {
                setData(res.data.results)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (param.hasOwnProperty('vehicleId') === true) return <Outlet />

    return (
        <div className='character-display_container'>
            {
                data.length > 0 ? data.map(i => <div>
                    <Link key={i.name} to={`/vehicles/${i.url.split('/').at(-2)}`}>{<VehiclesLink vehicleId={i} />}</Link>
                </div>) : <Loader />
            }
        </div>
    )
}
