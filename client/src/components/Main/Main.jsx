import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './main.css';
import searchImg from '../../static/search.png';
import Card from '../Card/Card';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Loading from '../shared/Loading/Loading';
import Empty from '../Empty/Empty';
import ServerError from '../shared/ServerError/ServerError';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessModal from '../shared/SuccessModal/SuccessModal';
import UserContext from '../../context/UserContext';
import ClearIcon from '@mui/icons-material/Clear';


function Main() {

  const context = useContext(UserContext);
  const { setUser } = context;

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [clearIcon, setClearIcon] = useState(""); // to show clear text icon

  const limit = 8;
  const pageNumbers = [...Array(totalPage + 1).keys()].slice(1);

  const host = "http://localhost:5000";
  const [loading, setLoading] = useState(false);

  // Fetch Users
  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      setLoading(true);
      const res = await axios.get(`${host}/api/user?page=${page}&limit=${limit}&query=${query}`, {
        headers: {
          token: "bearer " + localStorage.getItem('accessToken'),
        }
      });
      // console.log(res.data);
      if (res.data.success) {
        setUsers(res.data.data.users);
        setTotalPage(Math.ceil(res.data.data.total / limit));
      }
      else {
        // when authentication failed or token expired -> send user back to login page
        if (res.data.err === "You are not authenticated!" || res.data.err === "Token is not valid!") {
          setShowModal(true);
          setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setUser(null);
            setShowModal(false);
          }, 2500);
        }
        else if (res.data.err === "Error in searching documents in elastic") {
          toast.error('Failed to fetch data from elastic serach!', {
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
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, query]);


  // Delete specific user
  const handleDelete = async (userId) => {
    try {
      const res = await axios.put(`${host}/api/user/${userId}`, {}, {
        headers: {
          token: "bearer " + localStorage.getItem('accessToken'),
        }
      });

      if (res.data.success) {
        // fetch data again after deleting to handle pagination etc
        setTimeout(async () => {
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
        }, 1000); // applying timeout bec it takes time for elastic search to delete, so fetch after 1 seconds


      }
      else {
        console.log(res.data);
        // when authentication failed or token expired -> send user back to login page
        if (res.data.err === "You are not authenticated!" || res.data.err === "Token is not valid!") {
          setShowModal(true);
          setTimeout(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            setUser(null);
            setShowModal(false);
          }, 2500);
        }
        else if (res.data.err === "Error in updating document in elastic") {
          toast.error('Failed to delete user!', {
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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // set page 1 so that if we are searching from any page then search results must show from page 1
    setQuery(searchText);

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

          <form onSubmit={handleSearch}>
            <div className="search-box">

              <div className="search">
                <img src={searchImg} alt="search-icon" />
                <input type="text" placeholder='Search by name, or Email id' value={searchText} onChange={(e) => setSearchText(e.target.value)} onFocus={() => setClearIcon(true)} />
                {clearIcon && <ClearIcon className='clear-icon' onClick={() => { setSearchText(""); setClearIcon(false); setQuery("") }} />}
              </div>

              <button type='submit' className='btn' onClick={() => setClearIcon(false)}>Search</button>
            </div>
          </form>


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

      {showModal && <SuccessModal message={"Token Expired, Login again to continue."} />}

    </div>
  )
}

export default Main;
