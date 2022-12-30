import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// MUI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';

// Hooks
import { useArthentication } from '../../hooks/useAuthentication';

function Register() {

    const { createUser, singIn ,loading } = useArthentication()

    const { enqueueSnackbar } = useSnackbar();

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfim, setSenhaConfirm] = useState("")

    const [erro, setErro] = useState()

    function validarEmail(){
        const dominio = email.split("@")

        if (!email.includes('@')) {
            console.log('1');
            return false
        }
        if (dominio[0].trim().length === 0 || dominio[1].trim().length === 0) {
            console.log('2');
            return false
        }
        if(dominio.length > 2){
            console.log('3');
            return false
        }
        if(dominio[1].split('.')[0].trim().length === 0 || !dominio[1].includes('.com')){
            return false
        }
        return true
        
    }

    async function handleRegister(e, variant) {
        e.preventDefault()
        if (nome.trim().length === 0 || email.trim().length === 0 || senha.trim().length === 0 || senhaConfim.trim().length === 0) {
            setErro('Todos os campos devem ser preenchidos corretamente')
            return
        } else if (senha !== senhaConfim) {
            setErro('As senhas devem ser iguais')
            return
        } else if (senha.length < 6) {
            setErro('A senha deve ter pelomenos 6 caractéres')
            return
        } else if(!validarEmail()){
            setErro('Email inválido')
            return
        }

        setErro()

        const user = {
            nome,
            email,
            senha
        }

        await createUser(user)

        enqueueSnackbar('Conta criada!', {variant})

        await singIn(user)

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
                <h1>Registro</h1>
                <label>
                    Nome
                    <input type="text" name="Nome" placeholder='fulano' onChange={(e) => setNome(e.target.value)} required />
                </label>
                <label>
                    Email
                    <input type="text" name="Email" placeholder='exemplo@gmail.com' onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Senha
                    <input type="password" name="senha" onChange={(e) => setSenha(e.target.value)} required />
                </label>
                <label>
                    Confirme sua senha
                    <input type="password" name="senhaC" onChange={(e) => setSenhaConfirm(e.target.value)} required />
                </label>
                {loading && <CircularProgress color="inherit"></CircularProgress>}
                {!loading && <button onClick={(e) => handleRegister(e, 'success')}>Cadastrar</button>}
            </form>
            <Link className='cadastrar_login' to='/login'>Já possui cadastro?</Link>
        </div>
    )
}

export default Register