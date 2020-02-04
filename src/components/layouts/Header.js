import React from 'react';
import logo from '../../assets/to-do.png'
import {FaPizzaSlice} from 'react-icons/fa';


export default function Header () {
  const x = 1;

  return (
  <header className='header' data-testid='header'>
    <nav>
      <div className="logo">
        <img src={logo} alt='to-do-list' />
      </div>
      <div className="settings">
        <ul>
          <li>+</li>
          <li><FaPizzaSlice/></li>
        </ul>
      </div>
    </nav>
  </header>
  )
}
