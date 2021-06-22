import React, { useState, useEffect } from 'react'
import AgencyList from '../../Client/AgencyList/AgencyList'
import ClientNavbar from '../../Client/ClientNavbar';
import { NavLink } from 'react-router-dom';

import './ProductAgencies.css'
// also linked with AgencyList.css

import location from '../../../assets/images/ClientDashboard/shortTerm/location.png'
import team from '../../../assets/images/ClientDashboard/shortTerm/team.png'
import logo from '../../../assets/images/Logo/logo.png'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import instance from '../../../Constants/axiosConstants';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        maxWidth: '100%',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
const fundType = [
    'SEED',
    'SERIES-A',
    'SERIES-B',
    'SERIES-C',
    'VENTURE-ROUND',
    'ANGEL',
    'CORPORATE-ROUND',
    'DEBT-FINANCING',
    'EQUITY-CROWDFUNDING', ,
    'GRANT',
    'PRE-SEED',
];
const bType = [
    'B2B',
    'B2C',
    'B2G',
    'B2B2C'
]

function ProductAgencies(props) {

    const Role = localStorage.getItem('role');

    const [isOfficeVisit, setOfficeVisit] = useState(false);
    const [isOffsiteTravel, setOffsiteTravel] = useState(false);
    const [fundtype, setFundType] = React.useState([]);
    const [bmodal, setBmodal] = React.useState([]);
    const [open, setOpen] = useState(false);
    const [personName, setPersonName] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };
    const handleFundType = (event) => {
        setFundType(event.target.value);
    };
    const handleBmodal = (event) => {
        setBmodal(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };

    const getAllProducts = () => {
        setLoading(true)
        instance.get(`/api/${Role}/products/all`)
            .then(response => {
                console.log(response);
                setLoading(false);
                setState(response);
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }

    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => {
        console.log(state)
    }, [state])


    return (
        <>
            <ClientNavbar />

            <div className="mainAgencyList">
                <div className="innerAgencyList">
                    <div className="AgencyCardsArea">
                        {
                            state?.map((value, index) => {
                                console.log(value);
                                return (
                                    <div className="agencyPreciseCard">
                                        <div className="agencyCardHeaderLine">
                                        </div>
                                        <div className="agencyCardHeaderInfo">
                                            <div className="agencyImageProfile">
                                                <div className="agencyImageArea">
                                                    <img src={logo} alt="" />
                                                </div>
                                                <div className="agencyProfileInfo">
                                                    <h6>{value.agencyId.agencyName}</h6>
                                                    <div>
                                                        {value.agencyId.agencyDomains.map(p => {
                                                            return (
                                                                <p>{p.domainId.domainName}</p>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profileButton">
                                                <p onClick={() => props.history.push({
                                                    pathname: `/agency-profile:${value.agencyId._id}`
                                                })}>View Agency Profile <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                                            </div>
                                        </div>

                                        <div className="productInformationHeading">
                                            <h5>Product Information</h5>
                                        </div>

                                        <div className="middleAgencyArea productAgencyMiddle">
                                            <div className="productAgenciesTeam">
                                                <span className="horizontalLine"></span>
                                                <span className="verticalLine"></span>

                                                <div className="productAgencyList">
                                                    <div className="productAgencyContent">
                                                        <span>Location:</span>
                                                        <p>{value.productCompanyLocation}</p>
                                                    </div>
                                                    <div className="productAgencyContent">
                                                        <span>Team Size</span>
                                                        <p>{value.productTeamSize}</p>
                                                    </div>
                                                </div>
                                                <div className="productAgencyList">
                                                    <div className="productAgencyContent">
                                                        <span>Total Funding</span>
                                                        <p>{value.productRevenueGenerated}</p>
                                                    </div>
                                                    <div className="productAgencyContent">
                                                        <span>Product Type</span>
                                                        <p>E-commerce</p>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="agencyDescInfo">

                                                <div className="productDescArea">
                                                    <div className="productLogoHere">
                                                        <div>
                                                            <img src={value.agencyId.agencyLogo} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="productAgencyDescPara">
                                                        <p>{value.agencyId.agencyDescription}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="quotationShortlistButton">
                                            {/* <div onClick={() => window.location.href = "/product-details"} ><p>View Product</p></div> */}
                                            <div>
                                                <NavLink style={{ textDecoration: 'none' }} to={{
                                                    pathname: 'product-details',
                                                    state: { ...value }
                                                }}>View Product</NavLink>
                                            </div>
                                            <div onClick={onOpenModal}><p>Connect</p></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="agencyFilterArea">
                        <div className='filterForm'>
                            <div className="filterHeading">
                                <p className="filterText">Filter</p>
                                <div style={{ cursor: 'pointer' }}><p>Clear All</p></div>
                            </div>

                            <div className="locationFilter">
                                <p>Location</p>
                                <input type="text" placeholder="Type here.." name="" id="" />
                            </div>

                            <div className="officeVisitFilter">
                                <p>Sort By :</p>
                                {/* <div className="officeVisitRadio" onClick={() => setOfficeVisit(!isOfficeVisit)} >
                                    <div className="officeVisitRadioImage" style={{ backgroundColor: isOfficeVisit ? '#3498DB' : '#fff' }} >
                                        {
                                            isOfficeVisit ? <i style={{ color: isOfficeVisit ? '#fff' : '#000' }} class="fa fa-check" aria-hidden="true"></i> : null
                                        }
                                    </div>
                                    <div>
                                        <span>Allowed</span>
                                    </div>
                                </div> */}
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<Input />}
                                        displayEmpty
                                        disableUnderline
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>;
                                            }

                                            return selected.join(', ');
                                        }}
                                    >
                                        {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox color="primary" checked={personName.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="officeVisitFilter">
                                <p>Funding type:</p>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={fundtype}
                                        onChange={handleFundType}
                                        input={<Input />}
                                        displayEmpty
                                        disableUnderline
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>;
                                            }

                                            return selected.join(', ');
                                        }}
                                    >
                                        {fundType.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox color="primary" checked={fundtype.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="officeVisitFilter">
                                <p>Business Models:</p>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={bmodal}
                                        onChange={handleBmodal}
                                        input={<Input />}
                                        displayEmpty
                                        disableUnderline
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}
                                        renderValue={(selected) => {
                                            if (selected.length === 0) {
                                                return <span style={{ fontFamily: 'Poppins', color: '#999' }}>Select from here</span>;
                                            }

                                            return selected.join(', ');
                                        }}
                                    >
                                        {bType.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox color="primary" checked={bmodal.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal open={open} onClose={onCloseModal} classNames={{
                overlay: 'customOverlayAgencyProduct',
                modal: 'customModalAgencyProduct',
            }} center>
                <div className="modalHeaderProduct">
                    <h2>Get Connected</h2>
                </div>
                <div className="productModalForm">
                    <p className="toText">To : Founder at SheThink</p>

                    <div className="productModalInput">
                        <p>Subject</p>
                        <input type="text" placeholder="Enter your subject" />
                    </div>
                    <div className="productModalInput">
                        <p>Message</p>
                        <textarea cols="30" rows="6" type="text" placeholder="Enter your message here" />
                    </div>
                    <div className="productModalInput">
                        <p>Email ID</p>
                        <input type="text" placeholder="Enter your email" />
                    </div>
                    <div className="productModalInput">
                        <p>Linkedin URL</p>
                        <input type="text" placeholder="Enter your url" />
                    </div>
                </div>
                <div className="connectedButton">
                    <p>Get connected to the Company <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></p>
                </div>
            </Modal>
        </>
    )
}

export default ProductAgencies
