import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../style/Register.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Register() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "fname": inputs.fname,
        "lname": inputs.lname,
        "username": inputs.username,
        "password": inputs.password,
        "email": inputs.email,
        "avatar": inputs.avatar
        // "fname": inputs.fname,
        // "lname": inputs.lname,
        // "username": inputs.username,
        // "password": inputs.password,
        // "email": inputs.email,
        // "avatar": inputs.avatar
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("https://www.melivecode.com/api/users/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === 'ok'){
                MySwal.fire({
                    html:<i>{result.message}</i>,
                    icon: 'success'
                }).then((value) => {
                    navigate('/login')
                })
            }else {
                MySwal.fire({
                    html:<i>{result.message}</i>,
                    icon: 'error'
                })
            }
        })
        .catch(error => console.log('error', error));
    }

    // const renderRegister = (
    //     <>

        
    //     </>

    // );
  return (
    <div className='reg'>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="fname"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={inputs.fname || ""} 
                        onChange={handleChange}  
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lname"
                    autoComplete="family-name"
                    value={inputs.lname || ""} 
                    onChange={handleChange}
                    size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={inputs.username || ""} 
                        onChange={handleChange}
                        size="small"
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={inputs.password || ""} 
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={inputs.email || ""} 
                        onChange={handleChange}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="avatar"
                        label="avatar"
                        name="avatar"
                        autoComplete="avatar"
                        value={inputs.avatar || ""} 
                        onChange={handleChange}
                        size="small"
                    />
                    <input class="block w-full text-sm
                     text-gray-900 border
                      border-gray-300 
                      rounded-lg cursor-pointer
                       bg-gray-50" 
                       name="avatar"
                       value={inputs.avatar || ""} 
                        onChange={handleChange}
                       id="multiple_files" 
                       type="file" 
                       multiple>

                       </input>
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                    Already have an account? Login
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
      </Container>
    </div>
  )
}

export default Register