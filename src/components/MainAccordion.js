import changeData from "../resources/data.json";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import { Box } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import ChangesTab from "./ChangesTab";


var data = JSON.parse(JSON.stringify(changeData));


const populateOtherProperties = () => {
    var otherDetails = []
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key == "description" || key == "changes") continue;
            var thisDetail = (
                <>
                    <Grid item xs={4}>{propertyNameFormatter(key)}</Grid>
                    <Grid item xs={8}>{data[key]}</Grid>
                </>
            )
            otherDetails.push(thisDetail)
        }
    }
    return otherDetails;

}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const propertyNameFormatter = (propertyName) => {
    return propertyName.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1).join(" ");
}

const MainAccordion = () => {

    console.log(data["type"])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{data["title"]}</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ flexGrow: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item >{data["description"]}</Grid>
                                {populateOtherProperties()}


                            </Grid>
                            <br />
                            <ChangesTab changes={data["changes"]} />
                        </Box>


                    </AccordionDetails>
                </Accordion>
            </Container>
        </React.Fragment >);
}

export default MainAccordion;