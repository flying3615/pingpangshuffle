import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Clock from 'react-live-clock';

import Play from '../container/Play'
import Register from '../container/Register'
import Statistic from '../container/Statistic'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        flexGrow: 1,
    }
}));

export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Register" />
                        <Tab label="Play" />
                        <Tab label="Statistic" />
                    </Tabs>
                    <Typography style={{flexGrow:1}}/>
                    <Typography variant="h6" color="inherit"><Clock format="HH:mm:ss" ticking={true} interval={1000} /></Typography>
                </Toolbar>
            </AppBar>
            {value === 0 && <TabContainer><Register /></TabContainer>}
            {value === 1 && <TabContainer><Play totalPlayers={props.totalPlayers}/></TabContainer>}
            {value === 2 && <TabContainer><Statistic /></TabContainer>}
        </div>
    );
}