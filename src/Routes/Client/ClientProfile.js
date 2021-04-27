import React, { useState } from 'react'
import ClientNavbar from './ClientNavbar'
import './ClientProfile.css'

import avatar from '../../assets/images/ClientDashboard/avatar.png'

function ClientProfile() {

    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <ClientNavbar />

            <div className="mainClientProfile">
                <div className="innerClientProfile">
                    <div className="clientProfileHeading">
                        <h2>My Profile</h2>
                    </div>

                    <div className="myProfileInfo">
                        <div className="leftLineClient"></div>

                        {
                            isEdit == false ?
                                <div onClick={() => setIsEdit(true)} className="profileEditBtn">Edit <i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                :
                                (
                                    <><div onClick={() => setIsEdit(false)} className="cancel">Cancel</div>
                                        <div onClick={() => setIsEdit(false)} className="save">Save</div>
                                    </>)
                        }

                        <div className="myProfileCard">
                            <div className="avatarArea">
                                <div>
                                    <img src={avatar} alt="" />
                                </div>
                            </div>
                            <div className="clientProfileDetails">
                                <div className="clientProfilDesc">
                                    <div className="clientFormHeading">
                                        <p>Name:-</p>
                                    </div>
                                    <div className="clientFormAnswer">
                                        {
                                            isEdit ? <input type="text" value="Mohd Zaid" name="" id="" /> : <p>Mohd Zaid</p>
                                        }

                                    </div>
                                </div>
                                <div className="clientProfilDesc">
                                    <div className="clientFormHeading">
                                        <p>Email:-</p>
                                    </div>
                                    <div className="clientFormAnswer">
                                        {
                                            isEdit ? <input type="text" value="mzaid6961@gmail.com" name="" id="" />
                                                : <p>mzaid6961@gmail.com</p>
                                        }

                                    </div>
                                </div>
                                <div className="clientProfilDesc">
                                    <div className="clientFormHeading">
                                        <p>Phone Number:-</p>
                                    </div>
                                    <div className="clientFormAnswer">
                                        {
                                            isEdit ? <input type="text" value="8077534053" /> : <p>+91 8077534053</p>
                                        }


                                    </div>
                                </div>
                                <div className="clientProfilDesc">
                                    <div className="clientFormHeading">
                                        <p>Designation:-</p>
                                    </div>
                                    <div className="clientFormAnswer">
                                        {
                                            isEdit ? <input type="text" value="Client" /> : <p>Client</p>
                                        }

                                    </div>
                                </div>
                                <div className="clientProfilDesc">
                                    <div className="clientFormHeading">
                                        <p>Location:-</p>
                                    </div>
                                    <div className="clientFormAnswer">
                                        {
                                            isEdit ? <input type="text" value="Meerut,Uttar Pradesh" /> : <p>Meerut,Uttar Pradesh</p>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientProfile
