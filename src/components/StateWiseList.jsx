import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DistrictWiseList from './DistrictWiseList';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
function StateWiseList({ covidData }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const stateWiseData = Object.keys(covidData).map(state => {
        let eachStateWiseData = covidData[state];
        let districtData = eachStateWiseData.districtData || {};
        let stateWiseConfirmed = 0;
        let stateWiseRecovered = 0;
        let stateWiseDeceased = 0;
        Object.keys(districtData).forEach((each) => {
            let data = districtData[each];
            stateWiseConfirmed += parseInt(data.confirmed);
            stateWiseRecovered += parseInt(data.recovered);
            stateWiseDeceased += parseInt(data.deceased);
        });
        let object = {};
        object.code = eachStateWiseData.statecode;
        object.name = state;
        object.confirmed = stateWiseConfirmed;
        object.recovered = stateWiseRecovered;
        object.deceased = stateWiseDeceased;
        object.districtData = districtData;
        return object
    })
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>State</TableCell>
                        <TableCell align="right">Confirmed</TableCell>
                        <TableCell align="right">Recovered</TableCell>
                        <TableCell align="right">Deceased</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(Object.keys(stateWiseData).length) ? stateWiseData.map(state =>
                        <React.Fragment key={state.code}>
                            <TableRow  >
                                <TableCell>
                                    <IconButton aria-label="expand row" size="small" onClick={() => { (!open || (open != state.code)) ? setOpen(state.code) : setOpen(false) }}>
                                        {(open == state.code) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">{state.name}</TableCell>
                                <TableCell align="right">{state.confirmed}</TableCell>
                                <TableCell align="right">{state.recovered}</TableCell>
                                <TableCell align="right">{state.deceased}</TableCell>
                            </TableRow>
                            <DistrictWiseList open={(open == state.code) ? true : false} districtData={state.districtData} />
                        </React.Fragment>
                    ) :
                        <TableRow> <TableCell align="center" colSpan={5}>No Data</TableCell></TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
StateWiseList.propTypes = {
    covidData: PropTypes.object.isRequired
};
export default StateWiseList;
