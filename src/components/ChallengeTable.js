import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "primary",
    color: theme.palette.common.black,
		fontSize: 14,
  },
  body: {
    fontSize: 10,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const challengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time', 'Pledge Amount', 'No. Participants'];

function ChallengeTable(props) {
  const { classes, challenges } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {challengeHeaders.map(header => <CustomTableCell>{header}</CustomTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
				{
						challenges.map(challenge => (
								<TableRow className={classes.row} key={challenge.challenge_id}>
										<CustomTableCell>{challenge.challenge_type}</CustomTableCell>
										<CustomTableCell>{challenge.target_quantity}</CustomTableCell>
										<CustomTableCell>{challenge.duration}</CustomTableCell>
										<CustomTableCell>{challenge.start_time}</CustomTableCell>
										<CustomTableCell>{challenge.pledge_amount}</CustomTableCell>
										<CustomTableCell>{challenge.participants.length}</CustomTableCell>
								</TableRow>
						))
				}
        </TableBody>
      </Table>
    </Paper>
  );
}

ChallengeTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChallengeTable);
