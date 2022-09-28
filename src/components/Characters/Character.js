import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { CharLink } from './CharLink'
import { Loader } from '../Loader'
import { connect } from 'react-redux'
import { fetchApis } from '../../redux/commanTypes'

function Character(props) {

    const param = useParams()
    const [page, setPage] = useState(0)

    useEffect(() => {
        props.fetchApi()
    }, [])

    if (param.hasOwnProperty(`${props.categoryType.categoryType}Id`) === true) return <Outlet />

    return (
        <div>
            <div>
                <select>
                    <option></option>
                </select>
            </div>
            <div className='character-display_container'>
                {
                    props.apiData.loading ? <Loader /> :
                        props.apiData.apiData.results.map((i, index) => <div key={index}>
                            <Link to={`/${props.categoryType.categoryType}/${i.url.split('/').at(-2)}`}>{<CharLink charId={i} type={props.categoryType.categoryType} />}</Link>
                        </div>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        apiData: state.comman,
        categoryType: ownProps
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const types = ownProps.categoryType === 'characters' ? 'people' : ownProps.categoryType
    console.log(types)
    return {
        fetchApi: () => dispatch(fetchApis(types))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character)