const AGENCYROUTES = {
    LOGIN: '/agency/login',
    REGISTER: '/agency/register',
    DASHBOARD: '/agency/dashboard',
    ADD_DEVELOPER: '/agency/add-developer',
    HIRE1: '/agency/hire/step-1',
    HIRE2: '/agency/hire/step-2',
    HIRE3: '/agency/hire/step-3',
    HIRE4: '/agency/hire/step-4',
    FORGOT_PASSWORD: '/agency/forgot-password',
    RESET_PASSWORD: '/agency/reset-password',
    PROFILE: '/agency/profile'
};

const CLIENTROUTES = {
    LOGIN: '/client/login',
    REGISTER: '/client/register',
    DASHBOARD: '/client/dashboard',
    FORGOT_PASSWORD: '/client/forgot-password',
    RESET_PASSWORD: '/client/reset-password',
    PROFILE: '/client/profile',
    HIRE_DEVELOPER: '/client/create/hire-developer-request',
    AGENCIES_LIST: '/client/agencies-list',
    CREATE_SHORT_TERM_PROJECT: '/client/create/short-term-project'
};

const ADMINROUTES = {
    DASHBOARD: '/admin/dashboard'
};

const USERROUTES = {
    HOME: '/',
    ABOUT_US: '/about-us',
    VERIFY_PAGE: '/Verify_Page',
    NOT_FOUND: '404',
    ACTIVE_REQUIREMENTS: '/active-requirements',
    RESET_PASSWORD: '/password-reset'
};

export { AGENCYROUTES, CLIENTROUTES, ADMINROUTES, USERROUTES };
