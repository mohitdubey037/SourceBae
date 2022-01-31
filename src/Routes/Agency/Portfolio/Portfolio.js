import React, { useState, useEffect, useCallback } from 'react';
import './Portfolio.css';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import pastWork from '../../../assets/images/Newestdashboard/Portfolio/past_work.svg';
import feedback from '../../../assets/images/Newestdashboard/Portfolio/feedback.svg';
import win_more from '../../../assets/images/Newestdashboard/Portfolio/win_more.svg';
import { useDropzone } from 'react-dropzone';
import instance from '../../../Constants/axiosConstants';
import Spinner from '../../../Components/Spinner/Spinner';
import { upload } from '../../../shared/helper';

function Portfolio(props) {
    const logoLink =
        'https://sourcebae.s3.ap-south-1.amazonaws.com/staging/image/Sourcebae-14.svg';
    const Role = localStorage.getItem('role');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setLogo(acceptedFiles);
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject } =
        useDropzone({
            onDrop,
            accept: '.jpeg,.png,.jpg',
            minSize: 0
            // maxSize,
        });

    const [form, setForm] = useState({
        projectName: '',
        projectLink: '',
        projectTimeline: '5',
        projectDescription: '',
        projectLogo: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const errorValidation = () => {
        const errors = {};
        if (logo === null) {
            errors.projectLogo = 'Please upload a portfolio logo';
        } else if (form.projectName === '') {
            errors.projectName = 'Project name is required';
        } else if (form.projectName.length > 50) {
            errors.projectName = 'Project name must be shorter thm 50 letter';
        } else if (form.projectDescription === '') {
            errors.projectDescription = 'Project description  is required';
        } else if (form.projectLink === '') {
            errors.projectLink = 'Web link is required';
        } else if (form.projectTimeline <= 4) {
            errors.projectTimeline = 'Timeline must be more than 4 days';
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) return true;
        else return false;
    };

    async function uploadMedia() {
        try {
            const detail = await upload(logo, Role);
            detail &&
                setForm({
                    ...form,
                    projectLogo: detail
                });
        } catch (err) {
            console.log(err);
        }
    }

    const portfolioCreate = () => {
        setLoading(true);
        instance
            .post(`/api/${Role}/portfolios/create`, form)
            .then((res) => {
                props.history.replace({
                    pathname: '/agency-profile',
                    origin: 'portfolio'
                });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (form.projectLogo !== '') {
            portfolioCreate();
        }
    }, [form.projectLogo]);

    const createPortfolio = () => {
        if (errorValidation()) {
            uploadMedia();
        }
    };

    return (
        <>
            <Navbar logoLink={logoLink} />
            {loading ? (
                <Spinner />
            ) : (
                <div
                    className="main_portfolio_parent"
                    style={{ paddingTop: '5rem' }}
                >
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
                                    <p>
                                        Provide Some Details of successful
                                        projects you have worked on
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="work_image">
                                    <img src={feedback} alt="feedback" />
                                </div>
                                <div className="work_title">
                                    <p>Get Feedback From Clients.</p>
                                </div>
                                <div className="work_desc">
                                    <p>
                                        Ask for a quick, 2-min review from your
                                        clients or upload a proof.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="work_image">
                                    <img src={win_more} alt="win_more" />
                                </div>
                                <div className="work_title">
                                    <p>Win More Projects.</p>
                                </div>
                                <div className="work_desc">
                                    <p>
                                        These projects and reviews are showcased
                                        for better conversion.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <section className="portfolio_section">
                            <div className="improves_profile">
                                <p>Improves your profile by 20%</p>
                            </div>
                            <div className="new_project_div">
                                <div className="add_a_new_definition">
                                    <p>Add a new project to your portfolio</p>
                                </div>
                                <div className="add_a_new_portfolio_project">
                                    <p>Project logo</p>

                                    <section className="container_portfolio">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {!isDragActive &&
                                                'Click here to upload a file!'}
                                            {isDragActive &&
                                                !isDragReject &&
                                                "Drop it like it's hot!"}
                                            {isDragReject &&
                                                'File type not accepted, sorry!'}
                                        </div>
                                        <p className="logo_detail">
                                            {logo !== null && logo[0].name}
                                        </p>
                                    </section>
                                </div>
                                <div className="projectLogo_error">
                                    {errors.projectLogo && (
                                        <p className="error_paragraph basic error_portfolio">
                                            {errors.projectLogo}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="logo_parent_div">
                                <div className="portfolio_inputs">
                                    <div>
                                        <p className="project-question">
                                            Project name *
                                        </p>
                                        <input
                                            name="projectName"
                                            type="text"
                                            placeholder="Enter project name"
                                            value={form.projectName}
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.projectName && (
                                            <p className="error_paragraph basic error_portfolio">
                                                {errors.projectName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="project-question">
                                            Product portfolio url
                                        </p>
                                        <input
                                            name="projectLink"
                                            type="text"
                                            placeholder="Enter url"
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.projectLink && (
                                            <p className="error_paragraph basic error_portfolio">
                                                {errors.projectLink}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="portfolio_inputs portfolio_inputs_second">
                                    <div>
                                        <p className="project-question">
                                            A brief description of your project.
                                            *
                                        </p>
                                        <textarea
                                            name="projectDescription"
                                            style={{ width: '108%' }}
                                            id="input1"
                                            cols="30"
                                            rows="10"
                                            value={form.projectDescription}
                                            placeholder="Enter project description"
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        ></textarea>
                                        {errors.projectDescription && (
                                            <p className="error_paragraph basic error_portfolio_description">
                                                {errors.projectDescription}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="project-question">
                                            Project Timeline (in days){' '}
                                        </p>
                                        <input
                                            name="projectTimeline"
                                            type="number"
                                            min="5"
                                            value={form.projectTimeline}
                                            placeholder="Enter project timeline"
                                            onChange={(event) =>
                                                handleChange(event)
                                            }
                                        />
                                        {errors.projectTimeline && (
                                            <p className="error_paragraph basic error_portfolio">
                                                {errors.projectTimeline}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="submit_portfolio_parent">
                                    <button
                                        className="submit_portfolio"
                                        type="submit"
                                        onClick={createPortfolio}
                                    >
                                        Submit Project
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    );
}

export default Portfolio;
