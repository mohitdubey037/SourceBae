import { Avatar } from '@material-ui/core'
import { AccountCircle, Email, Work } from '@material-ui/icons'
import React, { useState } from 'react'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import SideDrawer from '../../Components/SideDrawer/SideDrawer'
import { useWindowDimensions } from '../../Utils/commonFunctions'
import colors from '../../Constants/colors'
import './agency.css'

const techButtonStyle = {
    border : `1px solid ${colors.LIGHT_PRIMARY_COLOR}`,
    background : colors.LIGHT_PRIMARY_COLOR,
    marginRight : '2%',
    color : colors.PRIMARY_COLOR,
    padding : '0 20px',
    borderRadius : '5px',
    fontWeight : 'bold',
    fontFamily: 'Open Sans, sans-serif'
}

const Agency = ({ location }) => {

    const { state } = location
    const { width } = useWindowDimensions()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const getChildProps = param => setIsDrawerOpen(param)

    return (
        <div style = {{ display : 'flex' , justifyContent : 'flex-start' }}>
            <SideDrawer active = 'home' sendProps = {getChildProps} />
            
            <main
                style = {{
                    position : (width < 500 && !isDrawerOpen) && 'absolute',
                    width : width > 500 ? '100%' : isDrawerOpen ? '80vw' : '100vw',
                    marginLeft : width > 500 ? '20vw' : isDrawerOpen ? '20vw' : 0,
                    transition : '.5s ease-in-out'
                }}
            >
                <ProfileHeader />

                <div className="agency__details">
                    <div className="agency__description">
                        <Avatar
                            src = {''}
                        />
                        <h5>Spotify</h5>
                        <h6 style = {{ color : colors.GRAY_TEXT , fontSize : '1.1rem' }}>Product Designer</h6>
                        <p style = {{ margin : 0 , padding : 0 , color : colors.GRAY_TEXT }}>KA, IN</p>

                        <div className="agency__expertise">
                            <button style = {techButtonStyle}>MEAN</button>
                            <button style = {techButtonStyle}>MERN</button>
                        </div>
                        <div className="email">
                            <Email style = {{ marginRight : '3%' }}/>
                            <p>connect@shethink.in</p>
                        </div>
                        <div className="availability">
                            <Work style = {{ marginRight : '3%' }}/>
                            <p>Full-Time</p>
                        </div>
                        <div className="domain">
                            <AccountCircle style = {{ marginRight : '3%' }}/>
                            <p>UI/UX Design</p>
                        </div>
                    </div>
                </div>

                <div className="summary additional__detail">
                    <h2>Professional Summary</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempore repudiandae repellendus natus molestias maiores nobis iste vitae accusamus consequatur, alias quis dolor consectetur inventore maxime quas optio ducimus quam id magnam eligendi tenetur eius nam hic? Excepturi laborum eum quam maxime minima facere, ipsa vitae corporis omnis architecto perspiciatis?</p>
                </div>

                <div className="work__experience additional__detail">
                    <h2>Work Experience</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quia ipsum eligendi itaque repudiandae quam fugiat expedita a, natus recusandae harum quod sed. Ipsum a assumenda quidem sapiente, ducimus placeat, earum maxime commodi, laborum asperiores cupiditate sit sunt porro. Eius rerum quod maxime fuga voluptatum dolore odit repellat quas accusantium.</p>
                </div>
            </main>
        </div>
    )
}

export default Agency
