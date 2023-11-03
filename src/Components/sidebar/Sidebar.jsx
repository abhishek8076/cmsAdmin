import React,{useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from "jquery";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Navigate to the login page
    navigate('/');
  };
  useEffect(() => {
    // Your jQuery code here
    $(".toggle-sidebar-btn").click(function() {
      $("body").toggleClass("toggle-sidebar");
    });
  }, []); 
 
  return (
    <div>

{/* <!-- ======= Sidebar ======= --> */}
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">
    <li class="nav-heading">Main</li>
      <li class="nav-item">
        <Link to='/dashboard' class="nav-link ">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li class="nav-heading">List</li>
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
          <Link to='/user' style={{textDecoration:"none"}}>
              <i class="bi bi-circle"></i><span>All Users</span>
              </Link>
          </li>
          <li>
            <Link to='/user/createuser' style={{textDecoration:"none"}}>
              <i class="bi bi-circle"></i><span>Add new user</span>
              </Link>
          </li>
         
        </ul>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
          <i class="bi bi-journal-text"></i><span>CMS</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            < Link to='/cms/homepage'>
              <i class="bi bi-circle"></i><span>Create Home</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/menu'>
              <i class="bi bi-circle"></i><span>Menu</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/submenu'>
              <i class="bi bi-circle"></i><span>SubMenu</span>
            </Link>
          </li>
          <li>
            < Link to='/cms/allmenu'>
              <i class="bi bi-circle"></i><span>All Menu</span>
            </Link>
          </li>
         
        </ul>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-layout-text-window-reverse"></i><span>Footer</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to='/footer/createfooterdisc'>
              <i class="bi bi-circle"></i><span>Footer Description</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/createfooteraddress'>
              <i class="bi bi-circle"></i><span>Footer Address</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/createfooterservices'>
              <i class="bi bi-circle"></i><span>Footer Services</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/createfooterdata'>
              <i class="bi bi-circle"></i><span>Footer Data</span>
            </Link>
          </li>
          <li>
            <Link to='/footer/footertable'>
              <i class="bi bi-circle"></i><span>All Footer</span>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-bar-chart"></i><span>Services</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        <li>
            <Link to='/services/allwhatsnew' >
              <i class="bi bi-circle"></i><span>Create Latest update</span>
            </Link>
          </li>
          <li>
            <Link to='/services/alltender' >
              <i class="bi bi-circle"></i><span>Create Tender</span>
            </Link>
          </li>
          <li>
            <Link to='/services/allreport' >
              <i class="bi bi-circle"></i><span>Create Report</span>
            </Link>
          </li>
          <li>
            <Link to='/services/alllink' >
              <i class="bi bi-circle"></i><span>Create Links</span>
            </Link>
          </li>
         
        </ul>
      </li>

  
       <li class="nav-item">
        <Link to='/banner' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Banner</span>
        </Link>
      </li>
      <li class="nav-item">
        <Link to='/slider' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Slider</span>
        </Link>
      </li>

      <li class="nav-heading">Users</li>

      <li class="nav-item">
      <Link to='/Profile' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Profile</span>
      </Link>
      </li>

      <li class="nav-item">
        <Link to='/sitemap
        ' class="nav-link collapsed" >
          <i class="bi bi-person"></i>
          <span>Site Map</span>
        </Link>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="pages-contact.html">
          <i class="bi bi-envelope"></i>
          <span>Contact</span>
        </a>
      </li>
      <li class="nav-item">
        <Link to='/' class="nav-link collapsed"  onClick={handleLogout}>
          <i class="bi bi-box-arrow-in-right"></i>
          <span>Logout</span>
        </Link>
      </li>

      
    

    </ul>

  </aside>


    </div>
  )
}

export default Sidebar