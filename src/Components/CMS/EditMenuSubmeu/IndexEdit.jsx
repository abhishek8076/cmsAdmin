import React,{useState,useEffect} from 'react';

import { EditMenu } from './EditMenu';
import { EditSubmenu } from './EditSubmenu';

import { useParams } from 'react-router-dom';
import apiClient from '../../../Service/ApiClient'
import apis from '../../../Service/apis.json'

import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';



 export const Index  = () => {
    const [data,setData] = useState([])
    const {id}= useParams()
    useEffect(() => {
        async function fetchData2() {
          try {
           
            const response = await apiClient.get(apis.getmenudatabyid+id);
            setData(response.data);
         
          } catch (error) {
            console.error('Error fetching user data:', error);
           
          }
        }
        fetchData2();
      }, [id]);
      console.log(data)
  return (
    <div >
        <Header/>
        <Sidebar/>
        <main id="main" class="main">

<div class="pagetitle">
  <h1>Edit Menu</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Dashboard</li>
      <li class="breadcrumb-item  ">CMS</li>
      <li class="breadcrumb-item active ">Edit Menu</li>
     
    </ol>
  </nav>
</div>
     
      <div >
        
      <div>
     {data.submenu_id===0&&(
        <EditMenu/>
     )}
     {data.submenu_id!==0&&(
        <EditSubmenu/>
     )}
      </div>
      </div>
      </main>
    </div>
  )
}


