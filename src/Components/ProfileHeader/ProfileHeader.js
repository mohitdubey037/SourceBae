import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { useState } from 'react'
import colors from '../../Constants/colors'
import './profileHeader.css'

const ProfileHeader = () => {

    const [avatar, setAvatar] = useState('')
    const [searchParam, setSearchParam] = useState('')

    return (
        // <div>
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
        // </div>
    )
}

export default ProfileHeader
