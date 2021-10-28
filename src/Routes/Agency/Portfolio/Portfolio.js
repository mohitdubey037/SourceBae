import React, { useState } from 'react';
import './Portfolio.css';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import pastWork from '../../../assets/images/Newestdashboard/Portfolio/past_work.svg';
import feedback from '../../../assets/images/Newestdashboard/Portfolio/feedback.svg';
import win_more from '../../../assets/images/Newestdashboard/Portfolio/win_more.svg';
import { FilePicker } from "react-file-picker";
import fileIcon from '../../../assets/images/Newestdashboard/Agency-form/attach-file.svg';
import fileUpload from '../../../assets/images/Newestdashboard/Portfolio/upload_file.svg';
import instance from "../../../Constants/axiosConstants";

import { toast } from "react-toastify";

function Portfolio() {

    const Role = localStorage.getItem('role');
    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
    })

    const [logo, setLogo] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const inputFileChoosen = (projectDoc) => {
        setLogo(projectDoc);
    }

    const errorValidation = () => {
        const errors = {}
        if (logo === null) {
            errors.developerResume = 'Resume is required';
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0)
            return true;
        else
            return false;
    }


    function uploadMedia() {
        if (errorValidation()) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                logo && formData.append(
                    "files",
                    logo,
                    logo.name
                );
                instance.post(`https://api.onesourcing.in/api/${Role}/media/create`, formData)
                    .then(function (response) {
                        setForm({
                            ...form,
                            documentLink: response[0].mediaURL
                        })
                    })
                    .catch(err => {
                    })
            })
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '5rem' }}>
                <Back name="Portfolio" />
                <div className="portfolio_parent">
                    <div className="work_parent">
                        <div>
                            <div className="work_image">
                                <img src={pastWork} alt="past_work" />
                            </div>
                            <div className="work_title">
                                <p>Add Your Past Work</p>
                            </div>
                            <div className="work_desc">
                                <p>Provide Some Details of successful projects you have worked on</p>
                            </div>
                        </div>
                        <div>
                            <div className="work_image">
                                <img src={feedback} alt="feedback" />
                            </div>
                            <div className="work_title">
                                <p>Get Feedback From Clients</p>
                            </div>
                            <div className="work_desc">
                                <p>Ask for a quick, 2-min review from your clients or upload a proof</p>
                            </div>
                        </div>
                        <div>
                            <div className="work_image">
                                <img src={win_more} alt="win_more" />
                            </div>
                            <div className="work_title">
                                <p>Win More Projects</p>
                            </div>
                            <div className="work_desc">
                                <p>These projects and reviews are showcased for better conversion</p>
                            </div>
                        </div>
                    </div>

                    <section>
                        <div className="improves_profile">
                            <p>Improves your profile by 20%</p>
                        </div>
                        <div className="new_project_div">
                            <div className="add_a_new_definition">
                                <p>Add a new project to your portfolio</p>
                            </div>
                            <div className="add_a_new_portfolio_project">
                                <p>Project logo</p>
                                {/* <div className="upload_portfolio_image">
                                        <img src={fileUpload} alt="fileUpload" />
                                    </div> */}
                                <FilePicker
                                    extensions={['pdf', 'doc', 'docx']}
                                    onChange={(fileObj) => inputFileChoosen(fileObj)}
                                    onError={errMsg => toast.error(errMsg)}
                                >
                                    <div className="logo_div">
                                        <p style={{ fontSize: "12px" }}>{logo ? logo.name.slice(0, 25) : 'pick file'}</p>
                                        {/* <img src={fileIcon} alt="finish" /> */}
                                        <img src={fileUpload} alt="fileUpload" />

                                    </div>
                                </FilePicker>
                                <p><span>Browse</span> and upload your logo</p>
                            </div>

                        </div>

                        <div className="logo_parent_div">
                            <div className="portfolio_inputs">
                                <div>
                                    <p className="project-question">What was your project named ?</p>
                                    <input name="input1" type="text" placeholder="Enter project name" onChange={(event) => handleChange(event)} />
                                </div>
                                <div>
                                    <p className="project-question">Do You have a website(product) link ?</p>
                                    <input name="input1" type="text" placeholder="Enter url" onChange={(event) => handleChange(event)} />
                                </div>
                            </div>
                            <div className="portfolio_inputs portfolio_inputs_second">
                                <div>
                                    <p className="project-question">Write about the project ?</p>
                                    <textarea name="input1" id="input1" cols="30" rows="10" placeholder="Enter project description" onChange={(event) => handleChange(event)} ></textarea>
                                </div>
                                <div>
                                    <p className="project-question">What was the project timeline ? </p>
                                    <input name="input1" type="text" placeholder="Enter project timeline" onChange={(event) => handleChange(event)} />
                                </div>
                            </div>
                            <div className="submit_portfolio_parent">
                                <button className="submit_portfolio" type="submit">Submit Project</button>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </>
    )

}

export default Portfolio