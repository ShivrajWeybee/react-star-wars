import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom'
import { CharLink } from './CharLink'
import { Loader } from '../Loader'
import { connect } from 'react-redux'
import { fetchApis } from '../../redux/commanActions'

function Character(props) {

    const param = useParams()
    const [searchParam, setSearchParam] = useSearchParams(1)

    const handleChange = (e) => {
        setSearchParam({ page: e.target.value })
    }

    const handlePrevious = () => {
        console.log(Number(searchParam.get('page')))
        setSearchParam({ page: Number(searchParam.get('page')) - 1 })
    }

    const handleNext = () => {
        console.log(Number(searchParam.get('page')))
        setSearchParam({ page: Number(searchParam.get('page')) + 1 })
    }

    useEffect(() => {
        props.fetchApi(searchParam.get('page') ? searchParam.get('page') : 1)
    }, [searchParam])

    if (param.hasOwnProperty(`${props.categoryType}Id`) === true) return <Outlet />

    return (
        <div>
            <div>
                <div className='flex pagination'>
                    <button onClick={handlePrevious} disabled={Number(searchParam.get('page')) ? Number(searchParam.get('page')) : 1 === 1}>&lt;</button>
                    <select onChange={handleChange}>
                        {
                            [...Array(Number(props.apiData.page))].map((x, i) => <option selected={(i + 1) === Number(searchParam.get('page')) ? Number(searchParam.get('page')) : 0} key={i} value={i + 1}>{i + 1}</option>)
                        }
                    </select>
                    <button onClick={handleNext} disabled={Number(searchParam.get('page')) ? Number(searchParam.get('page')) : props.apiData === Number(props.apiData.page)}>&gt;</button>
                </div>
            </div>
            <div className='character-display_container'>
                {
                    props.apiData.loading ? <Loader /> :
                        props.apiData.apiData.results.map((i, index) => <div key={index}>
                            <Link to={`/${props.categoryType}/${i.url.split('/').at(-2)}`}>{<CharLink charId={i} type={props.categoryType} />}</Link>
                        </div>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        apiData: state.comman,
        char: state.char,
        types: ownProps.categoryType === 'characters' ? 'people' : ownProps.categoryType
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const types = ownProps.categoryType === 'characters' ? 'people' : ownProps.categoryType
    return {
        fetchApi: (pageNo) => dispatch(fetchApis(types, pageNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character)