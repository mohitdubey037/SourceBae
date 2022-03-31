const AGENCYROUTES = {
    LOGIN: '/agency/login',
    REGISTER: '/agency/register',
    DASHBOARD: '/agency/dashboard',
    ADD_DEVELOPER: '/agency/add-developer',
    AGENCY_UPDATE: '/agency/update/step',
    AGENCY_UPDATE_1: '/agency/update/step/1',
    AGENCY_UPDATE_2: '/agency/update/step/2',
    AGENCY_UPDATE_3: '/agency/update/step/3',
    AGENCY_UPDATE_4: '/agency/update/step/4',
    FORGOT_PASSWORD: '/agency/forgot-password',
    RESET_PASSWORD: '/agency/reset-password',
    PROFILE: '/agency/profile',
    QUOTATIONS: '/agency/quotations',
    PRODUCT_FORM: '/agency/product-form',
    SHARED_DEVELOPERS: '/agency/shared-developers',
    PORTFOLIO: '/agency/portfolio',
    PRODUCT_DETAILS: '/agency/product-details',
    PROJECT_DETAILS: '/agency/project-details',
    DEVELOPER_REQUIREMENT_LIST: '/agency/requirements/client/developer'
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
    CREATE_SHORT_TERM_PROJECT: '/client/create/short-term-project',
    DEVELOPER_REQUESTS: '/client/developer-requests',
    PROJECT_DETAILS: '/client/project-details',
    PROJECT_LIST: '/client/project-list',
    PRODUCT_DETAILS: '/client/agency/product-details',
    DEVELOPER_HIRE_REQUIREMENTS: '/client/requirements/developer-hire',
    INVESTMENT_OPPORTUNITIES: '/client/invest/agency-products',
    HIRE_AGENCY_FOR_PROJECT_1: '/client/project/hire-agency/step/1',
    HIRE_AGENCY_FOR_PROJECT_2: '/client/project/hire-agency/step/2',
    HIRE_AGENCY_FOR_PROJECT_3: '/client/project/hire-agency/step/3',
    SHORTLIST_DEVELOPER: '/client/shortlist-developer/requirement'
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
