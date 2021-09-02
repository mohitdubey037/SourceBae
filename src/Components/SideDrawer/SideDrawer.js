import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, { useState } from 'react'
import colors from '../../Constants/colors'
import { useWindowDimensions } from '../../Utils/commonFunctions'
// import logo from '../../assests/images/Logo/logo.png'
import './sideDrawer.css'

const SideDrawer = ({ active , sendProps }) => {

    const { height , width } = useWindowDimensions()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const handleChange = panel => (event , isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const toggleSideBar = () => {
        let sidebar = document.querySelector('.sidebar')
        sidebar.classList.toggle('open')
        if(width <= 500) {
            sendProps(!isDrawerOpen)
            setIsDrawerOpen(!isDrawerOpen)
            // console.log('dfhjkdf',sendProps.getChildProps(true))
        }
    }

    // console.log('efhvjfkerbh',sendProps)

    return (
        <div>
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
            {/* <div><Link to = '/'><img src={logo} alt="" className = 'logo'/></Link></div> */}
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
                <i className='bx bx-home-smile'></i>
                <span>Home</span>
            </div>
            <div className="sidebar__item">
                <i className='bx bxs-message-square-dots'></i>
                <span>Pings</span>
            </div>
            <div className="sidebar__item">
                <i className='bx bx-check-square'></i>
                <span>Project</span>
            </div>
            <div className="sidebar__item">
                <i className='bx bxs-time-five'></i>
                <span>Activity</span>
            </div>
            <div className="sidebar__item">
                <i className='bx bxs-laugh'></i>
                <span>Me</span>
            </div>
            
        </nav>
        </div>
    )
}

export default SideDrawer