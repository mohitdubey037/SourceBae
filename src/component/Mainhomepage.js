import React, { useEffect, useState } from "react";
import "./mainhomepage.css";
import { NavLink } from 'react-router-dom';


// images link
import logo2 from "../assests/img/logo2.png";
import illustration from "../assests/img/illustration.png";
import main_dots from "../assests/img/main_dots.png";
import work2 from "../assests/img/work2.png";
import work4 from "../assests/img/work4.png";
import work from "../assests/img/work.png";
import work3 from "../assests/img/work3.png";
import work5 from "../assests/img/work5.png";
import e_commerce from "../assests/img/e_commerce.png";
import e_learning from "../assests/img/e_learning.png";
import food from "../assests/img/food.png";
import travel from "../assests/img/travel.png";
import stethoscope from "../assests/img/stethoscope.png";
import fintech from "../assests/img/fintech.png";
import ripple from "../assests/img/ripple.gif";
import layer from "../assests/img/layer.svg";
import dollar from "../assests/img/dollar.svg";
import documents from "../assests/img/documents.svg";
import svg4 from "../assests/img/svg4.svg";
import svg5 from "../assests/img/svg5.svg";
import svg6 from "../assests/img/svg6.svg";
import hangouts from "../assests/img/hangouts.png";
import alex from "../assests/img/alex.jpg";
import hangouts_middle from "../assests/img/hangouts_middle.png";
import amazon from "../assests/img/amazon.svg";
import office from "../assests/img/office.svg";
import fedex from "../assests/img/fedex.svg";
import dhl from "../assests/img/dhl.svg";
import express from "../assests/img/express.svg";
import kodak from "../assests/img/kodak.svg";
import clients from "../assests/img/clients.gif";
import faq from "../assests/img/faq.png";
import twitter from "../assests/img/twitter.png";
import facebook from "../assests/img/facebook.png";
import linkedin from "../assests/img/linkedin.png";

const Mainhomepage = () => {

    const [hireDeveloper, setHireDeveloper] = useState(true);
    const [industryExperience, setIndustryExperience] = useState(true);
    const [contactUs, setContactUs] = useState(true);
    const [innerwidth, setInnerWidth] = useState('');
    const [innerheight, setInnerHeight] = useState('');
    const [flag, setFlag] = useState(true);
    let counter = 0;

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

    return (
        <>
            <section class="header">
                <div class="inner_header">
                    <div class="header_image">
                        <img src={logo2} alt="logo2" />
                    </div>
                    <div class="header_btn">
                        <a href="#">Developer</a>
                    </div>
                </div>
            </section>

            <section class="landing_page">
                <div class="inner_landingPage">
                    <div class="info_div">
                        <div class="info_text_div">
                            <div class="info_heading">
                                <h1>
                                    All your <br />
                                    <b>resource needs,</b>
                                </h1>
                                <h1>
                                    in one <b>place</b>
                                </h1>
                            </div>
                            <div class="info_para">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                                    ea maiores corrupti perspiciatis sequi obcaecati consequatur
                                    soluta in aliquid facilis!
                                </p>
                            </div>
                            <div class="info_buttons">
                                <NavLink to="/agency">
                                    Agency
                                </NavLink>
                                <NavLink to={{
                                    pathname: '/client',
                                    state: {
                                        clientRole: "6038ecf6b796345b9c82bfbb"
                                    }
                                }} >
                                    Client
                                </NavLink>
                            </div>
                        </div>
                        <div class="scroll_div">
                            <div class="scroll_area">
                                <div class="scroll_icon">
                                    <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
                                </div>
                                <div class="scroll_text">
                                    <h3>Scroll Down</h3>
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Corporis, in.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="image_div">
                        <div class="bg_white_Circle"></div>
                        <img src={illustration} alt="" />
                    </div>
                </div>
            </section>

            <section class="process_main">
                <div class="bg_circle"></div>
                <div class="main_dots_second">
                    <img src={main_dots} alt="main_dots" />
                </div>
                <div class="inner_process">
                    <div class="process_heading">
                        <h1>Features to help you focus and work better</h1>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni
                            reprehenderit quo quaerat!
                        </p>
                    </div>
                    <div class="process_cards">
                        <div class="left_cards">
                            <div class="process_card">
                                <div class="card_number">
                                    <h2>02</h2>
                                </div>
                                <div class="process_image">
                                    <img src={work2} alt="work2" />
                                </div>
                                <div class="process_text">
                                    <h3>Manage Leads</h3>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div class="process_card">
                                <div class="card_number">
                                    <h2>04</h2>
                                </div>
                                <div class="process_image">
                                    <img src={work4} alt="work4" />
                                </div>
                                <div class="process_text">
                                    <h3>Manage Leads</h3>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                        <div class="right_cards">
                            <div class="process_card">
                                <div class="card_number">
                                    <h2>01</h2>
                                </div>
                                <div class="process_image">
                                    <img src={work} alt="work" />
                                </div>
                                <div class="process_text">
                                    <h3>Manage Leads</h3>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div class="process_card">
                                <div class="card_number">
                                    <h2>03</h2>
                                </div>
                                <div class="process_image">
                                    <img src={work3} alt="work3" />
                                </div>
                                <div class="process_text">
                                    <h3>Manage Leads</h3>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div class="process_card">
                                <div class="card_number">
                                    <h2>05</h2>
                                </div>
                                <div class="process_image">
                                    <img src={work5} alt="work5" />
                                </div>
                                <div class="process_text">
                                    <h3>Manage Leads</h3>
                                    <p>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="multiple_domain">
                <div class="inner_multipleDomain">
                    <div class="multipleDomain_heading">
                        <h2>Serving the clients across multiple domains</h2>
                        <p>
                            SheThink helps startups to craft ultimate products that are ready
                            to go directly for VC funding. Once the investment is done, we
                            assist startups to onboard a team and grow faster. BankOpen and
                            YourStory are some of the companies for whom we have built
                            products.
                        </p>
                    </div>
                    <div class="multipleDomains_items">
                        <div class="single_items">
                            <div class="domain_card">
                                <div class="domain_icon">
                                    <img src={e_commerce} alt="e_commerce" />
                                </div>
                                <div class="domain_text">
                                    <h3>E-Commerce</h3>
                                    <p>
                                        30+ e-commerce solutions, 12 fintech top-funded products
                                    </p>
                                </div>
                            </div>
                            <div class="domain_card">
                                <div class="domain_icon">
                                    <img src={e_learning} alt="" />
                                </div>
                                <div class="domain_text">
                                    <h3>E-learning and education</h3>
                                    <p>
                                        we provide e-learning solutions to boost growth and
                                        performance
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="single_items">
                            <div class="domain_card">
                                <div class="domain_icon">
                                    <img src={food} alt="food" />
                                </div>
                                <div class="domain_text">
                                    <h3>Food & Restaurant</h3>
                                    <p>
                                        we have a team of experts who understands order management,
                                        android and iOS app development, delivery and more
                                    </p>
                                </div>
                            </div>
                            <div class="domain_card">
                                <div class="domain_icon">
                                    <img src={travel} alt="travel" />
                                </div>
                                <div class="domain_text">
                                    <h3>Travel</h3>
                                    <p>
                                        we provide innovative ideas and technologies for travel
                                        application development, review management and other
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="single_items">
                            <div class="domain_card">
                                <div class="domain_icon">
                                    <img src={stethoscope} alt="stethoscope" />
                                </div>
                                <div class="domain_text">
                                    <h3>Healthcare</h3>
                                    <p>
                                        we provide uttermost healthcare IT consulting, technology
                                        solutions like building medical apps and more
                                    </p>
                                </div>
                            </div>
                            <div class="domain_card">
                                <div class="domain_icon">
                                    <img src={fintech} alt="fintech" />
                                </div>
                                <div class="domain_text">
                                    <h3>Fintech</h3>
                                    <p>
                                        We have around 12 well-funded fintech products as per your
                                        requirement
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="remote_main">
                <div class="ripple">
                    <img src={ripple} alt="fintech" />
                </div>
                <div class="inner_remote">
                    <div class="remote_heading">
                        <h5>Why remote</h5>
                        <h1>
                            Experience the Remote <br />
                            difference
                        </h1>
                    </div>

                    <div class="remote_cards_area">
                        <div class="remote_card">
                            <div class="remote_icon">
                                <img src={layer} alt="layer" />
                            </div>
                            <div class="remote_info">
                                <h2>Global Infrastructure</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                                    soluta quaerat nesciunt animi possimus temporibus doloribus
                                    modi nam repellendus consequuntur!
                                </p>
                            </div>
                        </div>
                        <div class="remote_card">
                            <div class="remote_icon">
                                <img src={dollar} alt="dollar" />
                            </div>
                            <div class="remote_info">
                                <h2>Global Infrastructure</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                                    soluta quaerat nesciunt animi possimus temporibus doloribus
                                    modi nam repellendus consequuntur!
                                </p>
                            </div>
                        </div>
                        <div class="remote_card">
                            <div class="remote_icon">
                                <img src={documents} alt="document" />
                            </div>
                            <div class="remote_info">
                                <h2>Global Infrastructure</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                                    soluta quaerat nesciunt animi possimus temporibus doloribus
                                    modi nam repellendus consequuntur!
                                </p>
                            </div>
                        </div>
                        <div class="remote_card">
                            <div class="remote_icon">
                                <img src={svg4} alt="svg4" />
                            </div>
                            <div class="remote_info">
                                <h2>Global Infrastructure</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                                    soluta quaerat nesciunt animi possimus temporibus doloribus
                                    modi nam repellendus consequuntur!
                                </p>
                            </div>
                        </div>
                        <div class="remote_card">
                            <div class="remote_icon">
                                <img src={svg5} alt="svg5" />
                            </div>
                            <div class="remote_info">
                                <h2>Global Infrastructure</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                                    soluta quaerat nesciunt animi possimus temporibus doloribus
                                    modi nam repellendus consequuntur!
                                </p>
                            </div>
                        </div>
                        <div class="remote_card">
                            <div class="remote_icon">
                                <img src={svg6} alt="svg6" />
                            </div>
                            <div class="remote_info">
                                <h2>Global Infrastructure</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                                    soluta quaerat nesciunt animi possimus temporibus doloribus
                                    modi nam repellendus consequuntur!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- testimonials section --> */}

            <section class="testimonials_main">
                <div class="inner_testimonials">
                    <div class="testimonial_heading">
                        <p>Lorem ipsum dolor sit.</p>
                        <div class="heading_testimonial">
                            <i class="fa fa-quote-left" aria-hidden="true"></i>
                            <h2>Testimonials</h2>
                            <i class="fa fa-quote-right" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="testimonial_cards">
                        <div class="testimonialCard firstCard">
                            <div class="testi_icon">
                                <img src={hangouts} alt="hangouts" />
                            </div>
                            <div class="testi_info">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Harum in nulla dolorum minima nesciunt modi dicta, facere iste
                                    aut a quibusdam unde eum voluptates architecto delectus libero
                                    voluptatem consectetur. Maiores?
                                </p>
                                <div class="testi_image">
                                    <div class="testi_profile">
                                        <img src={alex} alt="alex" />
                                    </div>
                                    <div class="testi_name">
                                        <h5>Sofia Nadel</h5>
                                        <h2>Corporate Office,CAN</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="testimonialCard middle_card">
                            <div class="testi_icon">
                                <img src={hangouts_middle} alt="hangouts_middle" />
                            </div>
                            <div class="testi_info">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Harum in nulla dolorum minima nesciunt modi dicta, facere iste
                                    aut a quibusdam unde eum voluptates architecto delectus libero
                                    voluptatem consectetur. Maiores?
                                </p>
                                <div class="testi_image">
                                    <div class="testi_profile">
                                        <img src={alex} alt="alex" />
                                    </div>
                                    <div class="testi_name" style={{ marginRight: 20 }}>
                                        <h5>Sofia Nadel</h5>
                                        <h2>Corporate Office,CAN</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="testimonialCard lastCard">
                            <div class="testi_icon">
                                <img src={hangouts} alt="hangouts" />
                            </div>
                            <div class="testi_info">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Harum in nulla dolorum minima nesciunt modi dicta, facere iste
                                    aut a quibusdam unde eum voluptates architecto delectus libero
                                    voluptatem consectetur. Maiores?
                                 </p>
                                <div class="testi_image">
                                    <div class="testi_profile">
                                        <img src={alex} alt="alex" />
                                    </div>
                                    <div class="testi_name">
                                        <h5>Sofia Nadel</h5>
                                        <h2>Corporate Office,CAN</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- testimonials section -->

            <!-- carousel section --> */}

            <section class="our_clients">
                <div class="big_circle"></div>
                <div class="inner_ourClients">
                    <div class="ourClients_heading">
                        <h2>
                            Companies who can rely <br />
                            on us.
                        </h2>
                        <p>We are growing day by day</p>
                    </div>
                    <div class="our_clients_inner">
                        <div class="ourClients_images">
                            <h4>Companies are</h4>
                            <div class="clients_images">
                                <img src={amazon} alt="" />
                                <img src={office} alt="" />
                                <img src={fedex} alt="" />
                                <img src={dhl} alt="" />
                                <img src={express} alt="" />
                                <img src={kodak} alt="" />
                            </div>
                        </div>
                        <div class="ourClients_gifs">
                            <img src={clients} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- carousel section end-->

            <!-- FAQ  --> */}
            <section class="faq">
                <div class="inner_faq">
                    <div class="faq_heading">
                        <div class="heading_faq">
                            <h2>FAQ</h2>
                            <img src={faq} alt="" />
                        </div>
                        <p>We have answers to all your question.</p>
                    </div>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button
                                    class="accordion-button"
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
                                class="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                            >
                                <div class="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button
                                    class="accordion-button collapsed"
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
                                class="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <div class="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button
                                    class="accordion-button collapsed"
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
                                class="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                            >
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
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

            <section class="contact_us">
                <div class="donut_shape"></div>
                <div class="inner_contactUs">
                    <div class="contactUs_heading">
                        <h1>Discover how Remote can help you grow your global team</h1>
                    </div>
                    <div class="contactUs_btn">
                        <a href="#"> Get Started Today<i class="fa fa-angle-right right-arr" aria-hidden="true"></i></a>
                    </div>
                </div>
            </section>

            {/* <!-- footer section --> */}

            <footer class="main_footer">
                <div class="inner_footer">
                    <div class="social_links">
                        {/* <div class="social_div">
                            <img src={twitter} alt="" />
                            <img src={facebook} alt="" />
                            <img src={linkedin} alt="" />
                        </div> */}
                    </div>
                    <div class="hire_developers">
                        <h2 onClick={() => setHireDeveloper(!hireDeveloper)} >
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i> Hire Developers</h2>
                        {
                            hireDeveloper === true ? (
                                <div class="hire_developers_points">
                                    <div class="main_points">
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
                                    <div class="main_points">
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
                    <div class="industry_exp">
                        <h2 onClick={() => setIndustryExperience(!industryExperience)}>
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}Industry Experience</h2>
                        {
                            industryExperience === true ? (
                                <div class="industry_exp_points">
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
                    <div class="contact_links">
                        <h2 onClick={() => setContactUs(!contactUs)}>
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "} Contact Us</h2>
                        {
                            contactUs === true ? (<div>
                                <div class="contact_links_heading">
                                    <h4>Sales:</h4>
                                    <h4>India: +91-7417537175</h4>
                                </div>
                                <div class="contact_links_heading">
                                    <h4>For Business:</h4>
                                    <h4>mzaid6961@gmail.com</h4>
                                </div>
                                <div class="contact_links_heading">
                                    <h4>For Job & Internships</h4>
                                    <h4>careers@gmail.com</h4>
                                </div>
                            </div>
                            ) : null
                        }
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Mainhomepage;
