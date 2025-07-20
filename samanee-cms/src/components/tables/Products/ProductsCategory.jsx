import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProductsCategory,
    addProductsCategory,
    updateProductsCategory,
    deleteProductsCategory,
} from "../../../redux/Products/productsCategory.thunk.js";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Typography, Button, TextField, Box,
    Container, Card, CardContent, CardHeader, Tooltip, TablePagination, Grid, Avatar
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const ProductCategoryTable = () => {
    const dispatch = useDispatch();
    const { items: productsCategory, loading, error } = useSelector((state) => state.productCategory);

    const [formData, setFormData] = useState({
        title: '',
        icon: '',
        description: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchProductsCategory());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({ title: '', icon: '', description: '' });
        setEditMode(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedForm = {
            title: formData.title.trim(),
            icon: formData.icon.trim(),
            description: formData.description.trim(),
        };

        if (editMode) {
            dispatch(updateProductsCategory({ id: editingId, updatedData: cleanedForm }));
        } else {
            dispatch(addProductsCategory(cleanedForm));
        }
        resetForm();
    };

    const handleEdit = (category) => {
        setFormData({
            title: category.title,
            icon: category.icon,
            description: category.description,
        });
        setEditingId(category._id);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteProductsCategory(id));
    };

    const filteredCategories = (productsCategory || []).filter(category =>
        Object.values(category).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', my: 3 }}>
                Product Categories Management
            </Typography>

            {/* Add/Edit Form */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader
                    title={editMode ? 'Edit Category' : 'Add New Category'}
                    sx={{ bgcolor: '#f5f5f5' }}
                    action={editMode && (
                        <Button onClick={resetForm} variant="outlined" size="small" color="secondary">
                            Cancel Edit
                        </Button>
                    )}
                />
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container direction='column' spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label="Icon URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ px: 4 }}
                                    disabled={loading}
                                >
                                    {editMode ? 'Update' : 'Add'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Search and Table Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Product Categories
                </Typography>
                <TextField
                    label="Search Categories"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        ),
                    }}
                    sx={{ width: 300 }}
                />
            </Box>

            <Card elevation={3}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
                    ) : (
                        <>
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableRow>
                                            <TableCell><b>#</b></TableCell>
                                            <TableCell><b>Title</b></TableCell>
                                            {/* <TableCell><b>Icon</b></TableCell> */}
                                            <TableCell><b>Description</b></TableCell>
                                            <TableCell><b>Actions</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((category, index) => (
                                                <TableRow key={category._id} hover>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>{category.title}</TableCell>
                                                    {/* <TableCell>
                                                        <Avatar
                                                            variant="square"
                                                            src={category.icon}
                                                            sx={{ width: 56, height: 56 }}
                                                            alt={category.title}
                                                        />
                                                    </TableCell> */}
                                                    <TableCell>
                                                        <Tooltip title={category.description} arrow>
                                                            <Typography noWrap>
                                                                {category.description.length > 20 ? `${category.description.slice(0, 30)}...` : category.description}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => handleEdit(category)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDelete(category._id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={filteredCategories.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(_, newPage) => setPage(newPage)}
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductCategoryTable;