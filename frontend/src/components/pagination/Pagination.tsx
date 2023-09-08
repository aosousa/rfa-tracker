import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Pagination.css'

// Features
import { selectAllWorkouts } from '../../features/workouts/workoutsSlice'

type PaginationProps = {
  numItems: number
  numItemsToShow: number
  changePage: (pageNum: number) => void
}

export default function Pagination(props: PaginationProps) {
  const pages = Math.ceil(props.numItems / props.numItemsToShow)
  const [currentPage, setCurrentPage] = useState(0)

  const changePage = (pageNum: number) => {
    setCurrentPage(pageNum)
    props.changePage(pageNum)
  }

  const workouts = useSelector(selectAllWorkouts)

  useEffect(() => {
    changePage(0)
  }, [workouts])

  return (
    <div className="pagination">
      <div className="pagination-container">
        {Array(pages)
          .fill(1)
          .map((el, i) => (
            <div className={'text-black rounded-md cursor-pointer px-2 py-1 mr-2 ' + (currentPage === i ? 'bg-orange-500 text-white' : 'bg-white')} key={i} onClick={() => changePage(i)}>
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  )
}
