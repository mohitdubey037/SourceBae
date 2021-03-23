import React, { useState } from 'react'
import './dashboard.css'
import './dashboardMedia.css'
import { useWindowDimensions } from '../../Utils/commonFunctions'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import colors from '../../Constants/colors'
import { Link } from 'react-router-dom'
import SideDrawer from '../../Components/SideDrawer/SideDrawer'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'

const Dashboard = () => {

    const { width } = useWindowDimensions()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [projects, setProjects] = useState(['a','b','c','a','b','c'])

    const getChildProps = param => setIsDrawerOpen(param)

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

            <SideDrawer active = 'home' sendProps = {getChildProps} />
            
            <main
                className="dashboard"
                style = {{
                    position : (width < 500 && !isDrawerOpen) && 'absolute',
                    width : width > 500 ? '100%' : isDrawerOpen ? '80vw' : '100vw',
                    marginLeft : width > 500 ? '20vw' : isDrawerOpen ? '20vw' : 0,
                }}
            >
                <ProfileHeader />
                
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
                                projects.map( (project,index) => <Link to = '/filtration' key = {index}>
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