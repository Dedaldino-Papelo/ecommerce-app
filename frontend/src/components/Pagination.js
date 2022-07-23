import React from 'react'
//import { Button} from 'react-bootstrap'
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPages,handlePageClick }) => {
    return (
        <div className='paginate'>
        <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                previousLabel="< previous"
                pageCount={totalPages}
                onPageChange={handlePageClick}
                nextLinkClassName={"nextBttn"}
                previousLinkClassName={"previousBttn"}
                disabledClassName={"paginationDisabled"}
                containerClassName={"paginationBtts"}
                activeClassName={"paginationActive"}
            />
        </div>
    )
}

export default Pagination
