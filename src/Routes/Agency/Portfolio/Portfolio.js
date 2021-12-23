import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import pastWork from '../../../assets/images/Newestdashboard/Portfolio/past_work.svg';
import feedback from '../../../assets/images/Newestdashboard/Portfolio/feedback.svg';
import win_more from '../../../assets/images/Newestdashboard/Portfolio/win_more.svg';
// import { FilePicker } from "react-file-picker";
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import fileIcon from '../../../assets/images/Newestdashboard/Agency-form/attach-file.svg';
import fileUpload from '../../../assets/images/Newestdashboard/Portfolio/upload_file.svg';
import instance from "../../../Constants/axiosConstants";
import { FaFileUpload } from 'react-icons/fa';
import Spinner from '../../../Components/Spinner/Spinner';
import { toast } from "react-toastify";

function Portfolio(props) {

    const logoLink = "https://api.onesourcing.in/media/images/1637044803259.svg";
    // const [logo, setLogo] = useState(null);
    const Role = localStorage.getItem('role');
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: '.jpeg,.png,.jpg'
    });

    const acceptedFileItems = acceptedFiles.map(file => {
        // setLogo(file.path)
        return (
            <p style={{ color: 'green' }}>
                {file.path}
            </p>
        )
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    const [form, setForm] = useState({
        projectName: '',
        projectLink: '',
        projectTimeline: '5',
        projectDescription: '',
        projectLogo: ''
    })


    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value
        })
    }

    console.log(acceptedFileItems);

    // const inputFileChoosen = (projectDoc) => {
    //     setLogo(projectDoc);
    // }
    // useEffect(() => {
    //     console.log('hhhhhhhiiiiiiiiiii llllllo;og');

    // }, [logo])

    const errorValidation = () => {
        const errors = {}
        // if (!acceptedFileItems) {
        //     console.log(acceptedFileItems);
        //     errors.projectLogo = "Please upload a portfolio logo";
        //     toast.error("Please Upload Portfolio logo.");
        // }
        if (form.projectName === '') {
            errors.projectName = 'Project Name is required';
            console.log('1');
        }
        else if (form.projectName.length > 50) {
            errors.projectName = 'Projret name must be shorter thm 50 letter';
            console.log('2');

        }
        else if (form.projectDescription === '') {
            errors.projectDescription = 'Project Description  is required'
            console.log('3');

        }
        else if (form.projectLink === '') {
            errors.projectLink = 'Web Link is required'
            console.log('4');

        }
        else if (form.projectTimeline <= 4) {
            errors.projectTimeline = 'timeline must be more than 4 days'
            console.log('5');

        }
        setErrors(errors);
        if (Object.keys(errors).length === 0)
            return true;
        else
            return false;
    }

    const uploadMedia = () => {
        console.log('upload called');
        setLoading(true);
        const fileForm = new FormData();
        acceptedFileItems && fileForm.append(
            "files",
            acceptedFileItems,
            acceptedFileItems[0]._source.fileName,
        );
        instance.post(`api/${Role}/media/create`, fileForm)
            .then(function (response) {
                console.log(response);
                setLoading(false);
                setForm({
                    ...form,
                    projectLogo: response[0].mediaURL
                })
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }

    const portfolioCreate = () => {
        instance.post(`/api/${Role}/portfolios/create`, form)
            .then(res => {
                props.history.replace({
                    pathname: "/agency-profile",
                    origin: 'portfolio'
                })
            })
            .catch(err => {

            })
    }

    useEffect(() => {
        if (form.projectLogo !== '') {
            portfolioCreate();
        }
    }, [form.projectLogo])

    const createPortfolio = () => {
        if (errorValidation()) {
            console.log('mohit dubey');
            uploadMedia();
        }
    }

    return (
        <>

            <Navbar logoLink={logoLink} />
            {loading ? <Spinner /> :
                <div className="main_portfolio_parent" style={{ paddingTop: '5rem' }}>
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
                                    {/* <div className="upload_portfolio_image">
                                        <img src={fileUpload} alt="fileUpload" />
                                    </div> */}
                                    {/* <Dropzone noDrag={true}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div className="logo_div" {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p style={{ fontSize: "12px" }}>{logo ? logo.name.slice(0, 25) : 'pick file'}</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone> */}

                                    <section className="container_portfolio">
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <div className="File_Click">
                                                <FaFileUpload />
                                                <p className="select_file">click to select files</p>
                                            </div>
                                            {/* <em className="select_file">(Only *.jpeg, *.ppg and *.png images will be accepted)</em> */}
                                        </div>
                                        {acceptedFileItems || fileRejectionItems &&
                                            <aside>
                                                <ul>{acceptedFileItems}</ul>
                                                <ul>{fileRejectionItems}</ul>
                                            </aside>
                                        }
                                    </section>

                                    {/* <FilePicker
                                    extensions={['jpeg', 'jpg', 'png']}
                                    onChange={(fileObj) => inputFileChoosen(fileObj)}
                                    onError={errMsg => toast.error(errMsg)}
                                >
                                    <div className="logo_div">
                                        <p style={{ fontSize: "12px" }}>{logo ? logo.name.slice(0, 25) : 'pick file'}</p>
                                        
                                        <img src={fileUpload} alt="fileUpload" />

                                    </div>
                                </FilePicker> */}
                                    {/* <p><span>Browse</span> and upload your logo</p> */}
                                </div>
                            </div>

                            <div className="logo_parent_div">
                                <div className="portfolio_inputs">
                                    <div>
                                        <p className="project-question">What was your project named ?</p>
                                        <input name="projectName" type="text" placeholder="Enter project name" value={form.projectName} onChange={(event) => handleChange(event)} />
                                        {errors.projectName && (<p className="error_paragraph basic error_portfolio">{errors.projectName}</p>)}
                                    </div>

                                    <div>
                                        <p className="project-question">Do You have a website(product) link ?</p>
                                        <input name="projectLink" type="text" placeholder="Enter url" onChange={(event) => handleChange(event)} />
                                        {errors.projectLink && (<p className="error_paragraph basic error_portfolio">{errors.projectLink}</p>)}
                                    </div>
                                </div>
                                <div className="portfolio_inputs portfolio_inputs_second">
                                    <div>
                                        <p className="project-question">Write about the project ?</p>
                                        <textarea name="projectDescription" style={{ width: "108%" }} id="input1" cols="30" rows="10" value={form.projectDescription} placeholder="Enter project description" onChange={(event) => handleChange(event)} ></textarea>
                                        {errors.projectDescription && (<p className="error_paragraph basic error_portfolio_description">{errors.projectDescription}</p>)}
                                    </div>
                                    <div>
                                        <p className="project-question">What was the project timeline ?(in days) </p>
                                        <input name="projectTimeline" type="number" min="5" value={form.projectTimeline} placeholder="Enter project timeline" onChange={(event) => handleChange(event)} />
                                        {errors.projectTimeline && (<p className="error_paragraph basic error_portfolio">{errors.projectTimeline}</p>)}
                                    </div>
                                </div>
                                <div className="submit_portfolio_parent">
                                    <button className="submit_portfolio" type="submit" onClick={createPortfolio}>Submit Project</button>
                                </div>
                            </div>

                        </section>
                    </div>
                </div>
            }
        </>
    )

}

export default Portfolio