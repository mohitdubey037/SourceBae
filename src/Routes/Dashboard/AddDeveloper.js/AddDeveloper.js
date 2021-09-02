import React from 'react'
import Navbar from '../Navbar'
import './AddDeveloper.css'


import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '90%',
        backgroundColor: '#f2f2f2',
        fontFamily: 'Open Sans',
    },
}));

function AddDeveloper() {

    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Navbar headingInfo="Add Developer" />

            <div className="mainAddDeveloperForm">
                <div className="innermainAddDeveloperForm">
                    <div className="formArea">
                        <div className="formHeading">
                            <h2>Let’s start with your project details</h2>
                        </div>
                        <div className="mainForm">
                            <div className="projectNameForm">
                                <h2>Project Name</h2>
                                <input type="text" placeholder="Project Name*" name="" id="" />
                            </div>
                            <div className="projectDescForm">
                                <h2>Project Name</h2>
                                <textarea cols="150" type="text" placeholder="Project Description*" name="" id="" />
                                <div className="limitsOfWords">
                                    <p>Min 350 words</p>
                                    <p>0/500</p>
                                </div>
                            </div>
                            <div className="projectNameForm">
                                <h2>How soon do you wish to get started?*</h2>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="nextButton">
                                <button>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDeveloper
