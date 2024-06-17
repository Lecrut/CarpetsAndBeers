import React, { useState } from 'react';
import { Snackbar, Button } from '@mui/material';

const CookieConsent = () => {
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="primary" size="small" onClick={handleClose}>
                Akceptuj
            </Button>
        </React.Fragment>
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            message="Na naszej stronie używamy plików cookies."
            action={action}
        />
    );
};

export default CookieConsent;
