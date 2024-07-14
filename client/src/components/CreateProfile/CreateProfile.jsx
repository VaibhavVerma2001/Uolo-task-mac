import React, { useState, useContext } from 'react';
import './createprofile.css';
import SuccessModal from '../shared/SuccessModal/SuccessModal';
import axios from 'axios';
import ServerError from '../shared/ServerError/ServerError';
import uploadSVG from '../../static/upload-pic.svg';
import UserContext from '../../context/UserContext';

function Profile() {

    const context = useContext(UserContext);
    const { setUser } = context;

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
    const [modalMessage, setmodalMessage] = useState(""); // show sucess modal

    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (validate()) {

                const formData = new FormData();

                formData.append("image", file);
                // trim spaces
                formData.append("name", values.name.trim());
                formData.append("email", values.email.trim());
                formData.append("password", values.password);
                formData.append("cpassword", values.cpassword);

                const res = await axios.post("http://localhost:5000/api/user/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token: "bearer " + localStorage.getItem('accessToken')
                    }
                });
                const data = res.data;

                if (data.success) {
                    // show success modal
                    setShowModal(true);
                    setmodalMessage("User has been successfully created");

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
                } else {
                    console.log(res.data);
                    if (res.data.err === "Email already exists") {
                        setEmailExistsError(true);
                    }
                    // when authentication failed or token expired -> send user back to login page
                    if (res.data.err === "You are not authenticated!" || res.data.err === "Token is not valid!") {
                        setShowModal(true);
                        setmodalMessage("Token Expired, Login again to continue.")
                        setTimeout(() => {
                            localStorage.removeItem("user");
                            localStorage.removeItem("accessToken");
                            setUser(null);
                            setShowModal(false);
                        }, 2500);
                    }
                }
            }
        } catch (error) {
            console.log("Error in handleSubmit:", error);
            setServerError(true);
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

        if (values.name.trim().length < 3) {
            IsValid = false;
            error.name = "Name must contain at least 3 letters.";
        }

        let nameRegex = /^[a-zA-Z0-9 ]+$/

        if (!nameRegex.test(values.name)) {
            IsValid = false;
            error.name = "Name can contain only letters, numbers and spaces.";
        }


        // eslint-disable-next-line 
        let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

        if (!emailRegex.test(values.email)) {
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
                    <form className='myform' encType="multipart/form-data">
                        <div className="form-container">
                            <span>Upload Photo<span className="red">*</span></span>
                            <span className='msg'>Upload a passport size photo</span>

                            {file ? (
                                <>
                                    <label htmlFor="upload-photo" style={{ marginBottom: "0px" }}>
                                        <img className='upload-img' src={URL.createObjectURL(file)} alt="Uploaded-img" />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label htmlFor="upload-photo">
                                        <img src={uploadSVG} alt="" />
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
                            {emailExistsError && <span className='error-text'>This email already exists.</span>}

                            <label htmlFor="password">Password<span className="red">*</span></label>
                            <input type="password" id='password' name='password' value={values.password} placeholder='Enter password' onChange={handleChange} />
                            {errors.password && <span className='error-text'>{errors.password}</span>}

                            <label htmlFor="cpassword">Confirm Password<span className="red">*</span></label>
                            <input type="password" id='cpassword' name='cpassword' value={values.cpassword} placeholder='Confirm Password' onChange={handleChange} />
                            {errors.cpassword && <span className='error-text'>{errors.cpassword}</span>}
                        </div>

                        <div className="btn-container">
                            <button className="cancel" onClick={handleCancel}>Cancel</button>
                            <button type='submit' className={`${isDisable() ? 'disable' : 'save'}`} disabled={isDisable()} onClick={handleSubmit}>Save</button>
                        </div>

                    </form>

                    {showModal && <SuccessModal message={modalMessage} setShowModal={setShowModal} />}
                </>
            ) : (
                <ServerError />
            )}

        </div>
    );
}

export default Profile;
