import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            width="100%"
            {...other}
        >

            {value === index && (
                <Grid container spacing={2}>

                    {children}
                </Grid>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const ChangesTab = (props) => {
    const [value, setValue] = React.useState(0);
    const { changes } = props
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    var index = 0;
    return (
        <Container maxWidth="md">


            {renderChangesAccordions(props.changes)}


        </Container >
    );
}
const propertyNameFormatter = (propertyName) => {
    var words = propertyName.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1);

    return words.join(" ")
}


const renderTabs = (changes) => {
    var x = 0;
    return changes.map(change => <Tab label={propertyNameFormatter(change["title"])} {...a11yProps(x++)} />)
}

const renderChangesAccordions = (changes) => {
    return changes.map(change => <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>{change["title"]}</Typography>

        </AccordionSummary>
        <AccordionDetails>
            <Box sx={{ flexGrow: 2 }}>
                <Grid container spacing={2}>
                    {propertyAsJsx(change)}
                </Grid>
            </Box>
        </AccordionDetails>

    </Accordion>
    )
}

const propertyAsJsx = (change) => {

    var otherDetails = []
    var innerObjects = [];
    for (var key in change) {
        if (change.hasOwnProperty(key)) {
            // if ((typeof change[key] === "object" && Object.entries(change[key]).length === 0
            //     && (change[key] === null
            //         || change[key].length === 0))) {
            //     console.log(key + " " + typeof change[key]);
            //     continue

            if (typeof change[key] === "object" && (change[key] !== null && Object.entries(change[key]).length !== 0)) {
                var thisInnerObject = (<Grid item xs={10}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{propertyNameFormatter(change[key]["name"])}</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ flexGrow: 2 }}>
                                <Grid container spacing={2}>
                                    {propertyAsJsx(change[key])}
                                </Grid>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>)
                innerObjects.push(thisInnerObject);

            }
            else {
                var propertyValue = change[key]
                if (change[key] === null || change[key].length === 0) propertyValue = "----"
                var thisDetail = (
                    <>
                        <Grid item xs={4}>{propertyNameFormatter(key)}</Grid>

                        <Grid item xs={8}>{propertyValue}</Grid>
                    </>
                )
            }
            otherDetails.push(thisDetail)
        }

    }
    otherDetails.push(innerObjects)
    return otherDetails;

}
export default ChangesTab;