const createRef = (events) => { 
    const refObj = {}
    events.forEach((event) => { 
        refObj[event.event_name] = event.event_id
    })
    return refObj   
};

const formatAthletesData = (athletesData, ref) => {
    return athletesData.map((athlete) => { 
        return [
            athlete.athlete_name,
            athlete.athlete_bio,
            athlete.years_competing,
            ref[athlete.event]
        ]
    })
}


module.exports = {createRef, formatAthletesData}