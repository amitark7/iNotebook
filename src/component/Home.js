import React from 'react'
import Notes from './Notes'


function Home(props) {
 const {showAlert}=props;

  return (
    <div className='home'> 
      <div className="max-width">
        <div className="home-content">
            <Notes showAlert={showAlert}/>
        </div>
      </div>  
    </div>
  )
}

export default Home
