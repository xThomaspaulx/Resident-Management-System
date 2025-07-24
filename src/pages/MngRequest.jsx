import React, { useEffect,useState } from 'react'
import Header from './Header'
import '../Styles/Manage.css';
import axios from 'axios'
import search from '../assets/image 2.png';

function MngRequest() {

  const [input, setInput] = useState([])
  
      useEffect(() => {
          axios.get("http://localhost:8080/Request").then((Response) => {
              console.log(Response.data)
              setInput(Response.data);
          }, [])
      }, [])

  const[Requestconfirmation,Request]=useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);


  const Cancel = () => {
    Request(false);
  };

  return (
    <>
    <div><Header/></div>
    
        <div style={{margin:'1%',textAlign: 'center',fontSize: '300%',color: '#133188'}}>
        Manage Requests
        </div>

          
        <search style={{margin:'50px',backgroundColor: 'gainsboro',borderRadius: '20px',padding: '10px',width: 'fit-content'}}>
        <input type="search" placeholder="Search"/>
        <img src={search} alt="search"style={{width: '20px',height: '20px',marginLeft: '8px'}}/>
        </search>

        <div style={{ display:'flex',justifyContent:'flex-end',marginRight:'15%'}}> 
          <a href="/history" style={{border:'2px dotted',padding: '10px'}}>HISTORY</a>
        </div>


        <table>
          <thead>
            <tr>
              <th>SLNO</th>
              <th>USER ID</th>
              <th>NAME</th>
              <th>FLAT NO.</th>
              <th>REQUEST</th>
              <th>Status</th>
              <th>Description</th>
              <th>CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {
              input.map((item, index) => (
                <tr key={index}>
                  <td>
                      {
                      item.r_id
                      }
                    </td>
                  <td>
                      {
                      item.u_id
                      }
                    </td>
                    <td>
                      {item.user.name}
                    </td>
                  <td>
                      {
                      item.f_id
                      }
                    </td>
                    <td>
                      {item.service.s_name}
                    </td>
                    <td>
                      {
                      item.status
                      }
                    </td>
                    
              <td >
                {
                  item.description
                } <br/>
                <button style={{border:'2px solid',fontWeight:'bold'}}
                onMouseOver={(e)=>{
                  e.target.style.backgroundColor='White';
                  e.target.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.5';}}

                onMouseOut={(e)=>{
                  e.target.style.backgroundColor='Transparent';
                  e.target.style.boxShadow = '3px 3px 8px rgba(0,0,0,0.3)'}}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRequest(item); 
                  Request(true);
                  }}>
                  VIEW
                </button>
              </td>
              <td>
                {item.user.u_no}
              </td>

            </tr>
            ))
          }
          </tbody>
        </table>

    {Requestconfirmation && selectedRequest && (
      <div style={{position: 'fixed',top: 0, left: 0, right: 0, bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)',display: 'flex',justifyContent: 'center',alignItems: 'center'}}
        onClick={Cancel}>
          
            <div style={{backgroundColor: 'white',padding: '30px',borderRadius: '12px',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',textAlign: 'left',width: '450px',maxWidth: '90%',position: 'relative',}}
            onClick={(e) => e.stopPropagation()}>

              {/* Close Button (X) */}
              <div onClick={Cancel}
              style={{position: 'absolute',top: '10px',right: '15px',cursor: 'pointer',fontWeight: 'bold',fontSize: '18px',color: '#333'}}>
                X
              </div>

              <div style={{fontSize: '20px',fontWeight: 'bold',marginBottom: '20px',textAlign: 'center',color: '#333'}}>
              REQUEST DETAILS
              </div>

              <table style={{ width: '100%', fontSize: '15px', color: '#111' }}>
                <tbody>
                  
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: '8px 5px' }}>REQUESTED SERVICE:</td>
                    <td>{selectedRequest.s_id}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: 'bold', padding: '8px 5px' }}>PROBLEM DESCRIPTION:</td>
                    <td>{selectedRequest.description}</td>
                  </tr>

                  <tr>
                    <td style={{ fontWeight: 'bold', padding: '8px 5px' }}>DATE OF REQUEST:</td>
                    <td>{selectedRequest.date}</td>
                  </tr>
                    
                  <tr>
                    <td style={{ fontWeight: 'bold', padding: '8px 5px' }}>DATE OF EXPECTED SERVICE:</td>
                    <td>{selectedRequest.exp_completion}</td>
                  </tr>
                
                </tbody>
              </table>
            </div>
        </div>
        
    )}


        
    
    </>
  )
}

export default MngRequest