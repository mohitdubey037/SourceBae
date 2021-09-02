const data = [{
    name: "Hatha Yoga",
    description: "<p><br></p>",
    id: "4538",
    price: "30.00",
    duration_hours: "1",
    duration_minutes: "0",
    start_time: "14:00:00",
    staff: [
       "1470"
    ]
},
{
    id: "202",
    name: "Zen Yoga Therapy",
    description: "",
    price: "0.50",
    duration_hours: "1",
    duration_minutes: "0",
    start_time: "02:00:00",
    staff: [
        "27584",
        "27764"
    ]
},

{
    id: "203",
    name: "Zen Yoga Therapy0",
    description: "",
    price: "0.50",
    duration_hours: "1",
    duration_minutes: "0",
    start_time: "03:00:00",
    staff: [
        "27584",
        "27764"
    ]
},

{
    id: "204",
    name: "Zen Yoga Therapy1",
    description: "",
    price: "0.50",
    duration_hours: "1",
    duration_minutes: "0",
    start_time: "02:00:00",
    staff: [
        "27584",
        "27764"
    ]
},

{
    id: "205",
    name: "Zen Yoga Therapy4",
    description: "",
    price: "0.50",
    duration_hours: "1",
    duration_minutes: "0",
    start_time: "05:00:00",
    staff: [
        "27584",
        "27764"
    ]
},

{
    id: "207",
    name: "Zen new Therapy",
    description: "",
    price: "0.50",
    duration_hours: "1",
    duration_minutes: "0",
    start_time: "02:00:00",
    staff: [
        "27584",
        "27764"
    ]
}

]

const myObj= {}


data.forEach((obj)=>{
    
    if(obj.start_time in myObj){
        myObj[obj.start_time].push(obj)
    }
    else{
        myObj[obj.start_time] = [obj]
    }
})

Object.keys(myObj).forEach((ob)=>{
console.log(myObj[ob])
})

