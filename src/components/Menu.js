import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Menu.module.css'

// Hooks
import { useUserContext } from '../hooks/useUserContext'
import { useArthentication } from '../hooks/useAuthentication';

// MUI
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

function Menu() {

  const { user } = useUserContext()
  const { singOutt } = useArthentication()

  return (
    <nav>
      <Link to='/' className={styles.logo}>
        Social <span className={styles.brand}><strong> Posts </strong></span>
      </Link>
      <ul className={styles.menuul}>
        <li>
          <NavLink to='/' className={styles.botoes}>
            <span className={styles.icon}>
              <HomeIcon />
            </span>
            <span className={styles.text}>
              Home
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/painel' className={styles.botoes}>
            <span className={styles.icon}>
              <DashboardIcon />
            </span>
            <span className={styles.text}>
              Painel
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className={styles.botoes}>
            <span className={styles.icon}>
              <InfoIcon />
            </span>
            <span className={styles.text}>
              Sobre nós
            </span>
          </NavLink>
        </li>
        <li>
          {!user ?
            (<NavLink to={'/login'} className={styles.botoes}>
              <span className={styles.icon}>
                <LoginIcon />
              </span>
              <span className={styles.text}>
                Login
              </span>
            </NavLink>) :
            (<Link onClick={singOutt} className={styles.botoes}>
              <span className={styles.icon}>
                <LogoutIcon />
              </span>
              <span className={styles.text}>
                Sair
              </span>
            </Link>)
          }
        </li>
      </ul>
      {/* <div className="menu_mobile">
        <ul className={styles.menu_mobile}>
          <li>
            <NavLink to='/' className={styles.botoes}>

            </NavLink>
          </li>
          <li>
            <NavLink to='/painel' className={styles.botoes}></NavLink>
          </li>
          <li>
            <NavLink to='/about' className={styles.botoes}></NavLink>
          </li>
          <li>
            {!user ?
              (<NavLink to={'/login'} className={styles.botoes}></NavLink>) :
              (<Link onClick={singOutt} className={styles.botoes}></Link>)
            }
          </li>
        </ul>
      </div> */}
    </nav>
  )
}

export default Menu