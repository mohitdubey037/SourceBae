import React, { useEffect, useState } from 'react'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import SideDrawer from '../../Components/SideDrawer/SideDrawer'
import { useWindowDimensions } from '../../Utils/commonFunctions'
import { Link, useHistory } from 'react-router-dom'
import './filtration.css'
import colors from '../../Constants/colors'
import { Done , LocationOn , Work , WatchLater } from '@material-ui/icons'
import { Avatar, Slider, Tooltip, Typography , Button } from '@material-ui/core'

const techButtonStyle = {
    border : `1px solid ${colors.LIGHT_PRIMARY_COLOR}`,
    background : colors.LIGHT_PRIMARY_COLOR,
    marginRight : '2%',
    color : colors.PRIMARY_COLOR,
    padding : '0 20px',
    borderRadius : '5px',
    fontWeight : 'bold',
    fontFamily : 'Poppins , sans-serif'
}

const Filtration = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [filteredList, setFilteredList] = useState([1,2,3,4,5])

    const { width } = useWindowDimensions()

    const getChildProps = param => setIsDrawerOpen(param)

    const FilterButton = ({ title }) => {
        const [filterClicked, setFilterClicked] = useState(false)

        const handleFilterClick = filterId => {
            setFilterClicked(!filterClicked)
            document.getElementById(filterId).classList.toggle('filter__clicked')
        }

        return (
            <button 
                className = 'filter' 
                style = {{ width : width * 0.07 , border : filterClicked ? `1px solid ${colors.PRIMARY_COLOR}` : `1px solid ${colors.BORDER_COLOR}` }}
                id = {title}
                onClick = { () => handleFilterClick(title)}
            >
                <Done style = {{ marginRight : width * 0.005 }}/>
                {title}
            </button>
        )
    }

    const FilterSlider = ({ title }) => {
        const [value, setValue] = useState([0,100])

        const handleChange = (event , newValue) => {
            setValue(newValue)
        }

        const valuetext = value => `${value}degC`

        const ValueLabelComponent = props => {
            const { children, open, value } = props
            return (
                <Tooltip open = {open} placement = 'top' title = {value} style = {{ background : 'red' , color : 'red' }}>
                    {children}
                </Tooltip>
            )
        }
        
        return (
            <div style = {{ width : '10%' , marginTop : '4vh' }}>
                <Typography gutterBottom>{title}</Typography>
                <Slider
                    value = {value}
                    onChange = {handleChange}
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    // valueLabelDisplay = 'on'
                    ValueLabelComponent = {ValueLabelComponent}
                />
            </div>
        )
    }

    const HiringDetail = ({ title , icon }) => {
        return (
            <div className="hiring__detail" style = {{ color : colors.LIGHT_GRAY , fontFamily : 'Poppins , sanse-serif' }}>
                { icon == 'Remote' ? <LocationOn /> : icon == 'fullTime' ? <Work /> : <WatchLater /> }
                <p>{title}</p>
            </div>
        )
    }

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

                <div className="filter__container">
                    <div className="filters">
                        <h2>Filter by category</h2>
                        <div className="filters__row">
                            <FilterButton title = 'Budget' />
                            <FilterButton title = 'Popularity' />
                            <FilterButton title = 'Tech Stack' />
                            <FilterButton title = 'New' />
                            <FilterButton title = 'Services'/>
                        </div>
                        <div className="filter__row">
                            <FilterSlider title = 'Quotation' />
                        </div>

                        <div className="filtered__list">
                            <div className="numberOf__results"><p>Showing {filteredList.length} results</p></div>
                            {
                                filteredList.map( (item,index) =>
                                    <Link
                                        to = {{
                                            pathname : '/agency:bbb',
                                            state : { sth : 'asdf' , another : "fdsjfh" }
                                        }}
                                        key = {index}
                                        style = {{ textDecoration : 'none' }}
                                    >
                                        <div className = 'item'>
                                            <div className="item__details">
                                                <div className="profile__details">
                                                    <Avatar
                                                        src = {''}
                                                        style = {{ marginRight : '8%' }}
                                                    />
                                                    <div className="name__details">
                                                        <h2>UI/UX Designer</h2>
                                                        <h5>Spotify</h5>
                                                    </div>
                                                </div>
                                                <div className="billing__details">
                                                    <p>12000-15000</p>
                                                    <div className="askfor__quotation">
                                                        <Button 
                                                            style = {{ background : colors.LIGHT_PRIMARY_COLOR , marginTop : '3%' , color : colors.PRIMARY_COLOR , fontFamily : 'Poppins , sans-serif' , fontWeight : 700 , borderRadius : '7px' }}
                                                            onClick = { e => e.preventDefault() }
                                                        >
                                                            Ask for quotation
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="additional__details">
                                                <div className="tech__stackList">
                                                    <button style = {techButtonStyle}>MERN</button>
                                                    <button style = {techButtonStyle}>MEAN</button>
                                                </div>
                                                <div className="hiring__details">
                                                    <HiringDetail title = 'Remote' icon = 'Remote' />
                                                    <HiringDetail title = 'Full-Time' icon = 'fullTime' />
                                                    <HiringDetail title = 'Remote' icon = 'Watchlater' />
                                                </div>
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

export default Filtration