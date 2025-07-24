import React from 'react'
import Header from './Header'
import '../Styles/Manage.css';
import search from '../assets/image 2.png';

function History() {

  return (
    <>
    <div><Header/></div>
    
        <header style={{margin:'1%',textAlign: 'center',fontSize: '300%',color: '#133188'}}>
        History
        </header>

          
        <search style={{margin:'50px',display: 'flex',alignItems: 'center',backgroundColor: 'gainsboro',borderRadius: '20px',padding: '10px',width: 'fit-content'}}>

        <input type="search" placeholder="Search"/>
        <img src={search} alt="search"style={{width: '20px',height: '20px',marginLeft: '8px'}}/>
        </search>

        <div style={{ display:'flex',justifyContent:'flex-end',marginRight:'15%'}}> 
          <a href="/Request" style={{border:'2px dotted',padding: '10px'}}>PENDING</a>
          </div>


        <table>
          <thead>
            <tr>
              <th>SLNO</th>
              <th>USER ID</th>
              <th>NAME</th>
              <th>FLAT NO.</th>
              <th>CONTACT</th>
              <th>REQUEST</th>
              <th>ASSIGNED PERSONNEL</th>
              <th>COMPLETION DATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>565</td>
              <td>Nia</td>
              <td>707</td>
              <td>5656565656</td>
              <td >
                Plumbing
              </td>
              <td>
                RAJESH <br />
                +91 325424123
              </td>
              <td>
                25/01/24
              </td>

            </tr>
          </tbody>
        </table>
    </>
  )
}

export default History