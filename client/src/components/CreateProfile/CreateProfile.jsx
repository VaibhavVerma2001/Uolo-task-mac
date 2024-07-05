import React, { useState } from 'react';
import './createprofile.css';
import SuccessModal from '../SuccessModal/SuccessModal';
import axios from 'axios';
import ServerError from '../ServerError/ServerError';

function Profile() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const [errors, setErrors] = useState({}); // for validation errors
    const [serverError, setServerError] = useState(false); // to handle exception from server
    const [emailExistsError, setEmailExistsError] = useState(false); // to handle email already exists error
    const [showModal, setShowModal] = useState(false); // show sucess modal

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validate()) {

                const formData = new FormData();

                formData.append("image", file);
                formData.append("name", values.name);
                formData.append("email", values.email);

                // hit add user api
                const res = await axios.post("http://localhost:5000/api/user/", formData, {
                    headers: { "Content-Type": 'multipart/form-data' }
                });

                if (res.data.success) {
                    // show success modal
                    setShowModal(true);

                    // make states Null after submitting data
                    setValues({
                        name: "",
                        email: "",
                        password: "",
                        cpassword: ""
                    });
                    setErrors({});
                    setEmailExistsError(false); // clear email error
                    setFile(null);
                }
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error === "Email already exists") {
                setEmailExistsError(true);
            }
            else {
                setServerError(true);
                console.log(error);
            }
        }
    }

    // when cancelling make all field empty
    const handleCancel = (e) => {
        e.preventDefault();

        // Make states Empty
        setValues({
            name: "",
            email: "",
            password: "",
            cpassword: ""
        });
        setEmailExistsError(false);
        setErrors({});
        setFile(null);
    }

    // Disable function -> to disable submit button if all field are not filled
    const isDisable = () => {
        return (
            values.name === "" ||
            values.email === "" ||
            values.password === "" ||
            values.cpassword === "" ||
            file === null
        );
    }

    const validate = () => {
        let error = {};
        let IsValid = true;

        if (values.name.length < 4) {
            IsValid = false;
            error.name = "Name must contain at least 4 letters.";
        }

        // eslint-disable-next-line 
        let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        if (!regex.test(values.email)) {
            IsValid = false;
            error.email = "Enter a valid email.";
        }

        if (values.password.length < 4) {
            IsValid = false;
            error.password = "Password must contain at least 4 letters";
        }

        if (values.password !== values.cpassword) {
            IsValid = false;
            error.cpassword = "Passwords do not match";
        }
        setErrors(error);
        return IsValid;
    }


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className='profile'>
            {!serverError ? (
                <>
                    <span className="head">Create Profile</span>
                    <form className='myform'>
                        <div className="form-container">
                            <span>Upload Photo<span className="red">*</span></span>
                            <span className='msg'>Upload a passport size photo</span>

                            {file ? (
                                <>
                                    <label htmlFor="upload-photo" style={{ marginBottom: "0px" }}>
                                        <img src={URL.createObjectURL(file)} alt="Uploaded-img" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label htmlFor="upload-photo">
                                        <svg width="148" height="148" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M74 148C114.869 148 148 114.869 148 74C148 33.1309 114.869 0 74 0C33.1309 0 0 33.1309 0 74C0 114.869 33.1309 148 74 148Z" fill="#FFF8E7" />
                                            <path d="M74.2126 125.849C98.5566 125.849 118.291 106.107 118.291 81.7547C118.291 57.4022 98.5566 37.6606 74.2126 37.6606C49.8685 37.6606 30.1338 57.4022 30.1338 81.7547C30.1338 106.107 49.8685 125.849 74.2126 125.849Z" fill="#FF8F66" />
                                            <path d="M74.5897 70.4875C74.5897 78.1252 80.7972 84.333 88.4344 84.333C96.0717 84.333 102.279 78.1252 102.279 70.4875C102.279 62.8499 96.0717 56.6421 88.4344 56.6421C80.7972 56.6421 74.5897 62.8499 74.5897 70.4875Z" fill="white" />
                                            <path d="M78.0074 70.9756C78.0074 73.5215 80.0649 75.5791 82.6107 75.5791C85.1564 75.5791 87.2139 73.5215 87.2139 70.9756C87.2139 68.4297 85.1564 66.3721 82.6107 66.3721C80.0998 66.3721 78.0074 68.4297 78.0074 70.9756Z" fill="black" />
                                            <path d="M45.1914 71.4991C45.1914 79.1368 51.3989 85.3446 59.0361 85.3446C66.6734 85.3446 72.8808 79.1368 72.8808 71.4991C72.8808 63.8615 66.6734 57.6537 59.0361 57.6537C51.3989 57.6188 45.1914 63.8266 45.1914 71.4991Z" fill="white" />
                                            <path d="M48.6436 71.9875C48.6436 74.5334 50.7011 76.591 53.2468 76.591C55.7926 76.591 57.8501 74.5334 57.8501 71.9875C57.8501 69.4416 55.7926 67.384 53.2468 67.384C50.7011 67.3491 48.6436 69.4416 48.6436 71.9875Z" fill="black" />
                                            <path d="M65.732 97.8995C56.4557 97.4112 60.222 107.909 59.4548 112.931C57.9552 123.184 50.1785 114.674 50.9457 107.665C51.7129 102.642 54.9561 99.155 58.4434 95.8767L65.732 97.8995Z" fill="#E86792" />
                                            <path d="M107.231 78.9971C107.092 80.6362 106.464 82.3102 105.767 83.775C104.023 87.5066 101.094 90.5408 97.676 92.8076C91.8521 96.6439 84.7032 98.0738 77.868 98.4574C72.7068 98.7713 67.5106 98.5272 62.4889 97.4112C58.1646 96.4347 54.0147 94.6909 50.4576 92.1101C46.2728 89.076 43.0993 84.8561 41.0069 80.148C40.8674 79.869 41.3208 79.59 41.4254 79.9038C44.3548 86.565 49.4114 91.7614 56.0373 94.7606C61.3729 97.167 67.3014 98.0389 73.1252 98.1087C84.18 98.2482 97.5017 95.8767 104.023 85.9024C105.313 83.9145 106.534 81.3337 106.743 79.032C106.743 78.6832 107.266 78.6832 107.231 78.9971Z" fill="#332627" />
                                            <path d="M109.146 55.5002L112.501 46.5095L106.344 48.4134V38.9997L98.7689 41.1152L97.3507 32.9707L89.6372 36.1086L88.565 28.8456L81.7163 33.8521L76.2512 26.6244L71.7892 33.147L65.7361 26.977L62.8998 35.1214L56.397 29.6565L54.9097 38.7177L46.4699 34.4163L47.7151 43.971L38.5835 40.3748L41.5582 51.093L33.6719 50.2468L38.6527 57.6861C38.6527 57.6861 49.2716 45.3108 65.5285 40.2337C65.5285 40.1985 92.024 34.8393 109.146 55.5002Z" fill="#7342E7" />
                                            <circle cx="124" cy="124" r="20" fill="white" stroke="#D0D5DD" strokeWidth="2" />
                                            <path d="M133 127V131C133 131.53 132.789 132.039 132.414 132.414C132.039 132.789 131.53 133 131 133H117C116.47 133 115.961 132.789 115.586 132.414C115.211 132.039 115 131.53 115 131V127M129 120L124 115M124 115L119 120M124 115V127" stroke="#561FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </label>

                                </>
                            )}

                            {/* For Image */}
                            <input type="file" id="upload-photo" name="upload-photo" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />

                            <label htmlFor="name">Name<span className="red">*</span></label>
                            <input type="text" id='name' name='name' value={values.name} placeholder='Enter full name' onChange={handleChange} />
                            {errors.name && <span className='error-text'>{errors.name}</span>}

                            <label htmlFor="email">Email-ID<span className="red">*</span></label>
                            <input type="text" id='email' name='email' value={values.email} placeholder='Enter email' onChange={handleChange} />
                            {errors.email && <span className='error-text'>{errors.email}</span>}

                            <label htmlFor="password">Password<span className="red">*</span></label>
                            <input type="password" id='password' name='password' value={values.password} placeholder='Enter password' onChange={handleChange} />
                            {errors.password && <span className='error-text'>{errors.password}</span>}

                            <label htmlFor="cpassword">Confirm Password<span className="red">*</span></label>
                            <input type="password" id='cpassword' name='cpassword' value={values.cpassword} placeholder='Confirm Password' onChange={handleChange} />
                            {errors.cpassword && <span className='error-text'>{errors.cpassword}</span>}
                        </div>

                        <div className="btn-container">
                            {emailExistsError && <span className='error-text'>This email already exists.</span>}
                            <button className="cancel" onClick={handleCancel}>Cancel</button>
                            <button type='submit' className={`${isDisable() ? 'disable' : 'save'}`} disabled={isDisable()} onClick={handleSubmit}>Save</button>
                        </div>
                    </form>

                    {showModal && <SuccessModal message={"User has been successfully created"} setShowModal={setShowModal} />}
                </>
            ) : (
                <ServerError />
            )}

        </div>
    );
}

export default Profile;
