import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../lib/Constant';
import axios from 'axios';
import { Context } from '../../index';
import '../../App.css'
function Jobs() {
  const [jobs,setJobs]=useState([]);
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try{
      axios.get(`${BASE_URL}/v1/job/getall`,{withCredentials:true})
      .then((res)=>{
        setJobs(res.data);
      })
    }catch(error){
      console.log(error)
    }
  },[])
  if(!isAuthorized){
    navigateTo("/login");
  }
  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
        {jobs.jobs && jobs.jobs.map(element=>{
            return(
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Jobs Details</Link>
              </div>
            )
          })
        }
        </div>

      </div>
    </section>
  )
}

export default Jobs