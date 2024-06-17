import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../..';
import axios from 'axios';
import { BASE_URL } from '../../lib/Constant';

function JobDetails() {
  const {id}=useParams();
  const [job,setJob]=useState({});
  const navigateTo=useNavigate();

  const {isAuthorized,user}=useContext(Context);

  useEffect(()=>{
    axios.get(`${BASE_URL}/v1/job/${id}`,{withCredentials:true})
    .then((res)=>setJob(res.data.job))
    .catch((error)=>{
      console.log(error.response.data.message);
    })
  },[])

  if(!isAuthorized){
    navigateTo("/login");
  }
  return (
  <div className="jobDetail page">
    <div className="container">
      <h3>Job Details</h3>
      <div className="banner">
        <p>Title:  <span>{job.title}</span></p>
        <p>Employer:  <span>{job.employerName}</span></p>
        <p>Category: <span>{job.category}</span></p>
        <p>Country: <span>{job.country}</span></p>
        <p>Location: <span>{job.location}</span></p>
        <p>Description: <span>{job.description}</span></p>
        <p>Job Posted On: <span>{job.jobPostedOn}</span></p>
        <p>
          Salary: {job.fixedSalary ?(<span>${job.fixedSalary}</span>):(<span>${job.salaryFrom} - ${job.salaryTo}</span>)}
        </p>
        <p>
          {user && user.role==='Employer' ?<></>:<Link to={`/application/${job._id}`}>Apply Now</Link>
          
          }
        </p>
      </div>
    </div>
  </div>
  )
}

export default JobDetails