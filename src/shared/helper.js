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
export {capitalize, lowerize, cleanParam, getNumberSpell}