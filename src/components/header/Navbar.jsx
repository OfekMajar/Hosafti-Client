import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({styles}) {
  return (
    <nav className={styles.navbar}>
    <li className={styles.navbarLink}><Link to={"/"}>Home</Link></li>
    <li className={styles.navbarLink}><Link to={"/myGroups"}>MyGroups</Link></li>
    </nav>
  )
}

export default Navbar
