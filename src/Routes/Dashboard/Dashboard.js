import React, { useEffect, useState } from 'react'
import './dashboard.css'
import './dashboardMedia.css'
import logo from '../../assests/images/Logo/logo.png'
import { useWindowDimensions } from '../../Utils/commonFunctions'
import { Search , ExpandMore } from '@material-ui/icons'
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import colors from '../../Constants/colors'
import { Avatar, Accordion , AccordionDetails , AccordionSummary , Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const i1 = require('../../assests/images/Dashboard/explorer.jpg')

const Dashboard = () => {

    const { height , width } = useWindowDimensions()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    const [avatar, setAvatar] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [projects, setProjects] = useState(['a','b','c','a','b','c'])

    const toggleSideBar = () => {
        let sidebar = document.querySelector('.sidebar')
        sidebar.classList.toggle('open')
        if(width <= 500)
            setIsDrawerOpen(!isDrawerOpen)
    }

    const handleChange = panel => (event , isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }



    class ChangingProgressProvider extends React.Component {
        static defaultProps = {
          interval: 1000
        };
      
        state = {
          valuesIndex: 0
        };
      
        componentDidMount() {
          setTimeout(() => {
            this.setState({
              valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
            });
          }, this.props.interval);
        }
      
        render() {
          return this.props.children(this.props.values[this.state.valuesIndex]);
        }
      }

    return (
        <div className="page__container">
            <div 
                className="line__container" 
                onClick = {toggleSideBar}
                style = {{
                    display : width > 500 ? 'none' : 'block'
                }}
            >
                <div className="line"></div>
            </div>
            <nav 
                className="sidebar"
                style = {{
                    position : (width > 500 || isDrawerOpen) && 'fixed'
                }}
            >
                <div><img src={logo} alt="" className = 'logo'/></div>
                <Accordion
                    expanded = {expanded === 'panel1'}
                    onChange = {handleChange('panel1')}
                    style = {{
                        background : 'transparent',
                    }}
                    elevation = {0}
                    TransitionProps = {{ unmountOnExit : true }}
                >
                    <AccordionSummary
                        expandIcon = {<ExpandMore style = {{ color : colors.WHITE }}/>}
                    >
                        <Typography
                            style = {{
                                color : colors.WHITE
                            }}
                        >General Settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography style = {{ color : colors.WHITE }}>dfjkslcsdbk</Typography>
                    </AccordionDetails>
                </Accordion>

                <div className="sidebar__item" style = {{ marginTop : '2vh' , background : colors.ACTIVE_ROUTE_BGCOLOR , color : colors.ACTIVE_ROUTE_COLOR }}>
                    <i class='bx bx-home-smile'></i>
                    <span>Home</span>
                </div>
                <div className="sidebar__item">
                    <i class='bx bxs-message-square-dots'></i>
                    <span>Pings</span>
                </div>
                <div className="sidebar__item">
                    <i class='bx bx-check-square'></i>
                    <span>Project</span>
                </div>
                <div className="sidebar__item">
                    <i class='bx bxs-time-five'></i>
                    <span>Activity</span>
                </div>
                <div className="sidebar__item">
                    <i class='bx bxs-laugh'></i>
                    <span>Me</span>
                </div>
                
            </nav>
            
            <main
                className="dashboard"
                style = {{
                    position : (width < 500 && !isDrawerOpen) && 'absolute',
                    width : width > 500 ? '100%' : isDrawerOpen ? '80vw' : '100vw',
                    marginLeft : width > 500 ? '20vw' : isDrawerOpen ? '20vw' : 0,
                }}
            >
                <div className="header__main">
                    <div className="search__area">
                        <Search style = {{ color : colors.LIGHT_GRAY }}/>
                        <input
                            type="text"
                            name=""
                            placeholder = 'Search existing teams'
                            onChange = { e => setSearchParam(e.target.value) }
                            style = {{
                                color : colors.LIGHT_GRAY
                            }}
                        />
                    </div>
                    <div className="addnewteam__buttonContainer">
                        <button
                            className = 'new__teamButton'
                            style = {{
                                background : colors.PRIMARY_COLOR
                            }}
                        ><span className="plus__icon"><i className = 'fa fa-plus'></i></span><span>NEW</span></button>
                    </div>
                    <div className="header__avatar">
                        <Avatar
                            src = {avatar}
                        />
                    </div>
                </div>
                
                <div className="details__wrapper">
                    <div className="team__title" style = {{ color : colors.GRAY_TEXT }}><p>xyz Team</p></div>

                    <div className="history">
                        <div className="completed__projects">
                            <div className="progress__circleBox">
                                <ChangingProgressProvider values = {[0,60]}>
                                    {
                                        percentage => <CircularProgressbar 
                                                        value = {percentage}
                                                        // background
                                                        className = 'progress__bar'
                                                        text = '60%'
                                                        // styles = {buildStyles({
                                                            // backgroundColor : '#5995fda0',
                                                            // textColor : colors.WHITE,
                                                            // trailColor : colors.LIGHT_GRAY
                                                        // })}
                                                    />
                                    }
                                </ChangingProgressProvider>
                            </div>
                            <div className="completed__projectDetails">
                                <span>Projects Completed</span>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, quaerat?</p>
                            </div>
                        </div>
                        <div className="increase">
                            <div className="empty__container" style = {{ position : 'absolute' , left : 10 }}></div>
                            <div><p className = 'increase__title' style = {{ color : colors.BLACK }}>Increase +2%</p>
                            <p>Compared to previous work</p></div>
                            <div style = {{ position : 'absolute' , right : 10 }} className = 'empty__container'></div>
                        </div>
                        <div className="done__projects"></div>
                    </div>

                    <div className="projects">
                        <div className="projects__cardContainer">
                            {/* {
                                projects.map(project => {
                                    return (
                                        <div className="project__card">
                                            <div className="face face1">
                                                <div className="project__content">
                                                    <h2>Project name :</h2>
                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, doloribus.</p>
                                                    <a href="#">Know more</a>
                                                </div>
                                            </div>
                                            <div className="face face2">
                                                <h2>01</h2>
                                            </div>
                                        </div>
                                    )
                                })
                            } */}
                            {
                                projects.map( (project,index) => <Link to = '/filtration'>
                                    <div className = 'project__card'>
                                        <div className="card__modalView">
                                            <p className = 'project__title'>Project Title</p>
                                            <p><i>By&nbsp;</i><span>John Doe</span></p>

                                            <div className="start__date"><p>19 March, 2021</p></div>

                                            <div style = {{ marginTop : '8%' , color : colors.GRAY_TEXT }}>20 people are going</div>
                                        </div>
                                    </div>
                                </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard