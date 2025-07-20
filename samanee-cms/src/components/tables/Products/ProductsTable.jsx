import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../../../redux/Products/products.thunk.js';
import { fetchProductsCategory } from '../../../redux/Products/productsCategory.thunk.js';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, CircularProgress, Typography, Button, TextField, Box,
    Container, Card, CardContent, CardHeader, Tooltip, TablePagination, Grid,
    MenuItem, Select, InputLabel, FormControl, Alert
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const ProductTable = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);
    const { items: categories } = useSelector((state) => state.productCategory);

    const [formData, setFormData] = useState({
        productName: '',
        requiredQuantity: '',
        unit: 'ton',
        preferredLocation: '',
        description: '',
        image: '',
        category: '', // Only store categoryId here
    });

    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch both products and categories on mount
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchProductsCategory());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({
            productName: '',
            requiredQuantity: '',
            unit: 'ton',
            preferredLocation: '',
            description: '',
            image: '',
            category: '',
        });
        setEditMode(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedForm = {
            ...formData,
            requiredQuantity: Number(formData.requiredQuantity),
        };

        if (editMode) {
            dispatch(updateProduct({ id: editingId, updatedData: cleanedForm }));
        } else {
            dispatch(createProduct(cleanedForm));
        }

        resetForm();
    };

    const handleEdit = (product) => {
        setFormData({
            productName: product.productName,
            requiredQuantity: product.requiredQuantity,
            unit: product.unit,
            preferredLocation: product.preferredLocation,
            description: product.description,
            image: product.image,
            category: product.category?._id || product.category, // Use categoryId for editing
        });
        setEditingId(product._id);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const filteredProducts = (products || []).filter(product =>
        Object.values(product).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) || (product.category && product.category.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    // Debugging - Log filteredProducts
    console.log('Filtered Products:', filteredProducts);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', my: 3 }}>
                Products Management
            </Typography>

            {/* Add/Edit Form */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader
                    title={editMode ? 'Edit Product' : 'Add New Product'}
                    sx={{ bgcolor: '#f5f5f5' }}
                    action={editMode && (
                        <Button onClick={resetForm} variant="outlined" size="small" color="secondary">
                            Cancel Edit
                        </Button>
                    )}
                />
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Product Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Required Quantity"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    required
                                    value={formData.requiredQuantity}
                                    onChange={(e) => setFormData({ ...formData, requiredQuantity: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Unit</InputLabel>
                                    <Select
                                        value={formData.unit}
                                        label="Unit"
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                    >
                                        {['ton', 'units', 'pieces', 'sheets', 'meters'].map(unit => (
                                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Category"
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {categories.length > 0 ? categories.map(category => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.title}
                                            </MenuItem>
                                        )) : (
                                            <MenuItem disabled>No Categories Found</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Preferred Location"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.preferredLocation}
                                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Image URL"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Products List
                </Typography>
                <TextField
                    label="Search Products"
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
                                            <TableCell><b>Sr</b></TableCell>
                                            <TableCell><b>Product Name</b></TableCell>
                                            <TableCell><b>Quantity</b></TableCell>
                                            <TableCell><b>Unit</b></TableCell>
                                            <TableCell><b>Category</b></TableCell>
                                            <TableCell><b>Location</b></TableCell>
                                            <TableCell><b>Actions</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((product, index) => (
                                                <TableRow key={product._id} hover>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title={product.productName} arrow>
                                                            <Typography noWrap>
                                                                {product.productName.length > 15 ? `${product.productName.slice(0, 20)}...` : product.productName}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>{product.requiredQuantity}</TableCell>
                                                    <TableCell>{product.unit}</TableCell>
                                                    <TableCell>
                                                        {product.category?.title || 'N/A'}
                                                    </TableCell>


                                                    <TableCell>{product.preferredLocation}</TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => handleEdit(product)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDelete(product._id)}
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
                                count={filteredProducts.length}
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

export default ProductTable;
