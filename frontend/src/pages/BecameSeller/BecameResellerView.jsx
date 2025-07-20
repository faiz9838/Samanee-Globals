import React from 'react'
import BecomeReseller from './BecameSeller'
import { Box } from '@mui/material'
import WhoWeAre from "../../section/WhoWeAre/WhoWeAre";
import WhyChooseUs from "../../components/WhyChooseUs";
import Testimonial from "../../section/Testimonials/Testimonials";
function BecameResellerView() {
    return (
        <Box>
            <BecomeReseller />

            <WhyChooseUs />
            <WhoWeAre />
            <Testimonial />


        </Box>
    )
}

export default BecameResellerView
