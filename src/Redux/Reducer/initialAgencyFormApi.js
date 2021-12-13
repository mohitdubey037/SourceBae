import instance from "../../Constants/axiosConstants";

const Role = localStorage.getItem('role');
const agencyId = localStorage.getItem('userId');

let step = '';

const initialApi = () => {
    // instance.get(`api/${Role}/agencies/steps-completed`)
    if (Role === "Agency") {
        instance.get(`/api/${Role}/agencies/get/${agencyId}`)
            .then(function (response) {
                step = response.stepsCompleted
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const initialState = {
    step: step
}

const reducer = (state = initialState, action) => {
    if (Role === "Agency" && step === '') {
        initialApi();
    }
    return state;
};

export default reducer;