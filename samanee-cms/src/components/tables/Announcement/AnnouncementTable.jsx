import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Typography, Button, TextField, Box,
    Container, Card, CardContent, CardHeader, Tooltip, Grid, TablePagination,
    Alert, InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { fetchAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '../../../redux/Announcement/announcement.thunk.js';

const AnnouncementTable = () => {
    const dispatch = useDispatch();
    const { announcements, loading, error } = useSelector((state) => state.announcement);

    const [formData, setFormData] = useState({
        title: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [editingHeroId, setEditingHeroId] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [searchTerm, setSearchTerm] = useState(''); // Add state for search term

    useEffect(() => {
        dispatch(fetchAnnouncements());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({
            title: '',
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
            dispatch(updateAnnouncement({ id: editingHeroId, updatedData: cleanedForm }));
            dispatch(fetchAnnouncements());
        } else {
            dispatch(addAnnouncement(cleanedForm));
            dispatch(fetchAnnouncements());
        }
        dispatch(fetchAnnouncements());
        resetForm();
    };

    const handleEdit = (hero) => {
        setFormData({
            title: hero.title || '',
        });
        setEditingHeroId(hero._id);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteAnnouncement(id));
    };

    // Filter announcements based on the search term
    const filteredAnnouncement = (announcements || []).filter(announcement =>
        (announcement.title || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
                Manage
            </Typography>

            {/* Form Section */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader
                    title={editMode ? 'Edit Announcement' : 'Add New Announcement'}
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
                            {[
                                ['Title', 'title'],
                            ].map(([label, key]) => (
                                <Grid xs={12} key={key}>
                                    <TextField
                                        label={label}
                                        variant="outlined"
                                        required={key === 'title'}
                                        fullWidth
                                        value={formData[key]}
                                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
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
            <Box sx={{ mb: 2, mt: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
                    Table
                </Typography>
                <TextField
                    label="Search Announcement"
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

            {/* Announcement List */}
            <Card elevation={3}>
                <CardHeader title="Announcement Table" sx={{ backgroundColor: '#f5f5f5' }} />
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
                    ) : (
                        <>
                            <TableContainer sx={{ width: '100%' }}>
                                <Table stickyHeader component={Paper}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Sr</b></TableCell>
                                            <TableCell><b>Title</b></TableCell>
                                            <TableCell><b>Actions</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredAnnouncement.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    <Typography color="textSecondary" sx={{ py: 2 }}>
                                                        No announcements found.
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredAnnouncement.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((announcement, index) => (
                                                <TableRow key={announcement._id} hover>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>{announcement.title}</TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => handleEdit(announcement)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDelete(announcement._id)}
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
                                count={filteredAnnouncement.length}
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

export default AnnouncementTable;
