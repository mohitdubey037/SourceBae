import instance from '../Constants/axiosConstants';

const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const lowerize = (word) => {
    return word.charAt(0).toLowerCase() + word.slice(1);
};
const cleanParam = (param) => {
    return param.slice(1);
};

const getNumberSpell = (number) => {
    if (number === 1) return 'one';
    else if (number === 2) return 'two';
    else if (number === 3) return 'three';
    else if (number === 4) return 'four';
    else if (number === 5) return 'five';
    else if (number === 6) return 'six';
    else if (number === 7) return 'seven';
    else if (number === 8) return 'eight';
    else if (number === 9) return 'nine';
    else if (number === 10) return 'ten';
};

const validateLink = (link) => {
    const containSpaces = /\s/g.test(link);
    let result = false;
    if (containSpaces === false) {
        let re =
            /(http(s)?:\/\/.)?()?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/;
        result = re.test(link);
        return result;
    }
    return result;
};

const noTextNumber = (link) => {
    let pattern = /^[0-9]*$/;
    return pattern.test(link);
};

const validateLinkedIn = (link) => {
    var linkedIn =
        /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^/]+\/(([\w|\d-&#?=])+\/?){1,}))$/;
    let result = false;
    result = linkedIn.test(link);
    return result;
};

const emailRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const camelcaseToWords = (word) => {
    return word.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
};

const multiwordCapitalize = (str) => {
    const newstr = str.split(' ');

    let finalStr = '';
    newstr.forEach((element) => {
        finalStr = finalStr + ' ' + capitalize(element);
    });
    return finalStr.slice(1);
};

const upload = (mediaDetail, Role) => {
    const fileForm = new FormData();
    mediaDetail &&
        fileForm.append('files', mediaDetail[0], mediaDetail[0].name);
    return new Promise((resolve, reject) => {
        instance
            .post(`api/${Role}/media/create`, fileForm)
            .then(function (response) {
                resolve(response[0]?.mediaURL);
            })
            .catch((err) => reject(err));
    });
};

const experienceRange = (exp) => {
    let experience = exp.toString()
    if (experience === '1') return '1 - 3 years'
    if (experience === '3') return '3 - 6 years'
    if (experience === '6') return '6 - 9 years'
    return `${experience} years`
}

export {
    capitalize,
    lowerize,
    cleanParam,
    getNumberSpell,
    validateLink,
    camelcaseToWords,
    validateLinkedIn,
    multiwordCapitalize,
    noTextNumber,
    upload,
    experienceRange,
    emailRegex
};
