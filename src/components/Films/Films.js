import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../redux/actions'
import axios from 'axios'
import { Link, Outlet, useParams } from 'react-router-dom'
import { FilmLink } from './FilmLink'
import { Loader } from '../Loader'

export const Films = () => {
    const param = useParams()
    const [data, setData] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const mapStateToProps = (state) => {
        return {
            userData: state
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchUser: () => dispatch(fetchUsers('people'))
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
        <div className='character-display_container'>
            {
                data.length > 0 ?
                    data.map(i =>
                        <div>
                            <Link key={i.title} to={`/films/${i.url.split('/').at(-2)}`}>{<FilmLink filmId={i} />}</Link>
                        </div>
                    )
                    : <Loader />
            }
            {/* <Outlet /> */}
        </div>
    )
}