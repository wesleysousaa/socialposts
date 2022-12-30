import React from 'react'
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.info}>
      <div className={styles.sobre}>
        <h1>Sobre nós</h1>
        <h2>Esse site foi desenvolvido com o intuito de aprimorar habilidades em front-end</h2>
        <span>Wesley Alencar</span>
      </div>
      <div className={styles.tecstitle}>
        <h1>Tecnologias</h1>
        <div className={styles.tecs}>
          <div className={styles.firebase}>
            <h2>FireBase</h2>
            <a href='https://firebase.google.com/' target='_blank'>
              <img
                className={styles.img}
                src="https://www.gstatic.com/devrel-devsite/prod/vdbc400b97a86c8815ab6ee057e8dc91626aee8cf89b10f7d89037e5a33539f53/firebase/images/touchicon-180.png"
                alt="firebase" />
            </a>
          </div>
          <div className={styles.react}>
            <h2>ReactJs</h2>
            <a href='https://pt-br.reactjs.org/' target='_blank'>
              <img
                className={styles.img}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                alt="react" />
            </a>
          </div>
          <div className={styles.react}>
            <h2>MUI</h2>
            <a href='https://mui.com/' target='_blank'>
              <img
                className={styles.img}
                src="https://mui.com/static/logo.png"
                alt="mui" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About