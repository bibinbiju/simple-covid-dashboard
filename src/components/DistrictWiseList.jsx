import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
function DistrictWiseList({ districtData, open }) {
    const classes = useRowStyles();
    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            District Wise Data
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>District</TableCell>
                                    <TableCell align="right">Confirmed</TableCell>
                                    <TableCell align="right">Recovered</TableCell>
                                    <TableCell align="right">Deceased</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(districtData).map((each, key) => (
                                    <TableRow key={key}>
                                        <TableCell component="th" scope="row">
                                            {each}
                                        </TableCell>
                                        <TableCell align="right">{districtData[each].confirmed}</TableCell>
                                        <TableCell align="right">{districtData[each].recovered}</TableCell>
                                        <TableCell align="right">
                                            {districtData[each].deceased}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}

DistrictWiseList.propTypes = {
    open: PropTypes.bool.isRequired,
    districtData: PropTypes.object.isRequired
};
export default DistrictWiseList;
