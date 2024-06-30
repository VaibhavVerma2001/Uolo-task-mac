import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';
import searchImg from '../../static/search.png';
import Card from '../Card/Card';
import EmptyImg from '../../static/empty_box.png';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Loading from '../Loading/Loading';



function Main() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 8;
  const pageNumbers = [...Array(totalPage + 1).keys()].slice(1);

  const host = "http://localhost:5000";
  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchData = async () => {
    console.log("fetching data");
    try {
      setLoading(true);
      const res = await axios.get(`${host}/api/user?page=${page}&limit=${limit}`);
      // console.log("backend" , res.data);
      setUsers(res.data.user);
      // console.log(users);
      // set total pages
      setTotalPage(Math.ceil(res.data.total / limit));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchData();
  }, [page]);


  // Delete specific user
  const handleDelete = async (id) => {
    // console.log(`I got clicked for id : ${id}`);
    try {
      await axios.delete(`${host}/api/user/${id}`);

      // fetch data again after deleting to handle pagination etc
      fetchData();

      // console.log(users, users.length);
      if (page > 1 && users.length === 1) {
        setPage(page - 1);
      }
    } catch (err) {
      console.log(err);
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
      {loading ? (
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
          {users.length ? (<>
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
            <div className="empty">

              <img src={EmptyImg} alt="empty-img" />
              <span>No Team Members Found!</span>
              <span>Please Add Few Members To Display Records!</span>
            </div>

          </>)}
        </>
      )}


    </div>
  )
}

export default Main;
