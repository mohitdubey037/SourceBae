const capitalize = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const lowerize = (word)=>{
    return word.charAt(0).toLowerCase() + word.slice(1)
}
const cleanParam = (param)=>{
    return param.slice(1)
}

const getNumberSpell = (number)=>{
    if(number===1)
        return "one"
    else if(number===2)
        return "two"
    else if(number===3)
        return "three"
    else if(number===4)
        return "four"
    else if(number===5)
        return "five"
    else if(number===6)
        return "six"
    else if(number===7)
        return "seven"
    else if(number===8)
        return "eight"
    else if(number===9)
        return "nine"
    else if(number===10)
        return "ten"
}

const validateLink = (link)=>{
    let result = (/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g.test(link))
    return result
}
export {capitalize, lowerize, cleanParam, getNumberSpell, validateLink}