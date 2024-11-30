"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { GlobalStyles } from '@mui/material';
import AuthGuard from '@/components/AuthGuard';

function OrderDetailsPage() {
    const [progress, setProgress] = useState(0);
    const [seconds, setSeconds] = useState(7);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 14.3, 100)); 
            setSeconds((prev) => Math.max(prev - 1, 0));
        }, 1000);

        if (seconds === 0) {
            window.location.href = '/';
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <>
        <AuthGuard>
        <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
        <Box
            sx={{
                backgroundColor: '#d8eec9',
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                textAlign: 'center',
            }}
        >
            <CheckCircleOutlineIcon sx={{ fontSize: 250, color: '#4caf50', marginBottom: '16px' }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                ¡ORDEN COMPLETADA!
            </Typography>
            <Typography sx={{maxWidth:'600px'}} variant="body1" color="text.secondary" paragraph>
                Tu orden ha sido <strong>completada</strong> correctamente, todos los detalles se han
                enviado a tu correo electrónico. Serás redirigido en {seconds} segundos...
            </Typography>
            <Box sx={{ width: '80%', maxWidth: '400px' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>
        </Box>
        </AuthGuard>
        </>
    );
}

export default OrderDetailsPage;