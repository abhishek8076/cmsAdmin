import React, { useState, useCallback, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/mateal/Alert;
import Alert from '@mui/material/Alert';
import { ButtonBase } from '@mui/material';
import { ButtonGroup } from 'react-bootstrap';
import apiClient from '../../../Service/ApiClient'
import apis from '../../../Service/apis.json'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';

export const HomePage = () => {
  const id = 21;
  const [content, setContent] = useState('');
  const[data , setData]= useState(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Fetch the existing content when the component loads
    async function fetchData() {
      try {
        const response = await apiClient.get(apis.homepagebyid+id);
        setData(response.data.h_html);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }
    fetchData();
  }, []);

  const onChange = useCallback((data) => {
    console.log('Editor content changed:', data);
    setContent(data);
  }, []);

  const handleSave = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const sendformData = new FormData();
      sendformData.append('h_html', content);

      const response = await apiClient.put(apis.homepagebyid + id, sendformData, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to match the server's expectations
        },
      });

      console.log(response.data);
      setModalMessage('Content saved successfully.');
      setSnackbarOpen(true);
      setContent('');
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error saving content.');
      setSnackbarOpen(true);
    }

    setConfirmDialogOpen(false);
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };
  console.log(data)

  return (
    <div>
            <div>
        <Header/>
        <Sidebar/>
        <main id="main" class="main">

<div class="pagetitle">
<div className="pagetitle-lft">
  <h1>Create HomePage</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Dashboard</li>
      <li class="breadcrumb-item  ">CMS</li>
      <li class="breadcrumb-item active ">Home Page</li>
     
    </ol>
  </nav>
  </div>
  <div className="pagetitle-rgt">
       <button type="button" class="btn btn-info">Back</button>
  </div>
</div>
<div class="row justify-content-center"><div class="card"><div class="card-body"><div class="mb-3 mt-md-4">
      <div className="box-sec">
        <h1 className="text-center text-dark heading-main">Home Page</h1>
        <div className="App">
          <JoditEditor value={data} onChange={onChange} />
          <br/>
          <Button   id="btn" variant="contained" onClick={handleSave}>Save Content</Button>
        
        </div>

        <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
          <DialogTitle>Confirm Submit</DialogTitle>
          <DialogContent>
            Are you sure you want to submit this data?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmation} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
            {modalMessage}
          </Alert>
        </Snackbar>
      </div>
      </div>
      </div>
      </div>
      </div>
      <Footer/>
      </main>
      </div>   
      
       </div>
  );
};
