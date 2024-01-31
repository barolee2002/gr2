import { useState } from 'react'
import APIapp from '../../../components/APIapp/APIapp'
import './SearchCustomer.scss'

function SearchCustomer(props){
    const {data, onChangeCustomer}= props
    return(
        <div className='searchresult'>
            {data.map((customer, index)=>(
                <div key={index} className='item' onClick={()=>{onChangeCustomer(customer)}}>
                    <p>Mã khách hàng: {customer.code}</p>
                    <p>Tên khách hàng: {customer.name}, số điện thoại: {customer.phone}</p>
                </div>
            ))}
        </div>
    )
}

export default SearchCustomer 