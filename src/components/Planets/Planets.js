import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Loader } from '../Loader'
import { NavigationBar } from '../NavigationBar'
import { CharLink } from '../Characters/CharLink'

export const Planets = () => {
    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get('https://swapi.dev/api/planets/')
            .then(res => {
                setData(res.data.results)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (param.hasOwnProperty('planetId') === true) return <Outlet />

    return (
        <>
            <NavigationBar />
            <div className='character-display_container'>
                {
                    data.length > 0 ? data.map(i => <div>
                        <Link key={i.name} to={`/planets/${i.url.split('/').at(-2)}`}>{<CharLink charId={i} type='planets' />}</Link>
                    </div>) : <Loader />
                }
            </div>
        </>
    )
}
