import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Breadcrumbs,
    Paper,

} from '@mui/material';
import ProductsPage from './Porducts'; // Fixed typo here
import { fetchProductsByCategory } from '../../api/Products'; // Adjust the import path as necessary
import WhyChooseUs from '../../components/WhyChooseUs';
import Testimonials from '../../section/Testimonials/Testimonials';

function ProductView() {
    const { categoryId } = useParams();

    // ✅ Add required states
    const [, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <>
            <Box sx={{
                px: { xs: 4, sm: 6, md: 8, lg: 12 },
                py: 16,
                pb: 6,
                backgroundColor: "#111827",
            }}>
                <Box sx={{
                    backgroundColor: "#111827",
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "flex-start", md: "center", lg: "center" },
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
                    gap: 2,
                }}>
                    <Typography variant='h3' color='white' fontWeight='bold'>
                        What We Buy
                    </Typography>

                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                        <Typography sx={{ color: "white" }}>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Home
                            </Link>
                        </Typography>

                        <Typography sx={{ color: 'white' }}>
                            Product Category
                        </Typography>

                        <Typography sx={{ color: 'white', fontWeight: "semibold" }}>
                            {categoryName}
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Header Description */}
                <Paper
                    elevation={0}
                    sx={{
                        py: 4,
                        pb: 0,
                        borderRadius: 2,
                        backgroundColor: "#111827",
                        color: '#f1f5f9',
                    }}
                >
                    <Typography
                        variant="body1"
                        color="gray"
                        sx={{ whiteSpace: 'pre-line', fontSize: '0.9rem' }}
                    >
                        Explore our exclusive range of premium {categoryName.toLowerCase()} designed to elevate your lifestyle.
                        Each item is crafted with precision and passion, ensuring long-lasting quality you can trust.
                        From timeless classics to modern innovations, our {categoryName.toLowerCase()} collection has something for everyone.
                        Whether you're shopping for personal use or a thoughtful gift, you'll find just what you need here.

                    </Typography>
                </Paper>
            </Box>

            {/* Products Section */}
            <Box sx={{
                px: { xs: 3, sm: 3, md: 8, lg: 8 },
                backgroundColor: "#111827",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

            }}>
                <ProductsPage products={filteredProducts} loading={loading} error={error} />
            </Box>
            <WhyChooseUs />
            <Testimonials />
        </>
    );
}

export default ProductView;
