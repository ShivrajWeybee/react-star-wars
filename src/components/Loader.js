import React from 'react'
import { Triangle } from 'react-loader-spinner'

export const Loader = () => {
    return (
        <Triangle
            height="80"
            width="80"
            color="#f4ff00"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        />
    )
}