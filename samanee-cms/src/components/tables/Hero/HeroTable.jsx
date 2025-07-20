import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHero, addHero, updateHero, deleteHero } from '../../../redux/Hero/hero.thunk.js';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Typography, Button, TextField, Box,
    Container, Card, CardContent, CardHeader, Tooltip, Chip, Alert, IconButton,
    InputAdornment, TablePagination, Grid
} from '@mui/material';

import {

    Image as ImageIcon,
    Link as LinkIcon,
    Videocam as VideocamIcon,
    Search as SearchIcon // Add this line
} from '@mui/icons-material';


const HeroTable = () => {
    const dispatch = useDispatch();
    const { data: heroes, loading, error } = useSelector((state) => state.hero);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        backgroundImageUrl: '',
        backgroundVideoUrl: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [editingHeroId, setEditingHeroId] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

    useEffect(() => {
        dispatch(fetchHero());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({
            title: '',
            subtitle: '',
            description: '',
            buttonText: '',
            buttonLink: '',
            backgroundImageUrl: '',
            backgroundVideoUrl: ''
        });
        setEditMode(false);
        setEditingHeroId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedForm = Object.fromEntries(
            Object.entries(formData).map(([key, val]) => [key, val.trim()])
        );

        if (editMode) {
            dispatch(updateHero({ id: editingHeroId, updatedData: cleanedForm }));
        } else {
            dispatch(addHero(cleanedForm));
        }
        resetForm();
    };

    const handleEdit = (hero) => {
        setFormData({
            title: hero.title || '',
            subtitle: hero.subtitle || '',
            description: hero.description || '',
            buttonText: hero.buttonText || '',
            buttonLink: hero.buttonLink || '',
            backgroundImageUrl: hero.backgroundImageUrl || '',
            backgroundVideoUrl: hero.backgroundVideoUrl || ''
        });
        setEditingHeroId(hero._id);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteHero(id));
    };

    const formFields = [
        ['Title', 'title'],
        ['Subtitle', 'subtitle'],
        ['Description', 'description'],
        ['Button Text', 'buttonText'],
        ['Button Link', 'buttonLink', <LinkIcon fontSize="small" sx={{ color: 'text.secondary' }} />],
        ['Background Image URL', 'backgroundImageUrl', <ImageIcon fontSize="small" sx={{ color: 'text.secondary' }} />],
        ['Background Video URL', 'backgroundVideoUrl', <VideocamIcon fontSize="small" sx={{ color: 'text.secondary' }} />],
    ];

    // Filter heroes based on the search term
    const filteredHeroes = heroes.filter(hero =>
        hero.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="xl" >
            <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
                Manage
            </Typography>

            {/* Form Section */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader
                    title={editMode ? 'Edit Hero' : 'Add New Hero'}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    action={editMode && (
                        <Button onClick={resetForm} variant="outlined" size="small" color="secondary">
                            Cancel Edit
                        </Button>
                    )}
                />
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            {formFields.map(([label, key, icon]) => (
                                <Grid xs={12} md={key === 'description' ? 12 : 4} key={key}>
                                    <TextField
                                        label={label}
                                        variant="outlined"
                                        required={key === 'title'}
                                        multiline={key === 'description'}
                                        rows={key === 'description' ? 3 : 1}
                                        fullWidth
                                        value={formData[key]}
                                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                        InputProps={icon ? {
                                            startAdornment: (
                                                <InputAdornment position="start">{icon}</InputAdornment>
                                            )
                                        } : undefined}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ mt: 3, textAlign: 'right' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"

                                sx={{ px: 4 }}
                                disabled={loading}
                            >
                                {editMode ? 'Update' : 'Add'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Search Bar Section */}
            <Box sx={{ mb: 2, mt: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
                    Table
                </Typography>
                <TextField
                    label="Search Hero Banners"
                    variant="outlined"

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    }}
                />

            </Box>

            {/* Hero Banner List */}
            <Card elevation={3}>
                <CardHeader title="Hero Table" sx={{ backgroundColor: '#f5f5f5' }} />
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
                    ) : (
                        <>
                            <TableContainer sx={{ width: "100%" }}>
                                <Table stickyHeader component={Paper}>
                                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell> <b>Sr</b></TableCell>
                                            <TableCell ><b>Title</b></TableCell>
                                            <TableCell ><b>Subtitle</b></TableCell>
                                            <TableCell ><b>Media</b></TableCell>

                                            <TableCell ><b>Actions</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredHeroes.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    <Typography color="textSecondary" sx={{ py: 2 }}>
                                                        No hero banners found.
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredHeroes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hero, index) => (
                                                <TableRow key={hero._id} hover>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title={hero.title} arrow>
                                                            <Typography noWrap>
                                                                {hero.title.length > 15 ? `${hero.title.slice(0, 20)}...` : hero.title}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title={hero.subtitle} arrow>
                                                            <Typography noWrap>
                                                                {hero.subtitle.length > 15 ? `${hero.subtitle.slice(0, 20)}...` : hero.subtitle}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell>
                                                    {/* <TableCell>
                                                        <Tooltip title={hero.description} arrow>
                                                            <Typography noWrap>
                                                                {hero.description.length > 20 ? `${hero.description.slice(0, 20)}...` : hero.description}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell> */}
                                                    <TableCell>
                                                        {hero.backgroundImageUrl && (
                                                            <Button
                                                                variant="text"
                                                                size="small"
                                                                color="primary"
                                                                startIcon={<ImageIcon />}
                                                                onClick={() => window.open(hero.backgroundImageUrl, '_blank')}
                                                                sx={{ border: 0 }}
                                                            >
                                                                Image
                                                            </Button>
                                                        )}
                                                        {hero.backgroundVideoUrl && (
                                                            <Button
                                                                variant="text"
                                                                size="small"
                                                                color="secondary"
                                                                startIcon={<VideocamIcon />}
                                                                onClick={() => window.open(hero.backgroundVideoUrl, '_blank')}
                                                            >
                                                                Video
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => handleEdit(hero)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDelete(hero._id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                component="div"
                                count={filteredHeroes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                                rowsPerPageOptions={[5, 10, 25]}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default HeroTable;
