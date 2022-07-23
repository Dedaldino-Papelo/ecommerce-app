import React from 'react'
import { useDispatch } from 'react-redux'
import { productSeach } from '../Actions/productAction'

const SearchBox = () => {
  const dispatch = useDispatch()

  const onInputChange = (e) => {
    dispatch(productSeach(e.target.value))
  }
  return (
    <div className='searchfield'>
        <input
          type='text'
          className=''
          onChange={onInputChange}
          placeholder='Search Products...'
          >
        </input>
    </div>
  )
}

export default SearchBox
