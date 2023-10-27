import React, { useState, useEffect, useMemo, useCallback } from "react";
import apiClient from '../../../Service/ApiClient';
import apis from '../../../Service/apis.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './whatsnew.scss'
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';
import JoditEditor from "jodit-react";
import HomeIcon from '@mui/icons-material/Home';
import Header from "../../header/Header";

import Footer from "../../footer/Footer";
import Sidebar from "../../sidebar/Sidebar";

export const CreateTender = () => {
  const [html, sethtml] = useState('');
  const [file, setselectefile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [content, setContent] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );

  const onChange = useCallback((newContent) => {
    console.log("Editor content changed:", newContent);
    setContent(newContent);
  }, []);

  const [formData, setFormData] = useState({
    ender_tittle: '',
    contenttype: '',
    external_file: '',
    internale_file: '',
    file: "",
    startdate: '',
    end_date: '',
    html: ""
  });
  const [errors, setErrors] = useState({});

  const optionsData = [
    { id: '4', label: 'External Link' },
    { id: '3', label: 'Internal Link' },
    { id: '2', label: 'File' },
    { id: '1', label: 'HTML' },
  ];

  useEffect(() => {
    setFormData({
      ender_tittle: '',
      contenttype: '',
      external_file: '',
      internale_file: '',
      file: "",
      startdate: '',
      end_date: '',
      html: ""
    });
  }, []);

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.ender_tittle) {
      errors.name = 'Please enter your name';
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = 'Please input alphabet characters only';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }

    if (formData.contenttype === '4' && !formData.external_file) {
      errors.external_file = 'External Link is required';
    }

    // if (formData.contenttype === '3' && !formData.internale_file) {
    //   errors.internale_file = 'Internal Link is required';
    // }

    if (formData.contenttype === '2' && !file) {
      errors.file = 'File is required';
    }

    if (!formData.startdate) {
      errors.startdate = 'Starting Date is required';
    }

    if (!formData.end_date) {
      errors.end_date = 'Ending Date is required';
    } else if (new Date(formData.startdate) > new Date(formData.end_date)) {
      errors.end_date = 'End date must be greater than or equal to start date';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setselectefile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === '2') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('ender_tittle', formData.ender_tittle);
        formDataToSend.append('contenttype', formData.contenttype);

        if (formData.contenttype === '4') {
          formDataToSend.append('external_file', formData.external_link);
        } else if (formData.contenttype === '3') {
          formDataToSend.append('internale_file', formData.internal_link);
        } else if (formData.contenttype === '2') {
          formDataToSend.append('file', file);
        } else if (formData.contenttype === '1') {
          formDataToSend.append('html', content);
        }

        formDataToSend.append('startdate', formData.startdate);
        formDataToSend.append('end_date', formData.end_date);

        const response = await apiClient.post(apis.Tender, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log('Data saved:', response.data);
        setFormData({
          ender_tittle: '',
          contenttype: '',
          external_file: '',
          internale_file: '',
          file: "",
          startdate: '',
          end_date: '',
          html: ""
        });
        toast.success('Data saved successfully!');
        openModal('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };
  useEffect(() => {
    const fetchData1= async()=> {
     try {
      
       const response = await apiClient.get(apis.getmenuname);
       setDropdownOptions(response.data);
  
     } catch (error) {
       console.error('Error fetching user data:', error);
    
     }
   }
   fetchData1();
 }, []);

  console.log(formData);

  return (
   
         <div>
        <Header />
        <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Create Tender</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item">Services</li>
              <li class="breadcrumb-item active">Create Tender</li>
            </ol>
          </nav>
        </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col text-end">
           
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="">
        <div class="card">
          <div class="card-body">
            <div class="mb-3 mt-md-4">
          <div class="box-sec">
            <h1 className="text-center heading-main">Tender</h1>
            <div className="mb-3">
              <label className="form-label text-dark">Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                name="ender_tittle"
                value={formData.ender_tittle}
                onChange={handleInputChange}
              />
              {errors.name && <div className="text-danger">{errors.ender_tittle}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Select a content type</label>
              <select
                className="form-select"
                name="contenttype"
                value={formData.contenttype}
                onChange={handleInputChange}
              >
                <option value="">Select a content type</option>
                <option value="4">External</option>
                <option value="3">Internal</option>
                <option value="2">File</option>
                <option value="1">HTML</option>
              </select>
              {errors.contenttype && (
                <div className="text-danger">{errors.contenttype}</div>
              )}
            </div>
            {formData.contenttype === '4' && (
              <div className="mb-3">
                <label className="form-label text-dark">Enter External Link</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter External Link"
                  name="external_file"
                  value={formData.external_file}
                  onChange={handleInputChange}
                />
                {errors.external_file && (
                  <div className="text-danger">{errors.external_file}</div>
                )}
              </div>
            )}
            {formData.contenttype === '3' && (
              <div className="mb-3">
                <label className="form-label text-dark">Enter Internal Link</label>
                {/* <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Internal Link"
                  name="internale_file"
                  value={formData.internale_file}
                  onChange={handleInputChange}
                /> */}
                 <select
                                  className='form-control'
                                  name='internal_link'
                                  value={formData.internal_link}
                                  onChange={handleInputChange}
                                 
                                >
                                  <option value='' style={{color:"black"}}>Select a MenuName</option>
                                  {dropdownOptions.map((data) => (
                                    <option key={data.u_id} value={"/menu/"+data.u_menu_url}>
                                      {"Menu Name"+":-"+data.u_menu_name}
                                    </option>
                                  ))}
                                </select>
                {errors.internale_file && (
                  <div className="text-danger">{errors.internale_file}</div>
                )}
              </div>
            )}
            {formData.contenttype === '2' && (
              <div className="mb-3">
                <label className="form-label text-dark">Choose File</label>
                <input
                  className="form-control"
                  type="file"
                  name="file"
                  onChange={handleImageChange}
                />
                {errors.file && (
                  <div className="text-danger">{errors.file}</div>
                )}
              </div>
            )}
            {formData.contenttype === '1' && (
              <div className="mb-3">
                <label className="form-label text-dark">HTML Editor</label>
                <div>
                  <JoditEditor
                    value={content}
                    config={config}
                    tabIndex={1}
                    onChange={onChange}
                  />
                </div>
                {errors.editorContent && (
                  <div className="text-danger">{errors.editorContent}</div>
                )}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label text-dark">Starting Date</label>
              <input
                className="form-control"
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleInputChange}
              />
              {errors.startdate && (
                <div className="text-danger">{errors.startdate}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Ending Date</label>
              <input
                className="form-control"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
              />
              {errors.end_date && (
                <div className="text-danger">{errors.end_date}</div>
              )}
            </div>
            <div className="btnsubmit">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
             
              <CustomModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
            </div>
          </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </main>
    <Footer/>
    </div>
  );
};

const CustomModal = ({ isOpen, message, onClose }) => {
  return (
    isOpen && (
      <div className="custom-modal">
        <div className="modal-content">
          <h2>{message}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};
