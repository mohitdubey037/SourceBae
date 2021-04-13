
    import { CLIENT, AGENCY } from './register.types';


    const INITIAL_STATE = {

        registrationForm: {        
                    firstName: "",
                    lastName: "",
                    userName: "",
                    userEmail: "",
                    userPhone: "",
                    countryCode: "+91",
                    password: ""
                },
        registrationFormErrors:{
                    firstNameError: false,
                    lastNameError: false,
                    emailError: false,
                    passwordError: false,
                    phoneError: false,
                    userNameError: false
                },
        extraDetailForm:{
                    userDesignation: "",
                    companyName: "",
                    socialPlatformDetails: []
                }
        
    };

    const registerReducer = (state = INITIAL_STATE, action) => {

        switch (action.type) {

            case CLIENT:

               return {
                 ...state
               };

            case AGENCY:

               return {
                  ...state
               };

             default: return state;

        }

    };

    export default registerReducer;