import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../redux/actions'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Loader } from '../Loader'
import { NavigationBar } from '../NavigationBar'
import { CharLink } from '../Characters/CharLink'

export const Films = ({ userData, fetchUser }) => {
    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        fetchUser('people')
    }, [])

    const mapStateToProps = (state) => {
        return {
            userData: state
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchUser: (category) => dispatch(fetchUsers(category))
        }
    }

    useEffect(() => {
        axios
            .get('https://swapi.dev/api/films/')
            .then(res => {
                const filmsSort = res.data.results.sort((a, b) => a.episode_id - b.episode_id)
                console.log(filmsSort)
                setData(filmsSort)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    if (param.hasOwnProperty('filmId') === true) return <Outlet />

    return (
        <>
            <NavigationBar />
            <div className='character-display_container'>
                {
                    data.length > 0 ?
                        data.map(i =>
                            <div>
                                <Link key={i.title} to={`/films/${i.url.split('/').at(-2)}`}>{<CharLink charId={i} type='films' />}</Link>
                            </div>
                        )
                        : <Loader />
                }
                {/* <Outlet /> */}
            </div>
        </>
    )
}