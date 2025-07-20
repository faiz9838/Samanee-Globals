import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import { fetchProductCategories } from "../../../api/ProductCategory"; // Adjust the import path as necessary

const ProductList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchProductCategories();
                const data = Array.isArray(response) ? response : response?.data || [];
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categoriess:", error);
                setError(error.message || "Error fetching categories");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <Container maxWidth="xl">


            {loading ? (
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                            <Card sx={{ height: "100%", p: 2 }}>
                                <Skeleton variant="circular" width={48} height={48} />
                                <CardContent>
                                    <Skeleton variant="text" height={40} />
                                    <Skeleton variant="text" height={80} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : error ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="error">{error}</Typography>
                </Box>
            ) : (
                <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                    justifyContent="center"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(2, 2fr)',
                            lg: 'repeat(4, 1fr)'
                        },
                        gap: 2,
                        marginTop: 4,
                        marginBottom: 4,
                        padding: 2,
                    }}
                >
                    {categories.map((category) => (
                        <Grid direction='row' item xs={12} sm={6} md={4} lg={3} key={category._id}>
                            <Link
                                to={`/products/${category._id}?name=${encodeURIComponent(category.title)}`}
                                style={{ textDecoration: "none", display: "block", height: "100%" }}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        backgroundColor: "#111827",
                                        color: "white",
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        position: "relative",
                                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        '&:hover': {
                                            transform: "translateY(-8px)",
                                            boxShadow: "0 12px 20px rgba(34, 0, 158, 0.68)"
                                        },
                                        '&:hover .card-highlight': {
                                            width: "100%"
                                        }
                                    }}
                                >
                                    <Box
                                        className="card-highlight"
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            height: 4,
                                            width: "30%",
                                            backgroundColor: "rgba(0, 115, 255, 0.68)",
                                            transition: "width 0.3s ease"
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            p: 2,
                                            pb: 0
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 68,
                                                height: 68,
                                                borderRadius: "50%",
                                                // backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <img
                                                src={category.icon || "/placeholder.png"}
                                                alt={category.title}
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    objectFit: "contain",
                                                    filter: "invert(1)"
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ pt: 1.5 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                                fontSize: { xs: "1rem", md: "1.2rem" }
                                            }}
                                        >
                                            {category.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.85,
                                                fontSize: { xs: "0.8rem", md: "0.9rem" },
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {category.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ProductList;