import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import PageNotFound from '../../../assets/images/Newestdashboard/Not_found/PageNotFound.svg'
import Spinner from '../../../Components/Spinner/Spinner';
import './ProductAgencies.css'
import logo from '../../../assets/images/Logo/logo.png';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UpImage from '../../../assets/images/Newestdashboard/Short_Term/UpImage.svg';
import DownImage from '../../../assets/images/Newestdashboard/Short_Term/DownImage.svg';

import instance from '../../../Constants/axiosConstants';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Back from '../../../Components/Back/Back';


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

function getStyles(singleTechObject, allTechnologies, theme) {
    return {
        fontWeight:
            allTechnologies.indexOf(singleTechObject) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

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
    'Seed',
    'Series-A',
    'Series-B',
    'Series-C',
    'Venture-Round',
    'Angel',
    'Corporate-Round',
    'Debt-Financing',
    'Equity-Crowdfunding', ,
    'Grant',
    'Pre-Seed',
];
const bType = [
    'B2B',
    'B2C',
    'B2G',
    'B2B2C'
]

function ProductAgencies(props) {

    const Role = localStorage.getItem('role');

    const [fundName, setFundName] = React.useState('');
    const [bmodal, setBmodal] = React.useState('');
    const [domain, setDomain] = useState('');
    const [searchLocation, setSearchLocation] = useState('')
    const [open, setOpen] = useState(false);
    const [personName, setPersonName] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);
    const [err, setErr] = useState();
    const [allDomainsData, setAllDomainsData] = useState([])

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const handleLocation = (event) => {
        setSearchLocation(event.target.value);
    }

    const handleFundType = (event) => {
        const { value } = event.target
        setFundName(value);
    };
    const handleDomainType = (event) => {
        const { value } = event.target
        setDomain(value);
    };
    const handleBmodal = (event) => {
        const { value } = event.target
        setBmodal(value);
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

    const clearAllField = () => {
        setSearchLocation('');
        setFundName('');
        setBmodal('');
        setDomain('');
    }


    const onSearchHandler = () => {
        if ((bmodal === '' && fundName === '' && searchLocation === '' && domain === '')) {
            instance.get(`/api/${Role}/products/all`)
                .then(response => {
                    setLoading(false);
                    setState(response);
                })
                .catch(err => {
                    setLoading(false)
                    setErr(err?.response?.data?.message)
                })
        }
        else {
            instance.get(`/api/${Role}/products/all?businessModel=${bmodal}&fundingType=${fundName}&location=${searchLocation}&domain=${domain}`)
                .then(response => {
                    setState(response);
                })
                .catch(err => {
                    setErr(err?.response?.data?.message)
                })
        }

    }

    // const getAllProducts = () => {
    //     setLoading(true)
    //     instance.get(`/api/${Role}/products/all`)
    //         .then(response => {
    //             setLoading(false);
    //             setState(response);
    //         })
    //         .catch(err => {
    //             setLoading(false)
    //             setErr(err?.response?.data?.message)
    //         })
    // }

    const getAllDomains = () => {
        instance.get(`api/${Role}/domains/all`)
            .then(function (response) {
                setAllDomainsData(response);
                setLoading(false);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        onSearchHandler()
        getAllDomains()
    }, [])


    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <Navbar />
                    <div className="mainAgencyList_productAgencies">
                        <img className="Image1_productAgencies" src={UpImage} alt="upImage" />
                        <img className="Image2_productAgencies" src={DownImage} alt="downImage" />
                        <Back name="Product Agencies" />
                        <div className="innerAgencyList_productAgencies">
                            {err ?
                                <>
                                    <div className="not_found_productAgency" style={{ textAlign: 'center', width: '100%' }}>
                                        <img height="300px" src={PageNotFound} alt="no_data_img" />
                                        <h6>{err}</h6>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="AgencyCardsArea_productAgencies">
                                        {
                                            state?.map((value, index) => {
                                                return (
                                                    <div className="agencyPreciseCard agencyPreciseCard_productAgencies">
                                                        <div className="agencyCardHeaderInfo">
                                                            <div className="agencyImageProfile innerdiv">
                                                                <div className="agencyImageArea image">
                                                                    <img src={logo} alt="" />
                                                                </div>
                                                                <div className="agencyProfileInfo name">
                                                                    <h6>{value?.agencyId?.agencyName}</h6>
                                                                    <div>
                                                                        {value?.agencyId?.agencyDomains?.map(p => {
                                                                            return (
                                                                                <p>{p?.domainId?.domainName}</p>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="profileButton">
                                                                <p onClick={() => props.history.push({
                                                                    pathname: `/agency-profile:${value?.agencyId?._id}`,
                                                                })}>View Agency Profile <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                                                            </div>
                                                        </div>

                                                        <div className="productInformationHeading">
                                                            <h5>Product Information</h5>
                                                        </div>

                                                        <div className="middleAgencyArea productAgencyMiddle bottom">
                                                            <div className="productAgenciesTeam">
                                                                <div className="productAgencyList">
                                                                    <div className="productAgencyContent">
                                                                        <span>Location:</span>
                                                                        <p>{value?.productCompanyLocation}</p>
                                                                    </div>
                                                                    <div className="productAgencyContent">
                                                                        <span>Team Size</span>
                                                                        <p>{value?.productTeamSize}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="productAgencyList">
                                                                    <div className="productAgencyContent">
                                                                        <span>Total Funding</span>
                                                                        <p>$ {value?.productRevenueGenerated}</p>
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
                                                                            <img src={value?.agencyId?.agencyLogo} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="productAgencyDescPara">
                                                                        <p style={{width:"80%"}}>{value?.agencyId?.agencyDescription}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="quotationShortlistButton button">
                                                            <div>
                                                                <NavLink style={{ textDecoration: 'none', color: "#ffffff" }} to={{
                                                                    pathname: `/product-details:${value._id}`,
                                                                    condition: 'Client'
                                                                }}>View Product</NavLink>
                                                            </div>
                                                            <div onClick={onOpenModal}><p>Connect</p></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="agencyFilterArea_productAgencies">
                                        <div className='filterForm_productAgencies'>
                                            <div className="filterHeading">
                                                <p className="filter_productAgencies">Filter</p>
                                                <div onClick={() => clearAllField()} style={{ cursor: 'pointer' }}><p>Clear All</p></div>
                                            </div>

                                            <div className="locationFilter">
                                                <p>Location</p>
                                                <input style={{paddingLeft: '2px'}} name='location' id="filterLocation" onChange={(event) => handleLocation(event)} type="text" placeholder="Type here.." value={searchLocation} />
                                            </div>

                                            <div className="officeVisitFilter_productAgencies">
                                                <p>Sort By :</p>
                                                <FormControl className={classes.formControl} style={{ marginLeft: "0rem", height: '35px', border: '1px solid #999' }}>
                                                    <Select
                                                        displayEmpty
                                                        value={domain}
                                                        onChange={(event) => handleDomainType(event)}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <em>Choose from here</em>;
                                                            }
                                                            return allDomainsData.filter(allDomain => selected.includes(allDomain._id)).map(allDomain => allDomain.domainName).join(', ');
                                                        }}
                                                    >

                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {allDomainsData.map((dname, index) => {
                                                            return (
                                                                <MenuItem
                                                                    key={dname._id}
                                                                    value={dname._id}
                                                                    style={getStyles(dname.domainName, allDomainsData, theme)}
                                                                >
                                                                    {dname.domainName}
                                                                </MenuItem>
                                                            )
                                                        }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div style={{ border: 'none' }} className="officeVisitFilter">
                                                <p>Funding type:</p>
                                                <FormControl className={classes.formControl} style={{ marginLeft: "0rem", height: '35px', border: '1px solid #999' }}>
                                                    <Select
                                                        displayEmpty
                                                        value={fundName}
                                                        onChange={(event) => handleFundType(event)}
                                                        inputProps={{ 'aria-label': 'Without label' }}

                                                    >

                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {fundType.map((fname, index) => {
                                                            return (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={fname}
                                                                    style={getStyles(fname, fundName, theme)}
                                                                >
                                                                    {fname}
                                                                </MenuItem>
                                                            )
                                                        }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </div>

                                            <div className="officeVisitFilter">
                                                <p>Business Models:</p>
                                                <FormControl className={classes.formControl} style={{ marginLeft: "0rem", height: '35px', border: '1px solid #999' }}>
                                                    <Select
                                                        displayEmpty
                                                        value={bmodal}
                                                        onChange={(event) => handleBmodal(event)}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {bType.map((bname, index) => {
                                                            return (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={bname}
                                                                    style={getStyles(bname, bmodal, theme)}
                                                                >
                                                                    {bname}
                                                                </MenuItem>
                                                            )
                                                        }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                <div className="search-filter_productAgencies">
                                                    <h5 className='searchButton' onClick={onSearchHandler}>Search</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            }

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
                    <div>
                        <p>Get connected to the Company <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i></p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductAgencies
