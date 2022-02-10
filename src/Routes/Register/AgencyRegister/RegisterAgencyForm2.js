/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './../register.css';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';
import { AGENCY } from '../../../shared/constants';

const dateStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        border: `1px solid lightgrey`,
        color: `gray`,
        borderRadius: `10px`,
        outline: 'none',
        textColor: `gray`,
        marginTop: `1%`,
        paddingLeft: `4%`,
        paddingTop: `1%`,
        width: `60%`,
        height: `60px`
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: `100%`,
        color: `gray`,
        border: 'none',
        background: 'none'
    },
    label: {
        color: `gray`
    }
}));

const RegisterAgencyForm2 = (props) => {
    let { role } = useParams();

    const dateClasses = dateStyles();

    const handleCreateProfile = (event, role) => {
        let { name, value } = event.target;
        if (role === AGENCY) {
            props.setAgencyProfileDetails({
                ...props.agencyProfileDetails,
                [name]: value
            });
        }
    };
    const handleSocialPlatform = (event) => {
        const { name, value } = event.target;
        if (name === 'linkedIn') {
            props.setLinkedIn({
                platformName: name,
                platformLink: value
            });
        } else if (name === 'website') {
            props.setSite({
                platformName: name,
                platformLink: value
            });
        }
    };

    return (
        <>
            <div>
                <div className="input_with_error">
                    <label>
                        Agency Name
                        <span className="requiredStar">*</span>
                    </label>
                    <input
                        type="text"
                        name="agencyName"
                        placeholder="Agency Name"
                        value={props.agencyProfileDetails.agencyName}
                        onChange={(event) => handleCreateProfile(event, role)}
                    />
                    {props.errors.agencyNameError && (
                        <p className="error_productForm">
                            {props.errors.agencyNameError}
                        </p>
                    )}
                </div>

                <div className="input_with_error">
                    <label>
                        Team Strength
                        <span className="requiredStar">*</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        name="agencyTeamSize"
                        placeholder="Team Strength"
                        value={props.agencyProfileDetails.agencyTeamSize}
                        onChange={(event) => handleCreateProfile(event, role)}
                    />
                    {props.errors.agencyTeamSizeError && (
                        <p className="error_productForm">
                            {props.errors.agencyTeamSizeError}
                        </p>
                    )}
                </div>
            </div>

            <div className="input_with_error">
                <label
                    className={dateClasses.label}
                    id="incorporationLabel"
                    htmlFor="social"
                >
                    Incorporation Date
                    <span className="requiredStar">*</span>
                </label>
                <input
                    style={{
                        paddingLeft: '2.5%',
                        paddingRight: '2%',
                        width: '39%'
                    }}
                    id="incorporation_date"
                    onKeyDown={(e) => e.preventDefault()}
                    type="date"
                    name="incorporationDate"
                    max={new Date().toJSON().slice(0, 10)}
                    className={dateClasses.textField}
                    onChange={(event) => handleCreateProfile(event, role)}
                />
                {props.errors.incorporationDateError && (
                    <p className="error_productForm">
                        {props.errors.incorporationDateError}
                    </p>
                )}
            </div>

            <div className="input_with_error">
                <label>
                    Website Url
                    <span className="requiredStar">*</span>
                </label>
                <input
                    style={{ paddingLeft: '2.5%', width: '39%' }}
                    type="text"
                    name="website"
                    placeholder="Website URL"
                    value={props.site.platformLink}
                    onChange={(event) => handleSocialPlatform(event)}
                />
                {props.errors.socialPlatformDetailsError && (
                    <p className="error_productForm">
                        {props.errors.socialPlatformDetailsError}
                    </p>
                )}
            </div>
        </>
    );
};
export default RegisterAgencyForm2;
