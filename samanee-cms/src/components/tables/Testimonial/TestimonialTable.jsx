// components/admin/TestimonialTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from "../../../redux/Testimonials/testimonial.thunk.js";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Button,
    TextField,
    Box,
    Container,
    Card,
    CardContent,
    CardHeader,
    Alert,
    Grid,
    InputAdornment,
    Avatar,
    TablePagination,
} from "@mui/material";

import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    LinkedIn,
    WhatsApp,
} from "@mui/icons-material";

const TestimonialTable = () => {
    const dispatch = useDispatch();
    const { testimonials = [], loading, error } = useSelector(
        (state) => state.testimonial
    );

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        description: "",
        image: "",
        social: { type: "linkedin", url: "" },
    });

    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, [dispatch]);

    const resetForm = () => {
        setFormData({
            name: "",
            designation: "",
            description: "",
            image: "",
            social: { type: "linkedin", url: "" },
        });
        setEditMode(false);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            name: formData.name.trim(),
            designation: formData.designation.trim(),
            description: formData.description.trim(),
            image: formData.image.trim(),
            social: {
                type: formData.social.type,
                url: formData.social.url.trim(),
            },
        };

        if (editMode) {
            dispatch(updateTestimonial({ id: editingId, testimonial: payload }));
        } else {
            dispatch(createTestimonial(payload));
        }

        resetForm();
    };

    const handleEdit = (testimonial) => {
        setFormData(testimonial);
        setEditingId(testimonial._id);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteTestimonial(id));
    };

    const filteredTestimonials = testimonials.filter((item) =>
        [item.name, item.designation]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" fontWeight="bold" gutterBottom color="black">
                Testimonials Management
            </Typography>

            {/* Form */}
            <Card elevation={3} sx={{ mb: 4 }}>
                <CardHeader
                    title={editMode ? "Edit Testimonial" : "Add New Testimonial"}
                    sx={{ backgroundColor: "#f5f5f5" }}
                    action={
                        editMode && (
                            <Button
                                onClick={resetForm}
                                variant="outlined"
                                size="small"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        )
                    }
                />
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container direction='column' spacing={2}>
                            {["name", "designation", "description", "image"].map((field) => (
                                <Grid item xs={12} md={6} key={field}>
                                    <TextField
                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        value={formData[field]}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field]: e.target.value })
                                        }
                                        fullWidth
                                        multiline={field === "description"}
                                        rows={field === "description" ? 3 : 1}
                                        required
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={6} md={3}>
                                <TextField
                                    select
                                    label="Social Type"
                                    SelectProps={{ native: true }}
                                    value={formData.social.type}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            social: { ...formData.social, type: e.target.value },
                                        })
                                    }
                                    fullWidth
                                >
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="whatsapp">WhatsApp</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <TextField
                                    label="Social URL"
                                    value={formData.social.url}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            social: { ...formData.social, url: e.target.value },
                                        })
                                    }
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, textAlign: "right" }}>
                            <Button type="submit" variant="contained" color="primary">
                                {editMode ? "Update" : "Add"}
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Table */}
            <Box sx={{ mb: 2, mt: 6, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" fontWeight="bold">
                    Testimonials Table
                </Typography>
                <TextField
                    label="Search Testimonials"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Card elevation={3}>
                <CardHeader title="Testimonials List" sx={{ backgroundColor: "#f5f5f5" }} />
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ m: 2 }}>
                            {error}
                        </Alert>
                    ) : (
                        <>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "bold" }}>Sr</TableCell>

                                            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Designation</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Social</TableCell>
                                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredTestimonials
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((t, index) => (
                                                <TableRow key={t._id} hover>
                                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                                                    <TableCell>{t.name}</TableCell>
                                                    <TableCell>{t.designation}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            href={t.social?.url}
                                                            target="_blank"
                                                            startIcon={
                                                                t.social?.type === "linkedin" ? (
                                                                    <LinkedIn />
                                                                ) : (
                                                                    <WhatsApp />
                                                                )
                                                            }
                                                        >
                                                            {t.social?.type}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={1}>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="primary"
                                                                    onClick={() => handleEdit(t)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDelete(t._id)}
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
                                component="div"
                                count={filteredTestimonials.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
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

export default TestimonialTable;
