import './Filter.css';

function Filter() {
    return (
        <div className="filter">
            <div className="filter-button">
                <div className="reset-filter">
                    <h6>Reset Filter</h6>
                </div>
                <div className="apply-filter">
                    <h6>Apply Filter</h6>
                </div>
            </div>
            <h5>Stages</h5>

            <div className="status-checkbox">
                <div>
                    <input className="larger-checkbox" type="checkbox" name="Completed" id="project-status" />
                    <p>Completed</p>
                </div>
                <div>
                    <input className="larger-checkbox" type="checkbox" name="Running" id="project-status" />
                    <p>Running</p>
                </div>
                <div>
                    <input className="larger-checkbox" type="checkbox" name="Rejected" id="project-status" />
                    <p>Rejected</p>
                </div>
            </div>

            <div className="search-content">
                <h6 className="search-name-heading">Search By Name</h6>
                <input type="text" placeholder="Type Here" />
            </div>

            <div className="search-button">
                <div>
                    Search
                </div>
            </div>
        </div>
    )
}
export default Filter
