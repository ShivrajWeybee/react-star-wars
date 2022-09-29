import React from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchApis } from '../redux/commanActions'

function Pagination(props) {

    return (
        <option>{props.inputValue}</option>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        page: state.comman,
    }
}

export default connect(mapStateToProps)(Pagination)