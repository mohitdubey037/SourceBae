import React from 'react'
import './DeveloperList.css'
import document from '../../../assets/images/Logo/document.png'

function DeveloperList() {

    const arr = [1, 2, 3, 4, 5]

    return (
        <>
            <div className="mainDeveloperList">
                <div className="innerDeveloperList">
                    {
                        arr.map(() => {
                            return (
                                <div className="developerCard">
                                    <div className="developerCardBorder"></div>
                                    <div className="developerNameExp">
                                        <div className="developerName">
                                            <h2>Mohd Zaid</h2>
                                            <p>1year 2months</p>
                                        </div>
                                        <div className="developerExp">
                                            <p>Available</p>
                                        </div>
                                    </div>

                                    <div className="developerTech">
                                        <h6>Techstack</h6>
                                        <div className="developerTechNames">
                                            <p>JavaScript</p>
                                            <p>NodeJs</p>
                                            <p>ReactJs</p>
                                        </div>
                                    </div>

                                    <div className="developerBudgetResume">
                                        <div className="developerBudget">
                                            <div>
                                                <p>Budget</p>
                                                <h6>$5000-$10000</h6>
                                            </div>
                                            <div>
                                                <p>Timeline</p>
                                                <h6>90 days</h6>
                                            </div>
                                        </div>
                                        <div className="developerResume">
                                            <div>
                                                <img src={document} alt="" />
                                                <button><i class="fa fa-upload" aria-hidden="true"></i>Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DeveloperList
