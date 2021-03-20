/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./mainhomepage.css";

// images link
import secondIllustration from '../../assests/images/LandingPage/secondSlideImage.svg'
import logo2 from "../../assests/images/LandingPage/logo-crop.png";
import illustration from "../../assests/images/LandingPage/ill3.png";
import main_dots from "../../assests/images/LandingPage/main_dots.png";
import work2 from "../../assests/images/LandingPage/work2.png";
import work4 from "../../assests/images/LandingPage/work4.png";
import work from "../../assests/images/LandingPage/work.png";
import work3 from "../../assests/images/LandingPage/work3.png";
import work5 from "../../assests/images/LandingPage/work5.png";


import e_commerce from "../../assests/images/LandingPage/ecom.gif";
import erp from "../../assests/images/LandingPage/erp.gif";
import e_learning from "../../assests/images/LandingPage/Edtech.gif";
import food from "../../assests/images/LandingPage/foodtech.gif";
import projectMgmt from "../../assests/images/LandingPage/ProjectManagementTool.gif";
import travel from "../../assests/images/LandingPage/travel.gif";
import crypto from "../../assests/images/LandingPage/crypto.gif";

import entertainment from "../../assests/images/LandingPage/entertainment.gif";
import chatbots from "../../assests/images/LandingPage/Chatbots.gif"
import healthcare from "../../assests/images/LandingPage/healthcare.gif";
import logistics from "../../assests/images/LandingPage/Logistics.gif";
import fintech from "../../assests/images/LandingPage/fintech.gif";
import ripple from "../../assests/images/LandingPage/ripple.gif";
import layer from "../../assests/images/LandingPage/layer.svg";
import dollar from "../../assests/images/LandingPage/dollar.svg";
import documents from "../../assests/images/LandingPage/documents.svg";
import svg4 from "../../assests/images/LandingPage/svg4.svg";
import svg5 from "../../assests/images/LandingPage/svg5.svg";
import svg6 from "../../assests/images/LandingPage/svg6.svg";
import hangouts from "../../assests/images/LandingPage/hangouts.png";
import hangouts_middle from "../../assests/images/LandingPage/hangouts_middle.png";
import samadhan from "../../assests/images/LandingPage/samadhan.png";
import mernPlus from "../../assests/images/LandingPage/mp.png";
import tealBox from "../../assests/images/LandingPage/tealBox.jpg";
import clients from "../../assests/images/LandingPage/clients.gif";
import faq from "../../assests/images/LandingPage/faq.png";
// import { LaptopWindows } from "@material-ui/icons";
// import twitter from "../assests/img/twitter.png";
// import facebook from "../assests/img/facebook.png";
// import linkedin from "../assests/img/linkedin.png";

const ga = window.firebase.analytics()
const Mainhomepage = () => {

    const [hireDeveloper, setHireDeveloper] = useState(true);
    const [industryExperience, setIndustryExperience] = useState(true);
    const [contactUs, setContactUs] = useState(true);
    const [innerwidth, setInnerWidth] = useState('');
    const [innerheight, setInnerHeight] = useState('');
    const [flag, setFlag] = useState(true);
    const [counterFlag, setCounterFlag] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setFlag(!flag)
        }, 500)
        const { innerWidth, innerHeight } = window;
        setInnerWidth(innerWidth);
        setInnerHeight(innerHeight)
    }, [flag])

    useEffect(() => {
        if (innerwidth >= 768) {
            setHireDeveloper(true)
            setIndustryExperience(true)
            setContactUs(true)
        }
        else {
            setHireDeveloper(false)
            setIndustryExperience(false)
            setContactUs(false)
        }

    }, [innerwidth, innerheight])

    useEffect( () => {
        if(window.scrollY > 572) {
            if(counterFlag) {
                let counts = document.querySelectorAll('.count')
                counts.forEach(count => {
                console.log(count.id)
                    
                    const updateCount = () => {
                        let currentCount = parseInt(count.innerText)
                        let targetCount = count.getAttribute('data-target')
                        let increaseSpeed = 10
                        let increaseCount = parseInt(targetCount / increaseSpeed)

                        if(currentCount < targetCount)
                            if(count.id ==="k_dollars")
                            count.innerText = currentCount + increaseCount
                            else
                            count.innerText = currentCount + increaseCount
                        else
                            if(count.id ==="k_dollars")
                                count.innerText = 
                            '\u0024' +targetCount + '\u0138'
                            else
                                count.innerText = targetCount

                        setTimeout(updateCount , 50)
                    }
                    updateCount()
                })
                setCounterFlag(false)
            }
        }
    })

    return (
        <div className="wrapper">

            <section className = 'coming__soon'>
                <p>Uncover and hire your IT partners + Remote devs!  Beta is LIVE, stable version will be out soon.  🙌🏻🎉</p>
            </section>

            <section className="header">
                <div className="inner_header">
                    <div className="header_image">
                        <img src={logo2} alt="logo2" />
                    </div>
                    {/* <div className="header_btn">
                        <a href="#">Developer</a>
                    </div> */}
                </div>
            </section>

            <section className="landing_page">
                <div className="inner_landingPage">
                    <div className="info_div">
                        <div className="info_text_div">
                            <div className="info_heading">
                                <h1>
                                    <b>Unify your outsourcing needs.</b>
                                </h1>
                            </div>
                            <div className="info_para">
                                <p>
                                OneSourcing is a network of Top IT Agencies, a one-stop platform for Clients To choose companies who has expertise In the client’s requirement domain within the client’s budget and timeline. More features coming soon with the stable version. 
                                </p>
                            </div>
                            <div className="info_buttons">
                                {/* <NavLink to="/agency">
                                </NavLink> */}
                                
                                {/* <NavLink to={{
                                    pathname: '/client',
                                    state: {
                                        clientRole: "6038ecf6b796345b9c82bfbb"
                                    }
                                }} >
                                </NavLink> */}
                                <a href="http://bit.ly/3cPvEvL" target = "blank" onClick = {()=>ga.logEvent('link_clicked', { name: 'Hire Developers'})}>Hire Developers</a>
                                <a href="http://bit.ly/3r3Cv9D" target = "blank"  onClick = {()=>ga.logEvent('link_clicked', { name: 'Join as Agency'})}>Join as Agency</a>
                                    
                            </div>
                        </div>
                        <div className="scroll_div">
                            <div className="scroll_area">
                                <div className="scroll_icon">
                                    <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
                                </div>
                                <div className="scroll_text">
                                    <h3>How we work</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="image_div">
                        {/* <div className="bg_white_Circle"></div> */}
                        <img src={illustration} alt="Error loading" />
                    </div>
                </div>
            </section>

            <section className = 'leads'>
                <div className = 'leads__innerWrapper'>
                    <p className = 'leads__title'>OUR MILESTONES</p>
                    {/* <p className = 'leads__titleDescription'>SHORT DESCRIPTION</p> */}
                    <div className="lead__details">
                        <div className = 'lead__detailsLeft'>
                            <div className="counter__container">
                                <span className="count" data-target = '50'>0</span>
                                <span className="count__detail">Partnered Agencies</span>
                            </div>
                            <div className="counter__container">
                                <span className="count" data-target = '29'>0</span>
                                <span className="count__detail">Completed Projects</span>
                            </div>
                        </div>
                        <div className = 'leads__imageContainer'>
                            <img src={secondIllustration} alt=""/>
                        </div>
                        <div className = 'lead__detailsRight'>
                            <div className="counter__container">
                                <span className="count" data-target = '105'>0</span>
                                <span className="count__detail">Hired Developers</span>
                            </div>
                            <div className="counter__container">
                                <span className="count" id= "k_dollars" data-target = '100'>0</span>
                                {/* <span className="counts" data-target = '100'>100</span>K</span> */}
                                <span className="count__detail">Project Worth($)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="process_main">
                <div className="bg_circle"></div>
                <div className="main_dots_second">
                    <img src={main_dots} alt="main_dots" />
                </div>
                <div className="inner_process">
                    <div className="process_heading">
                        <h1>How we work</h1>
                        <p>
                            Checkout our simplified streamlined processes 
                            to know how we work to provide you with better services.
                        </p>
                    </div>
                    <div className="process_cards">
                        <div className="left_cards">
                            <div className="process_card">
                                <div className="card_number">
                                    <h2>02</h2>
                                </div>
                                <div className="process_image">
                                    <img src={work2} alt="work2" />
                                </div>
                                <div className="process_text">
                                    <h3>Profile Matching</h3>
                                    <p>Making a match between the resource hirer and resource provider.</p>
                                </div>
                            </div>
                            <div className="process_card">
                                <div className="card_number">
                                    <h2>04</h2>
                                </div>
                                <div className="process_image">
                                    <img src={work4} alt="work4" />
                                </div>
                                <div className="process_text">
                                    <h3>Document Completion</h3>
                                    <p>Proceed to Hiring and Document Signing.</p>
                                </div>
                            </div>
                        </div>
                        <div className="right_cards">
                            <div className="process_card">
                                <div className="card_number">
                                    <h2>01</h2>
                                </div>
                                <div className="process_image">
                                    <img src={work} alt="work" />
                                </div>
                                <div className="process_text">
                                    <h3>Requirement Profiling</h3>
                                    <p>Understanding Requirements</p>
                                </div>
                            </div>
                            <div className="process_card">
                                <div className="card_number">
                                    <h2>03</h2>
                                </div>
                                <div className="process_image">
                                    <img src={work3} alt="work3" />
                                </div>
                                <div className="process_text">
                                    <h3>Interview</h3>
                                    <p>Checking the compatibility via interview process and resource screening.</p>
                                </div>
                            </div>
                            <div className="process_card">
                                <div className="card_number">
                                    <h2>05</h2>
                                </div>
                                <div className="process_image">
                                    <img src={work5} alt="work5" />
                                </div>
                                <div className="process_text">
                                    <h3>Finalizing</h3>
                                    <p>Final steps towards perfect sync by setting up remote communication.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="multiple_domain">
                <div className="inner_multipleDomain">
                    <div className="multipleDomain_heading">
                        <h2>Driving Innovation across different Industry Verticals</h2>
                        <p>
                         Onesourcing intends to help <b>Startups, Digital Agencies,
                         Enterprises (big or small) and Software Product Development Companies </b> 
                         to boost their operations 
                        and lead market trends across different industry verticals.
                        </p>
                    </div>
                    <div className="multipleDomains_items">
                        <div className="single_items">
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={e_commerce} alt="e_commerce" />
                                </div>
                                <div className="domain_text">
                                    <h3>E-Commerce</h3>
  
                                </div>
                            </div>
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={e_learning} alt="" />
                                </div>
                                <div className="domain_text">
                                    <h3>Ed-Tech</h3>
            
                                </div>
                            </div>
                        </div>
                        <div className="single_items">
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={entertainment} alt="entertainment" />
                                </div>
                                <div className="domain_text">
                                    <h3>Entertainment</h3>
         
                                </div>
                            </div>
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={erp} alt="erp" />
                                </div>
                                <div className="domain_text">
                                    <h3>ERP/CRM Software</h3>
       
                                </div>
                            </div>
                        </div>
                        <div className="single_items">
                          
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={healthcare} alt="healthcare" />
                                </div>
                                <div className="domain_text">
                                    <h3>Healthcare</h3>
            
                                </div>
                            </div>

                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={crypto} alt="fintech" />
                                </div>
                                <div className="domain_text">
                                    <h3>Crypto</h3>
                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="multipleDomains_items">
                        <div className="single_items">
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={chatbots} alt="chatbots" />
                                </div>
                                <div className="domain_text">
                                    <h3>Chatbots</h3>
                              
                                </div>
                            </div>
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={travel} alt="travel" />
                                </div>
                                <div className="domain_text">
                                    <h3>Travel</h3>
                            
                                </div>
                            </div>
                        </div>
                        <div className="single_items">
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={food} alt="food" />
                                </div>
                                <div className="domain_text">
                                    <h3>Food-Tech</h3>
                       
                                </div>
                            </div>
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={projectMgmt} alt="Project Managment" />
                                </div>
                                <div className="domain_text">
                                    <h3>Project Management Tool</h3>
                                </div>
                            </div>
                        </div>
                        <div className="single_items">
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={logistics} alt="logistics" />
                                </div>
                                <div className="domain_text">
                                    <h3>Logistics</h3>
                               
                                </div>
                            </div>
                            <div className="domain_card">
                                <div className="domain_icon">
                                    <img src={fintech} alt="fintech" />
                                </div>
                                <div className="domain_text">
                                    <h3>Fintech</h3>
                                </div>
                            </div>
                        </div>
                    </div>
               
                </div>
            </section>

            <section className="remote_main">
                <div className="ripple">
                    <img src={ripple} alt="fintech" />
                </div>
                <div className="inner_remote">
                    <div className="remote_heading">
                        <h1>
                        Why hire with us?
                        </h1>
                    </div>

                    <div className="remote_cards_area">
                        <div className="remote_card">
                            <div className="remote_icon">
                                <img src={layer} alt="layer" />
                            </div>
                            <div className="remote_info">
                                <h2>Trust and Transparency</h2>
                                <p>
                                Trust and transparency always summit our list of services. We collaborate with full transparency and thus have achieved the trust of our partners over time.
                                </p>
                            </div>
                        </div>
                        <div className="remote_card">
                            <div className="remote_icon">
                                <img src={dollar} alt="dollar" />
                            </div>
                            <div className="remote_info">
                                <h2>Flexible hiring Models</h2>
                                <p>
                                We and the agencies we work with completely understand your changing requirements and hence have very flexible hiring models. 
                                </p>
                            </div>
                        </div>
                        <div className="remote_card">
                            <div className="remote_icon">
                                <img src={documents} alt="document" />
                            </div>
                            <div className="remote_info">
                                <h2>Affordable Resources</h2>
                                <p>
                                Get top-quality resources at affordable costs. Agencies are able to cut the costs up to 2X with us.
                                </p>
                            </div>
                        </div>
                        <div className="remote_card">
                            <div className="remote_icon">
                                <img src={svg4} alt="svg4" />
                            </div>
                            <div className="remote_info">
                                <h2>Constant Support</h2>
                                <p>
                                Technical support is just one chat away. Get on chat with our developers who have all the answers to your tech-related issues.
                                </p>
                            </div>
                        </div>
                        <div className="remote_card">
                            <div className="remote_icon">
                                <img src={svg5} alt="svg5" />
                            </div>
                            <div className="remote_info">
                                <h2>Coding Practices</h2>
                                <p>
                                Our verified pool of developers follows modern coding practices to ensure the product’s quality, compatibility and security.
                                </p>
                            </div>
                        </div>
                        <div className="remote_card">
                            <div className="remote_icon">
                                <img src={svg6} alt="svg6" />
                            </div>
                            <div className="remote_info">
                                <h2>Innovation-driven</h2>
                                <p>
                                We and our verified resources are innovation-driven. We are always looking up to providing the best and modern features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- testimonials section --> */}

            <section className="testimonials_main">
                <div className="inner_testimonials">
                    <div className="testimonial_heading">
                        {/* <p>Lorem ipsum dolor sit.</p> */}
                        <div className="heading_testimonial">
                            <i className="fa fa-quote-left" aria-hidden="true"></i>
                            <h2>Testimonials</h2>
                            <i className="fa fa-quote-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="testimonial_cards">
                        <div className="testimonialCard firstCard">
                            <div className="testi_icon">
                                <img src={hangouts} alt="hangouts" />
                            </div>
                            <div className="testi_info">
                                <p>
                                Onesourcing has provided us the highest quality candidates 
                                that are most aligned with our business needs.
                                 It is now an essential part of our hiring toolkit
                                </p>
                                <div className="testi_image">
                                    {/* <div className="testi_profile">
                                        <img src={alex} alt="alex" />
                                    </div> */}
                                    <div className="testi_name">
                                        <h5>Varun Sogani</h5>
                                        <h2>Samadhan,IN</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonialCard middle_card">
                            <div className="testi_icon">
                                <img src={hangouts_middle} alt="hangouts_middle" />
                            </div>
                            <div className="testi_info">
                                <p>
                                    OneSourcing offered us some of the best remote developers out there at a rate that is not just budget-friendly for the pockets are also extremely professional in all aspects you could ask for in a work environment.
                                </p>
                                <div className="testi_image">
                                    {/* <div className="testi_profile">
                                        <img src={alex} alt="alex" />
                                    </div> */}
                                    <div className="testi_name">
                                        <h5>Gavin Andrews</h5>
                                        <h2>Gravitas Group, CAN</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonialCard lastCard">
                            <div className="testi_icon">
                                <img src={hangouts} alt="hangouts" />
                            </div>
                            <div className="testi_info">
                                <p>
                                    I’m really happy that Onesourcing exists. 
                                    We use it, it’s amazing, and it works.
                                 </p>
                                <div className="testi_image">
                                    {/* <div className="testi_profile">
                                        <img src={alex} alt="alex" />
                                    </div> */}
                                    <div className="testi_name">
                                        <h5>Rohit Singh </h5>
                                        <h2>PowerAsset,LLC</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="disclaimer">
                        <span className = "no_bond">No Bond Policy</span>
                        <p>If the resource doesn't perform then the contract will be terminated within 1 month of notice.</p>
                    </div>
                </div>
            </section>
            {/* <!-- testimonials section -->

            <!-- carousel section --> */}

            <section className="our_clients">
                <div className="big_circle"></div>
                <div className="inner_ourClients">
                    <div className="ourClients_heading">
                        <h2>
                        You're in Good Company
                        </h2>
                        <p>Trusted by tech companies on us.</p>
                    </div>
                    <div className="our_clients_inner">
                        <div className="ourClients_images">
                            <div className="clients_images">
                                <img src={mernPlus} alt="" />
                                <img src={samadhan} alt="" />
                                <img src={tealBox} alt="" />
                            </div>
                        </div>
                        <div className="ourClients_gifs">
                            <img src={clients} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- carousel section end-->

            <!-- FAQ  --> */}
            <section className="faq">
                <div className="inner_faq">
                    <div className="faq_heading">
                        <div className="heading_faq">
                            <h2>FAQ</h2>
                            <img src={faq} alt="" />
                        </div>
                        <p>We have answers to all your question.</p>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                >
                                    Accordion Item #1
                                </button>
                            </h2>
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element. These
                  classNamees control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    Accordion Item #2
                </button>
                            </h2>
                            <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element. These
                  classNamees control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree"
                                    aria-expanded="false"
                                    aria-controls="collapseThree"
                                >
                                    Accordion Item #3
                </button>
                            </h2>
                            <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div className="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element. These
                  classNamees control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- contact Us  --> */}

            <section className="contact_us">
                <div className="donut_shape"></div>
                <div className="inner_contactUs">
                    <div className="contactUs_heading">
                        <h1>Discover how Remote can help you grow your global team</h1>
                    </div>
                    <div className="contactUs_btn">
                        <a href="https://bit.ly/3cPvEvL" 
                        target="blank">Hire Now<i className="fa fa-angle-right right-arr" aria-hidden="true"></i></a>
                    </div>
                </div>
            </section>

            {/* <!-- footer section --> */}

            <footer className="main_footer">
                <div className="inner_footer">
                    <div className="social_links">
                        {/* <div className="social_div">
                            <img src={twitter} alt="" />
                            <img src={facebook} alt="" />
                            <img src={linkedin} alt="" />
                        </div> */}
                    </div>
                    <div className="hire_developers">
                        <h2 onClick={() => setHireDeveloper(!hireDeveloper)} >
                            <i className="fa fa-angle-double-right" aria-hidden="true"></i> Hire Developers</h2>
                        {
                            hireDeveloper === true ? (
                                <div className="hire_developers_points">
                                    <div className="main_points">
                                        <p>Hire PHP Developers</p>
                                        <p>Hire AngularJS Developers</p>
                                        <p>Hire Python Developers</p>
                                        <p>Hire Node JS Developers</p>
                                        <p>Hire IOS Developers</p>
                                        <p>Hire ReactJS Developers</p>
                                        <p>Hire Android Developers</p>
                                        <p>Hire Flutter Developers</p>
                                        <p>Hire MERN Stack Development</p>
                                        <p>Hire Laravel Development</p>
                                    </div>
                                    <div className="main_points">
                                        <p>Hire WordPress Developers</p>
                                        <p>Hire Machine Learning Experts</p>
                                        <p>Hire Golang Developers</p>
                                        <p>Hire Data Scientists</p>
                                        <p>Hire React Native Developers</p>
                                        <p>Hire Mobile App Developers</p>
                                        <p>Hire MEAN Stack Developers</p>
                                        <p>Hire Full Stack Development</p>
                                        <p>Hire DevOps Development</p>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="industry_exp">
                        <h2 onClick={() => setIndustryExperience(!industryExperience)}>
                            <i className="fa fa-angle-double-right" aria-hidden="true"></i>{" "}Industry Experience</h2>
                        {
                            industryExperience === true ? (
                                <div className="industry_exp_points">
                                    <p>Healthcare</p>
                                    <p>Food & Restaurant</p>
                                    <p>LMS & eLearning</p>
                                    <p>Finance & Banking</p>
                                    <p>e-Commerce</p>
                                    <p>Logistics & Supply Chain</p>
                                    <p>Carpooling</p>
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="contact_links">
                        <h2 onClick={() => setContactUs(!contactUs)}>
                            <i className="fa fa-angle-double-right" aria-hidden="true"></i>{" "} Contact Us</h2>
                        {
                            contactUs === true ? (<div>
                                <div className="contact_links_heading">
                                    <h4>Sales:</h4>
                                    <h4>India: +91-9575517047</h4>
                                </div>
                                <div className="contact_links_heading">
                                    <h4>For Business:</h4>
                                    <h4>connect@shethink.in</h4>
                                </div>
                            </div>
                            ) : null
                        }
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Mainhomepage;
