import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Grid, Fade } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon
} from '@mui/icons-material';

export default function ProfessionalNavbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [scrolled, setScrolled] = React.useState(false);
    const open = Boolean(anchorEl);
    const menuButtonRef = React.useRef(null);

    const handleMenuOpen = () => {
        setAnchorEl(menuButtonRef.current);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navSections = {
        "Home": ["Gallery", "Featured",],
        "Others": ["Sales Inquiries", "Became seller", "Feedback",],
        "About Us": ["Our Story", "Team", "Careers"],

    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    backgroundColor: scrolled || open ? 'rgba(30, 41, 59, 0.98)' : 'rgba(29, 29, 29, 0.35)',
                    transition: 'background-color 0.3s ease',
                    // zIndex: (theme) => theme.zIndex.drawer + 1,
                    zIndex: 1500,
                    px: { xs: 0, sm: 2, md: 6 },
                    boxShadow: scrolled ? '0 2px 4px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Toolbar sx={{ padding: { xs: '0.5rem 1rem', md: '0.5rem 2rem' }, justifyContent: 'space-between' }}>
                    <Typography variant="h6" paddingTop={1} sx={{ filter: 'revert' }} component="div">
                        <img src="/logo-white_edited.png" alt="Company Logo" style={{ height: '40px', width: 'auto' }} />

                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            flexDirection: { xs: 'row-reverse', sm: 'row-reverse' }, // Stack properly
                        }}
                    >
                        {/* Menu Icon */}
                        <IconButton
                            ref={menuButtonRef}
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label={open ? "close menu" : "open menu"}
                            onClick={open ? handleMenuClose : handleMenuOpen}
                            sx={{
                                zIndex: 1400,
                                border: open ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                                borderRadius: '8px',
                                padding: '8px',
                                backgroundColor: open ? 'rgba(255,255,255,0.1)' : 'transparent',
                            }}
                        >
                            {open ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>

                        {/* Contact Button */}
                        <Button
                            component={Link}
                            to="/contact"
                            variant="outlined"
                            color="inherit"
                            sx={{
                                borderRadius: '1rem',
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                textTransform: 'none',
                                fontWeight: 500,
                                whiteSpace: 'nowrap',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            Contact Us
                        </Button>
                    </Box>


                </Toolbar>
            </AppBar>

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
                transitionDuration={300}
                disablePortal
                sx={{
                    '& .MuiPaper-root': {
                        width: '100%',
                        height: 'calc(100vh - 64px)',
                        maxWidth: '100%',
                        maxHeight: 'none',
                        backgroundColor: 'rgba(30, 41, 59, 0.98)',
                        boxShadow: 'none',
                        borderRadius: 0,
                        mt: '47px',
                        px: 10,
                        pt: 6,
                        pb: 6,
                        overflowY: 'auto',
                        color: 'white',
                        left: '0 !important',
                        right: '0 !important',
                    },
                    '& .MuiList-root': {
                        padding: 0,
                        width: '100%'
                    }
                }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    style: { width: '100%', padding: 0 }
                }}
                slotProps={{
                    paper: {
                        style: {
                            width: '100vw',
                            position: 'fixed',
                            left: 0,
                            right: 0,
                            paddingLeft: '16px',
                            paddingRight: '16px',
                        }
                    }
                }}
            >
                <Box sx={{ maxWidth: '1200px', margin: '0 auto', px: { xs: 2, sm: 4, md: 10 } }}>
                    <Grid container spacing={4} sx={{ pb: 8, display: "flex", justifyContent: "space-between" }}>
                        {Object.entries(navSections).map(([section, links], index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontWeight: 600,
                                        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                                        pb: 1
                                    }}
                                >
                                    {section}
                                </Typography>
                                {links.map((link, linkIndex) => (
                                    <MenuItem
                                        key={linkIndex}
                                        onClick={handleMenuClose}
                                        sx={{
                                            py: 1.5,
                                            pl: 0,
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                '& a': { color: 'white', pl: 0 }
                                            }
                                        }}
                                    >
                                        <Link
                                            to={`/${section.toLowerCase().replace(/\s+/g, '-')}/${link.toLowerCase().replace(/\s+/g, '-')}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                transition: 'all 0.2s ease',
                                                display: 'block',
                                                width: '100%'
                                            }}
                                        >
                                            {link}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Grid>

                        ))}
                        <Grid item xs={12} md={3} >
                            <Typography variant="h6" fontWeight="bold" gutterBottom
                                sx={{
                                    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                Contact Us
                            </Typography>

                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                                my: 4
                            }}>
                                <Typography variant="h6" sx={{ opacity: 0.8, display: "flex", alignItems: "center", gap: 1 }}>
                                    <EmailIcon /> <a href="mailto:info@samanee.in" style={{ color: "#fff", textDecoration: "none" }}>info@samanee.in</a>
                                </Typography>


                                <Typography variant="h6" sx={{ opacity: 0.8, display: "flex", alignItems: "center", gap: 1 }}>
                                    <PhoneIcon /><a href="tel:+919876543210" style={{ color: "#fff", textDecoration: "none" }}>+91 98765 43210</a>
                                </Typography>

                                <Typography variant="h6" sx={{ opacity: 0.8 }}>
                                    Mon - Sat: 9:00 AM to 6:00 PM
                                </Typography>
                            </Box>
                        </Grid>

                    </Grid>

                    <Box sx={{
                        pt: 4,
                        mt: 4,
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 0 }
                    }}>
                        <Box>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                © Samanee Global 2025. All rights reserved.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                component="a"
                                href="https://facebo00ok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#1877F2'
                                    }
                                }}
                            >
                                <FacebookIcon fontSize="medium" />
                            </IconButton>

                            <IconButton
                                component="a"
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#1DA1F2'
                                    }
                                }}
                            >
                                <TwitterIcon fontSize="medium" />
                            </IconButton>

                            <IconButton
                                component="a"
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#E1306C'
                                    }
                                }}
                            >
                                <InstagramIcon fontSize="medium" />
                            </IconButton>

                            <IconButton
                                component="a"
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#0A66C2'
                                    }
                                }}
                            >
                                <LinkedInIcon fontSize="medium" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Menu>
        </Box>
    );
}