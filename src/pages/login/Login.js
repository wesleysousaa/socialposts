import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// MUI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';

import { useArthentication } from '../../hooks/useAuthentication'

function Login() {

    const { enqueueSnackbar } = useSnackbar();
    const { singIn, loading } = useArthentication()
    const [displayEmail, setDisplayEmail] = useState('')
    const [displaySenha, setDisplaySenha] = useState('')
    const [erro, setErro] = useState()

    async function handleLogin(e, variant) {
        e.preventDefault()

        const user = await singIn({email: displayEmail, senha: displaySenha})

        if (displayEmail.trim().length === 0 || displaySenha.trim().length === 0) {
            setErro('Todos os campos devem ser preenchidos corretamente')
            return
        }
        
        else if (!user) {
            setErro('Email ou senha inválidos')
            return
        }

        enqueueSnackbar("Bem Vindo!", { variant })
    }

    return (
        <div className='login_cadastro'>
            {erro && (
                <Alert severity="error">
                    <AlertTitle>Erro</AlertTitle>
                    {erro} — <strong>Verifique novamente</strong>
                </Alert>
            )}
            <form>
                <h1>Login</h1>
                <label>
                    Email
                    <input type="text" name="displayEmail" placeholder='exemplo@gmail.com' onChange={(e) => setDisplayEmail(e.target.value)} required />
                </label>
                <label>
                    Senha
                    <input type="password" name="displaySenha" onChange={(e) => setDisplaySenha(e.target.value)} required />
                </label>

                {loading && <CircularProgress color='inherit' />}
                {!loading && <button onClick={(e) => handleLogin(e, 'success')}>Entrar</button>}

            </form>
            <Link className='cadastrar_login' to='/register'>Não possui conta?</Link>
        </div>
    )
}

export default Login