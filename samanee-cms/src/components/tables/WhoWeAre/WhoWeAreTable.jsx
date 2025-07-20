import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWhoWeAre,
    createWhoWeAre,
    updateWhoWeAre,
    deleteWhoWeAre,

} from '../../../redux/WhoWeAre/WhoWeAre.thunk.js';


import {
    Container, Typography, Card, CardHeader, CardContent, TextField, Button, Grid,
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Alert, TablePagination, Tooltip, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const WhoWeAreTable = () => {
    const dispatch = useDispatch();
    const { items = [], loading, error } = useSelector(state => state.whoWeAre);

    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        video: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchWhoWeAre());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({ title: '', subtitle: '', video: '' });
        setEditMode(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: formData.title,
            subtitle: formData.subtitle,
            video: formData.video,
        };

        if (editMode) {
            dispatch(updateWhoWeAre({ id: editingId, formData: payload }));
        } else {
            dispatch(createWhoWeAre(payload));
        }

        resetForm();
    };

    const handleEdit = (entry) => {
        setFormData({
            title: entry.title,
            subtitle: entry.subtitle,
            video: entry.video || '',
        });
        setEditMode(true);
        setEditingId(entry._id);
    };

    const handleDelete = (id) => {
        dispatch(deleteWhoWeAre(id));
    };

    const filteredItems = items.filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // const getTruncatedText = (text) => {
    //     const words = text.split(' ');
    //     return words.length > 20 ? words.slice(0, 5).join(' ') + '...' : text;
    // };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ fontWeight: 'bold', my: 3 }}>
                Who We Are Management
            </Typography>

            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader title={editMode ? 'Edit Entry' : 'Add New Entry'} />
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Tooltip title="Provide a detailed description about your organization">
                                    <TextField
                                        label="Subtitle"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        multiline
                                        rows={3}
                                        value={formData.subtitle}
                                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Cloudinary Video URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.video}
                                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                <Button type="submit" variant="contained">
                                    {editMode ? 'Update' : 'Add'}
                                </Button>
                                {editMode && (
                                    <Button onClick={resetForm} sx={{ ml: 2 }} variant="outlined" color="secondary">
                                        Cancel
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>



            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Products List
                </Typography>
                <TextField
                    label="Search"
                    variant="outlined"

                    sx={{ mb: 2 }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Card elevation={3} component={Paper}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Title</b></TableCell>
                                        <TableCell><b>Subtitle</b></TableCell>
                                        {/* <TableCell><b>Video</b></TableCell> */}
                                        <TableCell><b>Actions</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry) => (
                                        <TableRow key={entry._id}>
                                            <TableCell>{entry.title}</TableCell>
                                            <TableCell>
                                                <Tooltip title={entry.subtitle} arrow>
                                                    <Typography noWrap>
                                                        {entry.subtitle.length > 20 ? `${entry.subtitle.slice(0, 30)}...` : entry.subtitle}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                            {/* <TableCell>
                                                {entry.video ? (
                                                    <a href={entry.video} target="_blank" rel="noopener noreferrer">View</a>
                                                ) : 'No Video'}
                                            </TableCell> */}
                                            <TableCell>
                                                <Button size="small" variant="outlined" onClick={() => handleEdit(entry)}>
                                                    Edit
                                                </Button>
                                                <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(entry._id)} sx={{ ml: 1 }}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10]}
                                component="div"
                                count={filteredItems.length || 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                            />
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default WhoWeAreTable;