import React, { useState } from "react";
import {
    Grid,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
    CircularProgress,
    Chip,
    Paper
} from "@mui/material";
import {
    TrendingUp as TrendingUpIcon,
    Support as SupportIcon,
    Star as StarIcon,
    Business as BusinessIcon,
    Upload as UploadIcon,
    Send as SendIcon,
    CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";


function BecomeReseller() {
    const [formData, setFormData] = useState({
        name: "",
        productName: "",
        phone: "",
        companyName: "",
        message: "",
        price: "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            return setSnackbar({
                open: true,
                message: "Please upload a product image.",
                severity: "warning",
            });
        }

        try {
            setLoading(true);
            await new Promise((res) => setTimeout(res, 2000)); // Simulated API
            setSnackbar({
                open: true,
                message: "Application submitted successfully!",
                severity: "success",
            });
            setFormData({
                name: "",
                productName: "",
                phone: "",
                companyName: "",
                message: "",
                price: "",
            });
            setImage(null);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setSnackbar({
                open: true,
                message: "Submission failed.",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <Box
            sx={{
                minHeight: "auto",
                backgroundColor: "#0f172a",

                py: { xs: 4, md: 12 },
                color: "#fff",



            }}
        >
            <Grid container spacing={0} sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                justifyContent: "center",
                alignItems: "flex-start",

            }}  >
                {/* Left Info Section */}
                <Grid item xs={12} md={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",

                        py: 2

                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 3,
                            background: "linear-gradient(135deg, #ff9800, #f57c00)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Become a Reseller
                    </Typography>

                    <Typography variant="h6" sx={{ color: "#cbd5e1", mb: 3 }}>
                        Join our network of trusted partners and unlock <br /> unlimited growth potential.
                    </Typography>

                    <Chip
                        label="Trusted by 500+ Partners"
                        sx={{
                            background: "linear-gradient(135deg, #ff9800, #f57c00)",
                            color: "#fff",
                            mb: 4,
                        }}
                    />



                    <Box
                        sx={{
                            mt: 4,
                            p: 2,
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 2,
                            background: "rgba(255,255,255,0.03)",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <BusinessIcon sx={{ fontSize: 50, color: "#ff9800" }} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>Your Business Partner</Typography>
                            <Typography variant="body2" color="#cbd5e1">Trusted • Reliable • Profitable</Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Form Section */}
                <Grid item xs={12} md={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",


                    }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(12px)",
                            color: "#fff",
                            width: "100%",
                        }}
                    >


                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField name="name" label="Full Name" value={formData.name} onChange={handleChange} required fullWidth sx={fieldStyle} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} required fullWidth sx={fieldStyle} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="price" label="Product Price" type="number" value={formData.price} onChange={handleChange} required fullWidth sx={fieldStyle} />
                                </Grid>
                            </Grid>
                            <TextField name="productName" label="Product Name" value={formData.productName} onChange={handleChange} required fullWidth sx={fieldStyle} />
                            <TextField name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} required fullWidth sx={fieldStyle} />
                            <TextField name="message" label="Product Description" multiline rows={3} value={formData.message} onChange={handleChange} required fullWidth sx={fieldStyle} />

                            <Button variant="outlined" component="label" startIcon={<UploadIcon />} sx={{ color: "#fff", borderColor: "#fff" }}>
                                Upload Product Image
                                <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                            </Button>

                            {image && (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CheckCircleIcon color="success" />
                                    <Typography>{image.name}</Typography>
                                </Box>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                sx={{
                                    py: 2,
                                    textTransform: "none",
                                    borderRadius: 3,
                                    background: "linear-gradient(135deg, #ff9800, #f57c00)",
                                    fontWeight: 600,
                                    '&:hover': {
                                        background: "linear-gradient(135deg, #000000, #0033cc)",
                                    }
                                }}
                            >
                                {loading ? "Submitting..." : "Submit Application"}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>



            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

const fieldStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
        '&.Mui-focused fieldset': { borderColor: '#f57c00' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
    '& .MuiInputBase-input': { color: 'white' },
};

export default BecomeReseller;
