

import React from 'react';
import { useParams } from 'react-router-dom';
import {freelancers} from '../data.js'
import { StarFill } from 'react-bootstrap-icons';

const TopProfile = () => {
    // Get the freelancer ID from the URL parameter
    const { freelancerId } = useParams();
  
    // Find the selected freelancer using the ID
    const selectedFreelancer = freelancers.find(
      (freelancer) => freelancer.id === parseInt(freelancerId) // Parse ID as integer
    );
  
    if (!selectedFreelancer) {
      return <p>Freelancer not found.</p>; // Handle non-existent freelancer
    }
  
    // Display freelancer details
    return (
      <div className="profile-container text-start background">

        <div className='container py-5 '>
          <div className='row'>
            <div className='col-sm-3 '>
            <img src={selectedFreelancer.img} class="w-100 h-100  m-auto img-thumbnail"/>
            </div>
            <div className='col-sm-9 mt-5'>
            <h2>{selectedFreelancer.name}</h2>
            < p className='mb-2'> {selectedFreelancer.job}</p>
            <span className='text-center mb-5 me-5'><StarFill className='star  '/> {selectedFreelancer.rate} <span className='text-muted review ms-2 '>({selectedFreelancer.review} Review)</span></span>
            <br></br>

   <div className='mt-4'><span className='fw-bold  '>Location:</span> <span className='review'>{selectedFreelancer.location}</span>
</div>
            <br></br>
            <h6 className='mt-3 ms-2'>My Skills</h6>
          
            <button className='me-3 btn1 mt-2 p-2 rounded-5 '>{selectedFreelancer.Skills.Skill1}</button>
              <button className='me-3 btn1 mt-2  p-2  rounded-5'>{selectedFreelancer.Skills.Skill2}</button>
            </div>
            <div className='py-4'>
            <h5>About Freelancer</h5>
            <p className='text-muted'>{selectedFreelancer.About_Freelancer}</p>
            </div>
           <div>
            <h5>Education</h5>
            <button className='me-3 btn1 w-25 mt-2 p-2 rounded-5 fs-6  '>{selectedFreelancer.Education.years}:{selectedFreelancer.Education.Bachlors}</button>

            
           <p className='text-muted mt-4'> {selectedFreelancer.Education.aboutBachlors}</p>

           </div>
           <div>
            <h5>Work & Experience</h5>
            <button className='me-3 btn1 w-25 mt-2 p-2 rounded-5 fs-6  '>{selectedFreelancer.Work_Experience.years}:{selectedFreelancer.Work_Experience.work}</button>

            
           <p className='text-muted mt-4'>{selectedFreelancer.Work_Experience.aboutWork}</p>

           </div>
          </div>
        
        </div>
       
        
        
        
      
        
      </div>
    );
  };
  
  export default TopProfile;
  