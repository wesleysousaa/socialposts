import React, { useEffect, useState } from 'react'
import styles from './Painel.module.css'

// MUI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';

// Hooks
import { useUserContext } from '../../hooks/useUserContext'

// Services
import { FetchPosts } from '../../services/FetchPosts';
import { DeletePost } from '../../services/RemovePost'

// Contexts
import { LoadingContextValue } from '../../context/LoadingContext';
import FormPost from './FormPost';

function Painel() {

  const [postClicked, setPostClicked] = useState()
  const [open, setOpen] = useState(false)
  const [posts, setPosts] = useState()

  const { loading } = LoadingContextValue()
  const { user } = useUserContext()


  useEffect(() => {
    async function setPostss() {
      setPosts((await FetchPosts()).filter(post => post.uid === user.uid))
    }
    setPostss()
  }, [loading])

  function postClick(p) {
    setOpen(true)
    setPostClicked(p)
  }

  function handleClose() {
    setPostClicked()
    setOpen(false)
  }

  async function deletePost(post) {
    await DeletePost(post)
    await setPosts((await FetchPosts()).filter(post => post.uid === user.uid))
  }

  return (
    <div className={styles.container}>
      <Dialog open={open} onClose={handleClose}>
        <div className={styles.back_button}>
          <IconButton color="inherit"  onClick={handleClose}>
            <ArrowBackIosIcon color='action'  />
          </IconButton>
        </div>
        <DialogContent>
          <FormPost post={postClicked} />
        </DialogContent>
        <DialogActions>
          {/* {!loading ? <button onClick={handleClose}>Voltar</button> : <CircularProgress />} */}
        </DialogActions>
      </Dialog>
      <div className={styles.new_post}>
        <FormPost />
      </div>
      <div className={styles.posts_area}>
        <h1>{posts && posts.length > 0 ? 'SEUS POSTS' : 'VOCÊ AINDA NÃO PUBLICOU NADA'}</h1>
        <div className={styles.posts}>
          {posts && posts.map((p, k) => (
            <div className={styles.post} key={k}>
              <img src={p.imageLink} onClick={() => postClick(p)} alt="Imagem_post" className={styles.img_post} />
              <button onClick={() => deletePost(p)}>
                <DeleteIcon color='inherit' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Painel