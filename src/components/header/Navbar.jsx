import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({styles}) {
  return (
    <nav className={styles.navbar}>
    <li className={styles.navbarLink}><Link to={"/"}>עמוד בית</Link></li>
    <li className={styles.navbarLink}><Link to={"/myGroups"}>הקבוצות שלי</Link></li>
    </nav>
  )
}

export default Navbar
