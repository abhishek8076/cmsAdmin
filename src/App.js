import React from 'react';
// your pages
import LoginForm from './pages/login/LoginForm';
import Homenew from "./pages/home/Homenew";

 import { BrowserRouter , Routes , Route  } from 'react-router-dom';
// your components
 import Footer from './Components/footer/Footer';
 import Header from './Components/header/Header';
import { CreateUser } from './Components/User/CreateUser/CreateUser';
import { Banner } from './Components/Banner/Banner';
import  AllUser  from './Components/User/CreateUser/AllUser';
import { HomePage } from './Components/CMS/HomePage/HomePage';
import { CreateMenu } from './Components/CMS/Menu/CreateMenu';
import { CreateSubMenu } from './Components/CMS/SubMenu/CreateSubMenu';
import { CreateWhatsNew } from './Components/WhatsNew/CreateWhatsNew/CreateWhatsNew';
import { CreateFooterDec } from './Components/CMSFooter/CreateFooter/CreateFooterDec';
import { CreateFooterAddress } from './Components/CMSFooter/CreateFooter/CreateFooterAddress';
import { CreateFooterService } from './Components/CMSFooter/CreateFooter/CreateFooterServices';
import { CreateFooterData } from './Components/CMSFooter/CreateFooter/CreateFooterData';
import { Profile } from './pages/Profile/Profile';
import { Slider } from './Components/Slider/Slider';
import { CreateReports } from './Components/Reports/CreateReports/CreateReports';
import { Createtender } from './Components/Tender/CreateTender/Createtender';
import { Createlink } from './Components/Links/Createlinks/CreateLinks';
import FooterTable  from './Components/CMSFooter/FooterTable/FooterTable';
import { IndexEditFooter } from './Components/CMSFooter/EditFooter/IndexEditFooter';
import { EditUser } from './Components/User/EditUser/EditUser';
import WhatsNewTable from './Components/WhatsNew/WhtasNewTable/WhatsNewTable';
import { EditWhatsNew } from './Components/WhatsNew/EditWhatsNew/EditWhatsNew';
import MenuSubMenuTable from './Components/CMS/MenuSubMenuTable/MenuSubMenuTable';
import { Index } from './Components/CMS/EditMenuSubmeu/IndexEdit';

export function App() {
  return (
    <div className="App">
      { <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />}/>
          <Route path='/banner' element={<Banner/>}/>
          <Route path='/slider' element={<Slider/>}/>
            <Route path="/dashboard" element={<Homenew />}/>
         {/* user */}
          <Route path="/user">
            <Route index element={<AllUser/>} />
            <Route path='createuser' element={<CreateUser/>}/>
            <Route path='usertable' element={<AllUser/>}/>
            <Route path='edituser/:id' element={<EditUser/>}/>
          </Route>
          {/* Header cms */}
          <Route path="/cms">
            <Route index  />
            <Route path='homepage' element={<HomePage/>}/>
            <Route path='menu' element={<CreateMenu/>}/>
            <Route path='submenu' element={<CreateSubMenu/>}/>
            <Route path='allmenu' element={<MenuSubMenuTable/>}/>
            <Route path='editdata/:id' element={<Index/>}/>

          </Route>
          {/* Services */}
          <Route path="/services">
            
            <Route path='allwhatsnew'  element={<WhatsNewTable/>}/>
              <Route path='addwhatsnew' element={<CreateWhatsNew/>}/>
              <Route path='editwhatsnew/:id' element={<EditWhatsNew/>}/>

         
            <Route path='creatrereport' element={<CreateReports/>}/>
            <Route path='createtender' element={<Createtender/>}/>
            <Route path='createlinks' element={<Createlink/>}/>
          </Route>

          {/* Footer */}
          <Route path="/footer">
            <Route index  />
            <Route path='createfooterdisc' element={<CreateFooterDec/>}/>
            <Route path='createfooteraddress' element={<CreateFooterAddress/>}/>
            <Route path='createfooterservices' element={<CreateFooterService/>}/>
            <Route path='createfooterdata' element={<CreateFooterData/>}/>
            <Route path='footertable' element={<FooterTable/>}/>
            <Route path='editfooter/:id' element={<IndexEditFooter/>}/>
            
          </Route>

           {/* profile */}
           <Route path="/profile">
            <Route index element={<Profile /> } />
          </Route>
    
        </Routes>
      </BrowserRouter> }
      
    </div>
  );
}
