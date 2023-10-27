import React from 'react'
import "./home.scss"
import Header from '../../Components/header/Header';
import Sidebar from '../../Components/sidebar/Sidebar';
import Footer  from '../../Components/footer/Footer';
import Mainpage from '../mainpage/Mainpage';


const Homenew = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Mainpage />
      <Footer />
    </div>
  )
}

export default Homenew
