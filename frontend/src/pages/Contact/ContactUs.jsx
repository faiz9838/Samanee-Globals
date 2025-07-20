import React, { useState } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    Send as SendIcon
} from '@mui/icons-material';
import { postContactUs } from '../../api/ContactUs';
import ProductList from '../../section/Products/Category/ProductCategory';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
            setSnackbar({
                open: true,
                message: 'Please fill in all required fields.',
                severity: 'warning'
            });
            return;
        }

        try {
            setLoading(true);
            await postContactUs(formData);

            setSnackbar({
                open: true,
                message: 'Message sent successfully! We will get back to you soon.',
                severity: 'success'
            });

            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Contact form error:', error);
            setSnackbar({
                open: true,
                message: 'Failed to send message. Please try again or contact us directly.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#111827',
                color: 'white',
                px: { xs: 2, md: 6 },
                py: { xs: 4, md: 12 },
            }}
        >
            <Grid
                container
                spacing={0}
                sx={{ minHeight: 'auto' }}
            >
                {/* Left Info Section */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flexstart',
                        alignItems: 'flex-start',
                        px: { xs: 3, md: 6 },
                        py: { xs: 12, md: 4 },
                        minHeight: { xs: 'auto', md: 'auto' },
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '2.5rem', md: '3rem' },
                            lineHeight: 1.2
                        }}
                    >
                        Let's talk over coffee!
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: 6,
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 400
                        }}
                    >
                        Fill out the form below and we will get in touch.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <PhoneIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                            <Typography variant="h6">+91 98201 xyz</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                            <Typography variant="h6">info@samanee.global</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 6 }}>
                        <Typography variant="h6">Business Hours</Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            Monday to Saturday - 9.00am to 5.00pm IST
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Form Section */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: { xs: 3, md: 8 },
                        py: 4,
                        minHeight: { xs: 'auto', md: 'auto' },
                        width: { xs: '100%', sm: "100%", md: '50%' }, // ✅ Full width on mobile, auto on desktop
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '100%', md: '100%' }, // ✅ Wider form on desktop
                            mx: 'auto', // ✅ Horizontally center
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(12px)",
                            p: 4,
                            borderRadius: 4
                        }}
                    >

                        <TextField
                            name="name"
                            label="Your Name"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={handleChange}
                            required
                            sx={textFieldStyles}
                        />

                        <TextField
                            name="email"
                            label="Your Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="example@domain.com"
                            sx={textFieldStyles}
                        />

                        <TextField
                            name="subject"
                            label="Subject"
                            variant="outlined"
                            fullWidth
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            sx={textFieldStyles}
                        />

                        <TextField
                            name="message"
                            label="Your Message"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.message}
                            onChange={handleChange}
                            required
                            sx={textFieldStyles}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            sx={{
                                width: 'fit-content',          // button width adjusts to content
                                alignSelf: 'flex-start',       // aligns button to left inside flex box
                                px: 4,                         // horizontal padding
                                py: 1.5,
                                mt: 2,
                                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                                borderRadius: '25px',
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(0, 65, 230) 100%)',
                                },
                                '&:disabled': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                },
                            }}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </Button>

                    </Box>
                </Grid>
            </Grid>

            {/* Snackbar Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
}

// ✅ Reusable style for text fields
const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
        '&.Mui-focused fieldset': { borderColor: '#4285f4' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
    '& .MuiInputBase-input': { color: 'white' },
};

export default ContactUs;
