import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';
import searchImg from '../../static/search.png';
import Card from '../Card/Card';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Loading from '../Loading/Loading';
import Empty from '../Empty/Empty';
import ServerError from '../ServerError/ServerError';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Main() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(false);
  const limit = 8;
  const pageNumbers = [...Array(totalPage + 1).keys()].slice(1);

  const host = "http://localhost:5000";
  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      setLoading(true);
      const res = await axios.get(`${host}/api/user?page=${page}&limit=${limit}`);
      // console.log("backend", res.data);
      if (res.data.success) {
        setUsers(res.data.user);
        // console.log(users);
        setTotalPage(Math.ceil(res.data.total / limit));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }


  useEffect(() => {
    fetchData();
  }, [page]);


  // Delete specific user
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`${host}/api/user/${userId}`);

      if (res.data.success) {
        // fetch data again after deleting to handle pagination etc
        await fetchData();

        // console.log(users, users.length);
        if (page > 1 && users.length === 1) {
          setPage(page - 1);
        }

        // show sucess toast
        toast.success('User deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }


  // handle previous page button
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((page - 1));
    }
  }

  // handle next page button
  const handleNextPage = () => {
    if (page !== totalPage) {
      setPage(page + 1);
    }
  }

  // Function to disable next and previous buttons
  // Disable previous and next buttons
  const disablePrev = page === 1;
  const disableNext = page === totalPage;

  return (
    <div className='main'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ position: "absolute", top: "75px" }}
      />
      {!error && loading ? (
        <Loading />
      ) : (
        <>
          <span className="head">Our Team</span>

          <div className="search-box">
            <div className="search">
              <img src={searchImg} alt="search-icon" />
              <input type="text" placeholder='Search by name, or Email id' />

            </div>

            <button className='btn'>Search</button>
          </div>


          {/* User cards */}
          {!error && users.length ? (<>
            <div className="card-container">
              {users.map((user, index) => (
                <div key={index}>
                  <Card user={user} handleDelete={handleDelete} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="btn-container">
              <div className={`page-item ${disablePrev ? 'disabled-arrow' : ''}`} onClick={handlePrevPage} >
                <KeyboardArrowLeftIcon className='arrow-icon' />
              </div>


              {/* Mapping through each page number */}
              {pageNumbers.map(pgNumber => (
                <div key={pgNumber} onClick={() => setPage(pgNumber)} className={`page-item ${page === pgNumber ? 'active-page-item' : ''} `} >
                  <span className={`page-num ${page === pgNumber ? 'active-page-num' : ''} `}>
                    {pgNumber}
                  </span>
                </div>
              ))}

              <div className={`page-item ${disableNext ? 'disabled-arrow' : ''}`} onClick={handleNextPage} >
                <KeyboardArrowRightIcon className='arrow-icon' />
              </div>

            </div>

          </>) : (<>
            {/* When there are no records to display */}
            {error && <ServerError />}
            {!error && <Empty />}
          </>)}
        </>
      )}


    </div>
  )
}

export default Main;
