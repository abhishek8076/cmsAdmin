import React, { useState, useEffect,useMemo,useCallback } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link, useParams } from 'react-router-dom';



import DialogActions from '@mui/material/DialogActions';

import Alert from '@mui/material/Alert';
import {
  Button,
  Snackbar,
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
} from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { ElectricBike } from '@mui/icons-material';
import JoditEditor from 'jodit-react';
import apiClient from '../../../Service/ApiClient'
import apis from '../../../Service/apis.json'

import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';
import Footer from '../../footer/Footer';


function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const EditSubmenu = () => {
  const {id} = useParams()
  const [html, setHtml] = useState('');
  const [file, setFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, Setdata] = useState([])
  const [submenus, setSubMenu] = useState('')
  const [selectedRole, setSelectedRole] = useState('');
  const [content, setContent] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
   
    submenu_id: "",
  
    menuname: "",
  
    contenttype: "",
    html: "",
    file: "",
    internal_link: "",
    external_link: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      menuname: '',
      contenttype: '',
      external_link: '',
      internal_link: '',
      submenu_id: "",
      file: '',
      html: '',
    
    });
  }, []);
  

  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );
  
  const onChange = useCallback((html) => {
    console.log("Editor content changed:", html);
    setContent(html);
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.menuname) {
      newErrors.menuname = 'Name is required';
    }
    // if (!formData.menu_id) {
    //   newErrors.menuname = 'Name is required';
    // }


    if (!formData.contenttype) {
      newErrors.contenttype = 'Select a content type';
    }
    if (!selectedRole) {
      newErrors.contenttype = 'Select Menu';
    }

    if (formData.contenttype === '4' && !formData.external_link) {
      newErrors.external_link = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internal_link) {
      newErrors.internal_link = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !file) {
      newErrors.file = 'File is required';
    }

    // if (formData.contenttype === '1' && !html) {
    //   newErrors.html = 'HTML content is required';
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };

  const handleInputChange = (event) => {
    setSubMenu(event.target.value)
    setSelectedRole(event.target.value);
    
    const { name, value, type } = event.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setSubMenu(event.target.value)
      setSelectedRole(event.target.value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenConfirmation = () => {
    if (validateForm()) {
      setConfirmDialogOpen(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('menuname', formData.menuname);
      formDataToSend.append('contenttype', formData.contenttype);
   
      // formDataToSend.append('submenu_id', formData.submenu_id);
      formDataToSend.append('submenu_id', submenus);

      if (formData.contenttype === '4') {
        formDataToSend.append('external_link', formData.external_link);
      } else if (formData.contenttype === '3') {
        formDataToSend.append('internal_link', selectedRole);
      } else if (formData.contenttype === '2') {
        formDataToSend.append('file', file);
      } else if (formData.contenttype === '1') {
        formDataToSend.append('html', content);
      }

      const response = await apiClient.post(apis.navmenu, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data saved:', response.data);
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get(apis.getmenuname);
        Setdata(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);
  useEffect(() => {
    async function fetchData1() {
      try {
        setLoading(true);
        const response = await apiClient.get(apis.getmenuname);
        setDropdownOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    fetchData1();
  }, []);
  useEffect(() => {
    async function fetchData2() {
      try {
        
        const response = await apiClient.get(apis.getmenudatabyid+id);
        setFormData(response.data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        
      }
    }
    fetchData2();
  }, [id]);

  console.log(formData)

  return (
    <div >
  
      <div className="row justify-content-center">
    
        <div >
        <div class="box-sec">
        <h1 className="text-center">Edit SubMenu</h1>
          <Form.Group className="mb-3" controlId="Usertype">
            <div className="mb-12">
              <Form.Label className="text-center" style={{ color: "black" }}>Menu Names</Form.Label>
              <select
                className='form-control'
                name='submenu_id'
                value={formData.submenu_id}
                onChange={handleInputChange}

              >
                <option value='' style={{ color: "black" }}>Select a Menu</option>
                {data.map((data) => (
                  <option key={data.u_id} value={data.u_id}>
                    {data.u_menu_name}
                  </option>
                ))}
              </select>
              <Form.Control.Feedback type="invalid">
                {/* {formErrors.usertype} */}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          {errors.selectedRole && <div className="text-danger">{errors.selectedRole}</div>}

          {/* Input for Name */}
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="menuname"
              value={formData.menuname}
              onChange={handleInputChange}
              maxLength={18}
            />
            {errors.menuname && <div className="text-danger">{errors.menuname}</div>}
          </div>

          {/* Input for Select a content type */}
          <div className="mb-3">
            <label className="form-label text-dark">Select a content type</label>
            <select
              className="form-select"
              name="contenttype"
              value={formData.contenttype}
              onChange={handleInputChange}
            >
              <option value="">Select a content type</option>
              <option value="4">External Link</option>
              <option value="3">Internal Link</option>
              <option value="2">File</option>
              <option value="1">HTML</option>
            </select>
            {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
          </div>

          {/* Input for External Link */}
          {formData.contenttype === '4' && (
            <div className="mb-3">
              <label className="form-label text-dark">Enter External Link</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter External Link"
                name="external_link"
                value={formData.external_link}
                onChange={handleInputChange}
              />
              {errors.external_link && <div className="text-danger">{errors.external_link}</div>}
            </div>
          )}

          {/* Input for Internal Link */}
          {formData.contenttype === '3' && (
            <div className="mb-3">
              <select
                                  className='form-control'
                                  name='internal_link'
                                  value={formData.internal_link}
                                  onChange={handleInputChange}
                                  isInvalid={!!formErrors.internal_link}
                                >
                                  <option value='' style={{color:"black"}}>Select a role</option>
                                  {dropdownOptions.map((data) => (
                                    <option key={data.u_id} value={"/menu/"+data.u_menu_url}>
                                      {"Menu Name"+":-"+data.u_menu_name}
                                    </option>
                                  ))}
                                </select>
              {errors.internal_link && <div className="text-danger">{errors.internal_link}</div>}
            </div>
          )}

          {/* Input for File */}
          {formData.contenttype === '2' && (
            <div className="mb-3">
              <label className="form-label text-dark">Choose File</label>
              <input
                className="form-control"
                type="file"
                name="file"
                onChange={handleImageChange}
              />
              {errors.file && <div className="text-danger">{errors.file}</div>}
            </div>
          )}

          {/* HTML Editor Input */}
          {formData.contenttype === '1' && (
            <div className="mb-3">
              <label className="form-label text-dark">HTML Editor</label>
              <div>
                {/* <textarea
                  className="form-control"
                  value={html}
                  onChange={(e) => handleEditorChange(e.target.value)}
                ></textarea> */}
                <JoditEditor
        value={formData.html}
        config={config}
        tabIndex={1}
        onChange={onChange}
      />
              </div>
              {errors.editorContent && <div className="text-danger">{errors.editorContent}</div>}
            </div>
          )}

          {/* Submit Button */}
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
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                {modalMessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000} // Adjust as needed
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                Data save successfully.
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
      </div>
      
      <Footer/>
    </div>
  );
};
