import React from 'react';
import { Link } from 'react-router-dom';
import {StarFill,ArrowUpRight,Heart} from 'react-bootstrap-icons';
const Freelancer = ({ freelancers }) => { // Receive freelancers data as props

  return (
    <>
        


    <div className="Testimonials text-start bg-white py-5">

     <div className='container py-4'>
     <h2>Highest Rated Freelancers</h2>
      < p className='text-muted'>Lorem ipsum dolor sit amet, consectetur.</p>
    <div className='row'>
    {freelancers.map((freelancer) => (
    <div className=' col-lg-3 col-md-6 py-3 col-sm-6 col-12 '>
                        <div className='card p-3'>
                          <p key={freelancer.id} className="freelancer-item"></p>
                        <img src={freelancer.img} class="w-20 h-20 rounded-circle m-auto img-thumbnail"/>
                        <div className='ico  d-flex justify-content-center align-items-center'>    <Heart /></div>

                        <h6 class="mt-3 mb-1 text-center">{freelancer.name}</h6>
                        <p class="text-muted text-center small">{freelancer.job}</p>

                      <span className='text-center'><StarFill className='star  '/> {freelancer.rate} <span className='text-muted review ms-2 '>({freelancer.review} Review)</span></span>

                          <br></br>
                          <button className='me-3 btn1 mt-3 rounded-5 '>{freelancer.Skills.Skill1}</button>
                        <button className='me-3 btn1 mt-3   rounded-5'>{freelancer.Skills.Skill2}</button>  
                         <div className='card-footer m-auto  mt-4'>
                         <p><span className='fw-bold'>Location:</span> {freelancer.location}</p>
                         <p><span className='fw-bold'>Rate:</span> {freelancer.Rate}</p>
                         </div>
                         <Link className='w-100 m-auto text-success text-decoration-none text-center view rounded-5 p-2 ' to={`/topprofile/${freelancer.id}`}>View Profile  <ArrowUpRight className='ms-2 fs-5'/></Link> 

                        </div>
                    </div>
                     ))}
                    </div>
                    </div>
                    </div>
    
    
    </>
  );
};

export default Freelancer;
