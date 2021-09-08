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
  if (number === 1) return "one";
  else if (number === 2) return "two";
  else if (number === 3) return "three";
  else if (number === 4) return "four";
  else if (number === 5) return "five";
  else if (number === 6) return "six";
  else if (number === 7) return "seven";
  else if (number === 8) return "eight";
  else if (number === 9) return "nine";
  else if (number === 10) return "ten";
};

const validateLink = (link) => {
  const containSpaces = /\s/g.test(link);
  let result = false;
  if (containSpaces === false) {
    let re =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*)/;
    result =  re.test(link);
  // console.log(result)
    return result
  }
  console.log(result)
  return result;
};

const validateLinkedIn = (link) => {
  // var linkedIn=/(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  var linkedIn = /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/
  let result = false;
  result =  linkedIn.test(link);
  return result;
}

const camelcaseToWords = (word) => {
  return word.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`);
};

const multiwordCapitalize = (str) => {
  const newstr = str.split(" ");

  let finalStr = "";
  newstr.forEach((element) => {
    finalStr = finalStr + " " + capitalize(element);
  });
  return finalStr.slice(1);
};
export {
  capitalize,
  lowerize,
  cleanParam,
  getNumberSpell,
  validateLink,
  camelcaseToWords,
  validateLinkedIn,
  multiwordCapitalize,
};