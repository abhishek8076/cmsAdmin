import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ViewListIcon from '@mui/icons-material/ViewList';
import { Link, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import HomeIcon from '@mui/icons-material/Home';
import apiClient from '../../../Service/ApiClient';
import apis from '../../../Service/apis.json';
import Header from '../../header/Header';
import Sidebar from '../../sidebar/Sidebar';

export const EditTender = () => {
  const { id } = useParams();
  const [html, sethtml] = useState('');
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [prevContentType, setPrevContentType] = useState('');

  const [formData, setFormData] = useState({
    news_tittle: '',  // Corrected typo in the field name
    contenttype: '',
    external_file: '',
    internal_file: '',  // Corrected field name
    file: null,  // Use null for file state
    startdate: '',
    end_date: '',  // Corrected field name
    html: '',
  });
  const [errors, setErrors] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);

  const optionsData = [
    { id: 4, label: 'External Link' },
    { id: 3, label: 'Internal Link' },
    { id: 2, label: 'File' },
    { id: 1, label: 'HTML' },  // Updated label
  ];
  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );

  const onChange = useCallback((newContent) => {
    console.log("Editor content changed:", newContent);
    sethtml(newContent);
  }, []);

  useEffect(() => {
    if (id) {
      apiClient.get(apis.Tenderbyid + id)
        .then((response) => {
          setFormData(response.data)

        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
        });
    } else {
      setFormData({
        news_tittle: '',
        contenttype: 0,
        external_file: '',
        internal_file: '',
        file: null,
        startdate: '',
        end_date: '',
        html: '',
      });
    }
  }, [id]);


  // useEffect(() => {
  //   async function fetchData() {
  //     try {

  //       const response = await apiClient.get(apis.getwhatsnewbyid + id);
  //       setFormData(response.data);

  //     } catch (error) {
  //       console.error('Error fetching user data:', error);

  //     }
  //   }
  //   fetchData();
  // }, [id]);

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.news_tittle) {
      errors.news_tittle = 'Name is required';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }

    if (formData.contenttype === '4' && !formData.external_file) {
      errors.external_file = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internal_file) {
      errors.internal_file = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !file) {
      errors.file = 'File is required';
    }

    if (formData.contenttype === '1' && !html) {
      errors.html = 'HTML content is required';  // Updated field name
    }

    if (!formData.startdate) {
      errors.startdate = 'Starting Date is required';
    }

    if (!formData.end_date) {
      errors.end_date = 'Ending Date is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };


  // const handleInputChange = (event) => {
  //   const { name, value, type } = event.target;

  //   if (type === 'file') {  // Updated type value
  //     setFormData({
  //       ...formData,
  //       [name]: event.target.files[0],
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Store the previous content type
    setPrevContentType(formData.contenttype);

    if (type === 'file') {
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

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     try {
  //       const formDataToSend = new FormData();
  //       formDataToSend.append('news_tittle', formData.news_tittle);
  //       formDataToSend.append('contenttype', formData.contenttype);

  //       if (formData.contenttype === 4) {
  //         formDataToSend.append('external_file', formData.external_file);
  //       } else if (formData.contenttype === 3) {
  //         formDataToSend.append('internal_file', formData.internal_file);
  //       } else if (formData.contenttype ===2) {
  //         formDataToSend.append('file', file);
  //       } else if (formData.contenttype === 1) {
  //         formDataToSend.append('html', html);  // Updated field name
  //       }

  //       formDataToSend.append('startdate', formData.startdate);
  //       formDataToSend.append('end_date', formData.end_date);

  //         const response = await apiClient.put(apis.getwhatsnewbyid + id, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });
  //         console.log('Data updated:', response.data);
  //         toast.success('Data updated successfully!');
  //         openModal('Data updated successfully!');

  //     } catch (error) {
  //       console.error('Error saving/updating data:', error);
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('news_tittle', formData.news_tittle);
        formDataToSend.append('contenttype', formData.contenttype);

        if (formData.contenttype === 4) {
          formDataToSend.append('external_file', formData.external_file);
        } else if (formData.contenttype === 3) {
          formDataToSend.append('internal_file', formData.internal_file);
        } else if (formData.contenttype === 2) {
          formDataToSend.append('file', file); // Use file here
        } else if (formData.contenttype === 1) {
          formDataToSend.append('html', html);
        }

        formDataToSend.append('startdate', formData.startdate);
        formDataToSend.append('end_date', formData.end_date);

        const response = await apiClient.put(apis.Tenderbyid + id, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log('Data updated:', response.data);
        toast.success('Data updated successfully!');
        openModal('Data updated successfully!');
      } catch (error) {
        console.error('Error saving/updating data:', error);
      }
    }
  };

  console.log(formData)
  return (

         <div>
        <Header />
        <Sidebar />
      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Edit Tender</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Home</li>
              <li class="breadcrumb-item">Edit Tender</li>
            </ol>
          </nav>
        </div>
    <div className="list">
   
      <div className="listContainer">
    
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="col text-end">
              
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div class="box-sec">
                <h1 className="text-center heading-main">Tender</h1>
                <div className="mb-3">
                  <label className="form-label text-dark">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    name="news_tittle"
                    value={formData.news_tittle}
                    onChange={handleInputChange}
                  />
                  {errors.news_tittle && <div className="text-danger">{errors.news_tittle}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark">Select a content type</label>
                  <select
                    className="form-select"
                    name="contenttype"
                    value={formData.contenttype}
                    onChange={handleInputChange}
                  // onClick={handleChangeOptions}

                  >
                    <option value="">Select a content type</option>
                    {/* <option value={4}>External Link</option>
              <option value={3}>Internal Link</option>
              <option value={2}>File</option>
              <option value={1}>HTML</option> */}
                    {optionsData.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                  {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
                </div>

                {/* Render fields based on contenttype */}
                {formData.contenttype === 4 && (

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

                {formData.contenttype === 3 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Enter Internal Link</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Internal Link"
                      name="internal_file"
                      value={formData.internal_file}
                      onChange={handleInputChange}
                    />
                    {errors.internal_file && (
                      <div className="text-danger">{errors.internal_file}</div>
                    )}
                  </div>
                )}

                {formData.contenttype === 2 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Choose File</label>
                    <input
                      className="form-control"
                      type="file"


                      onChange={handleImageChange}
                    />
                    {errors.file && (
                      <div className="text-danger">{errors.file}</div>
                    )}
                  </div>
                )}

                {formData.contenttype === 1 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">HTML Editor</label>  {/* Updated label */}
                    <div>
                      {/* <FroalaEditorComponent
                        tag="textarea"
                        config={config}
                        model={html}
                        value={formData.html}
                        onModelChange={handleEditorChange}
                      /> */}
                      <JoditEditor
                        value={formData.html}
                        config={config}
                        tabIndex={1}
                        onChange={onChange}
                      />
                      {console.log("hf")}
                    </div>
                    {errors.html && (
                      <div className="text-danger">{errors.html}</div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  {formData.contenttype === "4" ? (
                    <>
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
                    </>
                  ) : formData.contenttype === "3" ? (
                    <>
                      <label className="form-label text-dark">Enter Internal Link</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Internal Link"
                        name="internal_file"
                        value={formData.internal_file}
                        onChange={handleInputChange}
                      />
                      {errors.internal_file && (
                        <div className="text-danger">{errors.internal_file}</div>
                      )}
                    </>
                  ) : formData.contenttype === "2" ? (
                    <>
                      <label className="form-label text-dark">Choose File</label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={handleImageChange}
                      />
                      {errors.file && (
                        <div className="text-danger">{errors.file}</div>
                      )}
                    </>
                  ) : formData.contenttype === "1" ? (
                    <>
                      <label className="form-label text-dark">HTML Editor</label>
                      <div>
                        {/* <FroalaEditorComponent
          tag="textarea"
          config={config}
          model={html}
          value={formData.html}
          onModelChange={handleEditorChange}
        /> */}
                        <JoditEditor
                          value={formData.html}
                          config={config}
                          tabIndex={1}
                          onChange={onChange}
                        />
                        {console.log("hf")}
                      </div>
                      {errors.html && (
                        <div className="text-danger">{errors.html}</div>
                      )}
                    </>
                  ) : null}
                </div>

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
                    Update
                  </button>
                 
                  <CustomModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
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
