import React, { useState } from 'react'
import ClientNavbar from '../ClientNavbar'
import './AgencyList.css'

import location from '../../../assets/images/ClientDashboard/shortTerm/location.png'
import team from '../../../assets/images/ClientDashboard/shortTerm/team.png'
import logo from '../../../assets/images/Logo/logo.png'


import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function AgencyList() {

    const [isOfficeVisit, setOfficeVisit] = useState(false);
    const [isOffsiteTravel, setOffsiteTravel] = useState(false);
    const [open, setOpen] = useState(false);
    const [openQuotation, setOpenQuotation] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onOpenQuotation = () => setOpenQuotation(true);
    const onCloseQuotation = () => setOpenQuotation(false);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <>
            <ClientNavbar />

            <div className="projectDetailsInfo">
                <div className="innerprojectDetailsInfo">
                    <p>One Sourcing</p>
                    <span> <em> Buget:-</em> $5000-$1000</span>
                </div>
            </div>

            <div className="mainAgencyList">
                <div className="innerAgencyList">
                    <div className="AgencyCardsArea">
                        {
                            arr.map((value, index) => {
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
                                                    <h6>Provoz Upturn</h6>
                                                    <div>
                                                        <p>Media & Social</p>
                                                        <p>Proficient</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="profileButton">
                                                <p>View Profile <i class="fa fa-angle-double-right" aria-hidden="true"></i></p>
                                            </div>
                                        </div>

                                        <div className="middleAgencyArea">
                                            <div className="agencyAddressTeam">
                                                <h6>Miscellaneous Info</h6>
                                                <div className="agencyAddressArea">
                                                    <div className="locationIcon">
                                                        <i class="fa fa-globe" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="locationText">
                                                        <p>146/A Umar Nagar, Hapur Road, Meerut, Uttar Pradesh</p>
                                                    </div>
                                                </div>
                                                <div className="agencyAddressArea">
                                                    <div className="teamIcon">
                                                        <i class="fa fa-users" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="teamNumberPart">
                                                        <p><span>11-12</span>members</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="agencyDescInfo">
                                                <h6>Description</h6>
                                                <p>
                                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis consequuntur natus asperiores possimus, voluptates aliquaLorem, ipsum dolor sit amet consectetur adipisicingPe rferendis consequuntur natus asperiores possimus, voluptates aliquam?
                                    </p>
                                            </div>
                                        </div>

                                        <div className="quotationShortlistButton">
                                            <div onClick={onOpenModal}><p>Shortlist</p></div>
                                            <div onClick={onOpenQuotation}><p>Get Quotation</p></div>
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
                                <div><p>Clear All</p></div>
                            </div>

                            <div className="locationFilter">
                                <p>Location</p>
                                <input type="text" placeholder="Type here.." name="" id="" />
                            </div>

                            <div className="officeVisitFilter">
                                <p>Office Visit</p>
                                <div className="officeVisitRadio" onClick={() => setOfficeVisit(!isOfficeVisit)} >
                                    <div className="officeVisitRadioImage" style={{ backgroundColor: isOfficeVisit ? '#3498DB' : '#fff' }} >
                                        {
                                            isOfficeVisit ? <i style={{ color: isOfficeVisit ? '#fff' : '#000' }} class="fa fa-check" aria-hidden="true"></i> : null
                                        }
                                    </div>
                                    <div>
                                        <span>Allowed</span>
                                    </div>
                                </div>
                            </div>

                            <div className="officeVisitFilter">
                                <p>Offsite Travel</p>
                                <div className="officeVisitRadio" onClick={() => setOffsiteTravel(!isOffsiteTravel)} >
                                    <div className="officeVisitRadioImage" style={{ backgroundColor: isOffsiteTravel ? '#3498DB' : '#fff' }} >
                                        {
                                            isOffsiteTravel ? <i style={{ color: isOffsiteTravel ? '#fff' : '#000' }} class="fa fa-check" aria-hidden="true"></i> : null
                                        }
                                    </div>
                                    <div>
                                        <span>Allowed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal for shortlist  */}
            <Modal open={open} onClose={onCloseModal} center classNames={{
                overlay: 'ShortListModalOverlay',
                modal: 'ShortListModal',
            }}>
                <div className="shortlistModal">
                    <h2>ShortList</h2>
                    <div className="shortlistForm">
                        <span>Comment Box</span>
                        <textarea name="" id="" cols="30" rows="10" placeholder="Type from here..."></textarea>
                        <button>Submit</button>
                    </div>
                </div>
            </Modal>

            {/* Quotation Modal  */}
            <Modal open={openQuotation} onClose={onCloseQuotation} center classNames={{
                overlay: 'QuotationModalOverlay',
                modal: 'QuotationModal',
            }}>
                <div className="QuotationModal">
                    <h2>Quotation</h2>
                    <div className="QuotationModalForm">
                        <div className="innerQuotation">
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Project Name</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <p>One Sourcing</p>
                                </div>
                            </div>
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Budget</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <p>$5000- $10000</p>
                                </div>
                            </div>
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Tech</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <p>ReactJs </p>
                                    <p>React Native</p>
                                </div>
                            </div>
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Time</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <p>90 days </p>
                                </div>
                            </div>
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Business Type</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <p>B2B</p>
                                    <p>B2C</p>
                                </div>
                            </div>
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Negotiable Upto</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <input type="number" placeholder="Text should be number" min="0" />
                                </div>
                            </div>
                            <div className="quotationTable">
                                <div className="tableHeaderQuotation">
                                    <p>Comment Box</p>
                                </div>
                                <div className="tableContentQuotation">
                                    <textarea name="" id="" cols="30" rows="6" placeholder="Type from here.." ></textarea>
                                </div>
                            </div>

                            <div className="quotationSubmitButton">
                                <div></div>
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AgencyList
