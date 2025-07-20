import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchClients,
    addClient,
    updateClient,
    deleteClient
} from '../../../redux/Clients/clients.thunk';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Typography, Button, TextField, Box,
    Container, Card, CardContent, CardHeader, Tooltip, Alert, InputAdornment,
    TablePagination, Grid, Avatar
} from '@mui/material';

import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Image as ImageIcon,
    Search as SearchIcon
} from '@mui/icons-material';

const ClientTable = () => {
    const dispatch = useDispatch();
    const { clients, loading, error } = useSelector((state) => state.client);

    const [formData, setFormData] = useState({ title: '', companyLogo: '' });
    const [editMode, setEditMode] = useState(false);
    const [editingClientId, setEditingClientId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({ title: '', companyLogo: '' });
        setEditMode(false);
        setEditingClientId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, companyLogo } = formData;
        const cleanedData = {
            title: title.trim(),
            companyLogo: companyLogo.trim()
        };

        if (!cleanedData.title || !cleanedData.companyLogo) return;

        if (editMode) {
            dispatch(updateClient({
                id: editingClientId,
                updatedData: cleanedData
            }),
                dispatch(fetchClients()) // Refresh the client list after update    
            );
        } else {
            dispatch(addClient(cleanedData));
            dispatch(fetchClients()); // Refresh the client list after adding
        }
        resetForm();
    };

    const handleEdit = (client) => {
        setFormData({
            title: client.title || '',
            companyLogo: client.companyLogo || ''
        });
        setEditMode(true);
        setEditingClientId(client._id);
    };

    const handleDelete = (id) => {
        dispatch(deleteClient(id));
    };

    const filteredClients = (clients || []).filter(client =>
        client.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedClients = filteredClients.slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
    );

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
                Manage Clients
            </Typography>

            {/* Add/Edit Form */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader
                    title={editMode ? 'Edit Client' : 'Add New Client'}
                    sx={{ backgroundColor: '#f5f5f5' }}
                    action={
                        editMode && (
                            <Button onClick={resetForm} variant="outlined" size="small" color="secondary">
                                Cancel Edit
                            </Button>
                        )
                    }
                />
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Client Title"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Company Logo URL"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.companyLogo}
                                    onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ImageIcon sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, textAlign: 'right' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}

                            >
                                {editMode ? 'Update' : 'Add'}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Search Bar */}
            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="black">
                    Clients List
                </Typography>
                <TextField
                    label="Search by Title"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            {/* Clients Table */}
            <Card elevation={3}>
                <CardHeader title="Clients Table" sx={{ backgroundColor: '#f5f5f5' }} />
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
                    ) : (
                        <>
                            <TableContainer component={Paper}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Sr</b></TableCell>
                                            <TableCell><b>Title</b></TableCell>
                                            <TableCell><b>Company Logo</b></TableCell>
                                            <TableCell><b>Actions</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedClients.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    <Typography color="textSecondary" sx={{ py: 2 }}>
                                                        No clients found.
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedClients.map((client, index) => (
                                                <TableRow key={client._id} hover>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">
                                                            {client.title}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Click to open logo">
                                                            <Button
                                                                variant="text"
                                                                size="small"
                                                                color="primary"
                                                                sx={{ border: 0 }}
                                                                onClick={() => window.open(client.companyLogo, '_blank')}
                                                                startIcon={

                                                                    <ImageIcon />

                                                                }
                                                            >
                                                                Logo
                                                            </Button>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => handleEdit(client)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDelete(client._id)}
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
                                count={filteredClients.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
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

export default ClientTable;