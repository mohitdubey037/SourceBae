import instance from '../../Constants/axiosConstants';
import { AGENCY } from '../../shared/constants';

const role = localStorage.getItem('role');
const agencyId = localStorage.getItem('userId');

let step = '';

const initialApi = () => {
    if (role === AGENCY && agencyId) {
        instance
            .get(`/api/${role}/agencies/get/${agencyId}`)
            .then(function (response) {
                step = response.stepsCompleted;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

const initialState = {
    step: step
};

const reducer = (state = initialState, action) => {
    if (role === AGENCY && step === '') {
        initialApi();
    }
    return state;
};

export default reducer;
