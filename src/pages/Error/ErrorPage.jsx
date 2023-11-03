import React from 'react'
import './ErrorPage.scss'
import { Link } from 'react-router-dom'
import { error } from 'jquery'
import Img from '../../assets/img/error.png';
import Button from '@mui/material/Button';

export const ErrorPage = () => {
    return (
      <div class="main-error">
        <div className='errorpage'>
            <img src={Img} alt=""/>
          </div>
        <div class="btn-main">
           <Link to='/' style={{textDecoration:'none'}}>
            <Button variant="contained">Back</Button>
            </Link>
            </div>
           
        </div>
    )
}
