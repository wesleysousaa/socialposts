import React, { useState } from 'react'
import styles from './Painel.module.css'

// Contexts
import { LoadingContextValue } from '../../context/LoadingContext'

// Hooks
import { useUserContext } from '../../hooks/useUserContext'
import UpdatePost from '../../services/UpdatePost'

// MUI
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadImage from '../../services/UploadImage';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import TagIcon from '@mui/icons-material/Tag';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

// Services
import { AddPost } from '../../services/AddPost';

function FormPost({ post }) {

    const [imageURL, setImageURL] = useState(post ? post.imageLink : undefined)
    const [image, setImage] = useState()
    const [title, setTitle] = useState(post ? post.title : undefined)
    const [hashtags, setHashtags] = useState(post ? post.hashtags : [])
    const [inputHash, setInputHash] = useState('')
    const [inputHashOpen, setInputHashOpen] = useState(false)

    const [erro, setErro] = useState()
    const { loading, setLoading } = LoadingContextValue()
    const { user } = useUserContext()

    const { enqueueSnackbar } = useSnackbar()

    async function uploadImage(fileImg) {
        setLoading(true)
        setImage(fileImg)
        setImageURL(await UploadImage(fileImg, user.uid, true))
        setLoading(false)
    }

    async function uploadPost(e) {
        e.preventDefault()

        if (!post) {
            if (!image || title.trim().length === 0) {
                setErro('Preencha todos os campos')
                return
            }
        } else {
            if (title.trim().length === 0) {
                setErro('Preencha todos os campos')
                return
            }
        }

        setLoading(true)


        const newPost = {
            uid: user.uid,
            description: title,
            hashtags: hashtags.length === 0 ? ['mypost'] : hashtags,
            imageLink: imageURL,
            likes: []
        }

        if (post) {
            newPost.data = post.data
            newPost.likes = post.likes
        }

        post ? await UpdatePost(post.id, newPost) : await AddPost(newPost, image, user.uid)

        const variant = 'success'
        enqueueSnackbar('Post Publicado', { variant })

        setErro()
        if (!post) {
            setTitle('')
            setHashtags('')
            setImage()
            setImageURL()
        }
        setLoading(false)
    }

    function handleRemoveHashtag(h) {
        setHashtags(hashtags.filter(hs => hs !== h))
    }

    function handleAddHash() {
        if (inputHashOpen) {
            const str = inputHash.replace('#', '')
            if (str.trim().length === 0) {
                return
            }
            let arr = hashtags
            arr.push(str)
            setHashtags(arr)
            setInputHashOpen(false)
            setInputHash('')
        } else {
            setInputHashOpen(true)
        }
    }

    return (
        <>
            {erro && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {erro} — <strong>Verifique novamente</strong>
                </Alert>
            )}
            {/* <h1>Publique um novo post</h1> */}
            <form className={styles.form} onSubmit={(e) => uploadPost(e)}>
                <h2>{post ? 'EDITAR POST' : 'NOVO POST'}</h2>
                <label>
                    <textarea maxLength={100} value={title} onChange={(e) => setTitle(e.target.value)} className={styles.txt_area} placeholder='Digite a descrição do seu post' ></textarea>
                </label>
                <label>
                    <span className={styles.button_send_image}>{imageURL ? 'Mudar' : "Enviar"}<PhotoCamera /></span>
                    <input type="file" src={imageURL} onChange={(e) => uploadImage(e.target.files[0])} accept='image/*' />
                </label>
                {imageURL && (
                    <img src={imageURL} className={styles.image_preview} alt='Prévia' />
                )}
                <label>
                    HashTags
                    <div className={styles.hashtags}>
                        {hashtags.length > 0 && hashtags.map((h, k) => (
                            <Chip
                                key={k}
                                icon={<TagIcon />}
                                label={h}
                                onDelete={() => handleRemoveHashtag(h)}
                            />
                        ))}
                        {hashtags.length < 10 && (
                            <span>
                                <Chip
                                    label={inputHashOpen ? 'Save' : 'Add'}
                                    color='success'
                                    icon={inputHashOpen ? <CheckIcon /> : <AddIcon />}
                                    onClick={handleAddHash} />
                            </span>
                        )}
                    </div>
                    {inputHashOpen && <input type='text' onChange={(e) => setInputHash(e.target.value)} />}
                    <div className={styles.add}>

                    </div>
                    {/* <input maxLength={50} type="text" value={hashtags} placeholder='#mypost' onChange={(e) => setHashtags(e.target.value)} /> */}
                </label>
                {loading ? <CircularProgress color='inherit' /> : <button>{post ? 'Salvar' : 'Publicar'}</button>}
            </form>
        </>

    )
}

export default FormPost