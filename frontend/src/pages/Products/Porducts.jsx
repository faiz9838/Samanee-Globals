import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    TextField,
    Box,
    Container,
    Divider,
    Paper,
    InputAdornment,
    CircularProgress,
    Chip,
    Pagination,
    useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

import { fetchProductsByCategory } from "../../api/Products";

const ProductsPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // xs & sm
    // const isMediumUp = useMediaQuery(theme.breakpoints.up("md")); // md and up

    const itemsPerPage = isSmallScreen ? 4 : 9;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetchProductsByCategory(categoryId);

                setProducts(res.data);
                setFilteredProducts(res.data);

                if (res.data.length > 0) {
                    setCategoryName(res.data[0].category?.title || "Unknown Category");
                } else {
                    setCategoryName("Unknown Category");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);


    useEffect(() => {
        const filtered = products.filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [searchQuery, products]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
                    <Typography variant="h6" color="error">{error}</Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth='lg' sx={{ py: 7 }}>
            {/* Header */}
            <Paper elevation={0} sx={{ mb: 8, borderRadius: 2, backgroundColor: "#111827", color: '#f1f5f9' }}>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                    {categoryName}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: '#cbd5e1' }}>
                    Discover our premium selection of {categoryName.toLowerCase()} products
                </Typography>
                <Divider sx={{ mb: 2, borderColor: '#94a3b8' }} />
                <TextField
                    label="Search Products By Name"
                    variant="outlined"
                    fullWidth
                    size="medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputLabelProps={{ style: { color: '#e2e8f0' } }}
                    sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        input: { color: '#e2e8f0' },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                                borderColor: '#94a3b8',
                            },
                            '&:hover fieldset': {
                                borderColor: '#cbd5e1',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#38bdf8',
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: '#cbd5e1' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            {/* Products Grid */}
            <Grid container spacing={3}>
                {currentItems.length > 0 ? (
                    currentItems.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product._id}>
                            <Card
                                sx={{
                                    cursor: 'pointer',
                                    height: 'auto',
                                    width: { xs: "100%", sm: "100%", md: 250 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: "white",
                                    color: 'black',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 5px 10px rgba(255, 255, 255, 0.3)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="120"
                                    image={
                                        product?.image || "https://via.placeholder.com/260x120?text=No+Image"
                                    }
                                    alt={product.productName}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            mb: 1,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: "black",
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {product.productName}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1.5,
                                            fontSize: '0.8rem',
                                            color: 'black',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {product.description}
                                    </Typography>

                                    <Typography variant="body2" color="black" sx={{ fontSize: '0.75rem' }}>
                                        <strong>Qty:</strong> {product.requiredQuantity} {product.unit}
                                    </Typography>

                                    <Typography variant="body2" color="black" sx={{ fontSize: '0.75rem' }}>
                                        <strong>Location:</strong> {product.preferredLocation}
                                    </Typography>

                                    {product.category?.title && (
                                        <Box sx={{ mt: 2 }}>
                                            <Chip
                                                sx={{ color: "white", background: "#111827", padding: 1 }}
                                                label={product.category.title}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                            <Typography variant="body1" color="text.secondary">
                                No products found matching your search criteria.
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Try adjusting your search term or browse all {categoryName} products.
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                        shape="rounded"
                    />
                </Box>
            )}
        </Container>
    );
};

export default ProductsPage;
