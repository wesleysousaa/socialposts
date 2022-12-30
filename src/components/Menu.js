import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Menu.module.css'

import { useUserContext } from '../hooks/useUserContext'
import { useArthentication } from '../hooks/useAuthentication';

import { Drawer } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

function Menu() {

  const { user } = useUserContext()
  const { singOutt } = useArthentication()
  const [open, setOpen] = useState(false)

  return (
    <nav>
      <Link to='/' className={styles.logo}>
        Social <span className={styles.brand}><strong> Posts </strong></span>
      </Link>
      <ul className={styles.menu}>
        <li>
          <NavLink to='/' className={styles.botoes}>
              Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/painel' className={styles.botoes}>
            Painel
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className={styles.botoes}>
            Sobre nós
          </NavLink>
        </li>
        <li>
          {!user ?
            (<NavLink to={'/login'} className={styles.botoes}>
              Login
            </NavLink>) :
            (<Link onClick={singOutt} className={styles.botoes}>
              Sair
            </Link>)
          }
        </li>
      </ul>
      {/* <Drawer
        variant="persistent"
        anchor="right"
        open={open}
      >

        <ul className={styles.menu_mobile}>
          <li>
            <NavLink to='/' className={styles.botoes}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/painel' className={styles.botoes}>Painel</NavLink>
          </li>
          <li>
            <NavLink to='/about' className={styles.botoes}>Sobre nós</NavLink>
          </li>
          <li>
            {!user ?
              (<NavLink to={'/login'} className={styles.botoes}>Login</NavLink>) :
              (<Link onClick={singOutt} className={styles.botoes}>Sair</Link>)
            }
          </li>
        </ul>

      </Drawer>
      <button onClick={() => setOpen(!open)}>
        <MenuIcon />
      </button> */}
    </nav>
  )
}

export default Menu