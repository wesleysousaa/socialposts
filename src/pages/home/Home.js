import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'

// MUI
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Services
import { FetchPosts } from '../../services/FetchPosts'
import UpdatePost from '../../services/UpdatePost'

// Hooks
import { useUserContext } from '../../hooks/useUserContext';


function Home() {

  const [posts, setPosts] = useState()
  const { user } = useUserContext()
  const [like, setLike] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      setPosts(await FetchPosts())
    }
    fetchPosts()
  }, [like])

  async function likePost(post) {
    if (post.likes.includes(user.uid)) {
      post.likes = post.likes.filter(l => l !== user.uid)
    } else {
      post.likes.push(user.uid)
    }
    UpdatePost(post.id, post)
    await setPosts(await FetchPosts())
    setLike(!like)
  }

  return (
    <div className={styles.posts}>
      {!posts && <CircularProgress color='inherit' />}
      {posts && posts.map((p, k) => (
        <div className={styles.post} key={k}>
          <div className={styles.img_container}>
            <img src={p.imageLink} className={styles.img_post} onClick={() => likePost(p)} />
          </div>
          <div className={styles.description}>
            <div className={styles.hashtags}>
              {p.hashtags.map((h, k) => (
                <p key={k}>{`#${h}`}</p>
              ))}
            </div>
            <h2>{p.title}</h2>
          </div>
          <p className={styles.data}>{p.data}</p>
          {/* <div className={styles.like}> */}
            {p.likes && p.likes.includes(user.uid) && (
              <span className={styles.core_icon}>
                <FavoriteIcon color='error' fontSize='large' />
                Gostei!
              </span>
            )}
          </div>
        // </div>
      ))}
    </div>
  )
}

export default Home