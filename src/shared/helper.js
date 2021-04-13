const capitalize = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const lowerize = (word)=>{
    return word.charAt(0).toLowerCase() + word.slice(1)
}
const cleanParam = (param)=>{
    return param.slice(1)
}
export {capitalize, lowerize, cleanParam}