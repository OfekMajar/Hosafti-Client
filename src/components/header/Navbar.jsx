import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/User';

function Navbar({ styles }) {
  const { globalUser } = useContext(UserContext);
  return (
    <nav className={styles.navbar}>
      <li className={styles.navbarLink}>
        <Link to={'/'}>עמוד בית</Link>
      </li>
      <li className={styles.navbarLink}>
        <Link to={'/myGroups'}>הקבוצות שלי</Link>
      </li>
      {globalUser?.lastUsedList && (
        <li className={styles.navbarLink}>
          <Link to={globalUser?.lastUsedList}>הרשימה האחרונה שלי</Link>
        </li>
      )}
    </nav>
  );
}

export default Navbar;
