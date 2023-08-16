import PropTypes from 'prop-types'
import { useState } from 'react'
import './Pagination.css'

const Pagination = (props: any) => {
    const pages = Math.ceil(props.numItems / props.numItemsToShow)
    const [currentPage, setCurrentPage] = useState(0)

    const changePage = (pageNum: number) => {
        setCurrentPage(pageNum)
        props.changePage(pageNum)
    }

    return (
        <div className='pagination'>
            <div className='pagination-container'>
                {Array(pages).fill(1).map((el, i) =>
                    <div className={'text-black rounded-md cursor-pointer px-2 py-1 mr-2 ' + (currentPage === i ? 'bg-orange-500 text-white' : 'bg-white')} key={i} onClick={() => changePage(i)}>{i + 1}</div>
                )}
            </div>
        </div>
    )
}

Pagination.propTypes = {
    numItems: PropTypes.number,
    numItemsToShow: PropTypes.number,
    changePage: PropTypes.func
}

export default Pagination