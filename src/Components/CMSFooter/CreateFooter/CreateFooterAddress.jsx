import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';

import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import {

  Button,
  Snackbar,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@mui/material';
import apiClient from '../../../Service/ApiClient';
import apis from '../../../Service/apis.json';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';


export const CreateFooterAddress = () => {
  const [html, setHtml] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    address: '',
    mobile_no: '',
    contenttype: 0,
    footertype:3,
  });
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tittle_name.trim()) {
      newErrors.tittle_name = 'Name is required';
    }
    if (!formData.mobile_no) {
      newErrors.mobile_no = "Please enter your mobile number";
    } else if (!/^(\+91|\+91\-|0)?[789]\d{9}$/.test(formData.mobile_no)) {
      newErrors.mobile_no = "Please enter a valid 10-digit phone number ";
    }
  
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
  
  

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleOpenConfirmation = () => {
    
      setConfirmDialogOpen(true);
    
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };


  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();
    try {
      if (validateForm()) {
        const formDataToSend = new FormData();
        formDataToSend.append('tittle_name', formData.tittle_name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('mobile_no', formData.mobile_no);
        formDataToSend.append('footertype', formData.footertype);
        formDataToSend.append('contenttype', formData.contenttype);
        const response = await apiClient.post(apis.newfooter, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Data saved:', response.data);
        setModalMessage('Data saved successfully!');
        setSnackbarOpen(true);

        // Clear the form fields
        setFormData({
          tittle_name: '',
          address: '',
          mobile_no: '',
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
console.log(formData)
  return (
    <div>
    <Header />
    <Sidebar />
  <main id="main" class="main">
    <div class="pagetitle">
      <h1>Create Footer</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">Home</li>
          <li class="breadcrumb-item">Footer</li>
          <li class="breadcrumb-item active">Create Footer Address</li>
        </ol>
      </nav>
    </div>
    <div className="container">
     
      <div className="row justify-content-center">
      <div class="card"><div class="card-body"><div class="mb-3 mt-md-4">
        <div className="col-md-12">
        <div className="box-sec">
          <div className="mb-3">
          <h1 className="text-center heading-main">Office Address</h1>
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Enter Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && <div className="text-danger">{errors.tittle_name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Address</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Phone No</label>
            <input
              className="form-control"
              type="text"
              placeholder="Phone No"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleInputChange}
              maxLength={10}
              minLength={10}
            />
            {errors.mobile_no && <div className="text-danger">{errors.mobile_no}</div>}
          </div>

          <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleOpenConfirmation}>
              Submit
            </button>
           
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
              autoHideDuration={3000} // Adjust as needed
              onClose={() => setSnackbarOpen(false)}>
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                {modalMessage}
              </Alert>
            </Snackbar>
          </div>
          </div>
        </div>
        </div>
        </div>
        </div>
      </div>
      
    </div>
    </main>
    </div>

  );
};
