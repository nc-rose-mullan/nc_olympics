const {createRef, formatAthletesData}  = require('../db/utils/seed-utils');

describe("createRef", () => { 
    it("returns an empty object when passed and empty array", () => {
        const eventRows = [];
        const expectedRef = {};
        expect(createRef(eventRows)).toEqual(expectedRef);
    })
    it("a singular event array has it's id added on a key of it's name", () => { 
        const eventRows = [{ event_id: 1, event_name: "Event A" }]
        const expectedRef = {"Event A": 1}
        expect(createRef(eventRows)).toEqual(expectedRef)
    })
    it("a multi event array has each id added as a key of each name", () => { 
        const eventRows = [{ event_id: 1, event_name: "Event A" }, { event_id: 2, event_name: "Event B" }, { event_id: 9, event_name: "Event Rose" }]
        const expectedRef = { "Event A": 1, "Event B": 2, "Event Rose": 9 }
        expect(createRef(eventRows)).toEqual(expectedRef)
    })
});

describe('formatAthletesData', () => { 
    it('returns an empty array when passed an empty array', () => { 
        const athletesData = []
        const expected = []
        expect(formatAthletesData(athletesData)).toEqual(expected)
    })
    it('returns a singular nested array with the correct event_id when passed a single set of athlete data', () => { 
        const athletesData = [{
            "athlete_name": "Tufty",
            "athlete_bio": "She looks like a dog, but she's actually the GOAT",
            "years_competing": 1,
            "event": "football"
        }]
        const ref = {
            darts: 1,
            football: 2
        }
        const expected = [["Tufty", "She looks like a dog, but she's actually the GOAT", 1, 2]]

        expect(formatAthletesData(athletesData, ref)).toEqual(expected)
    })
    it('returns multiple nested arrays with correct event_id when passed an array containing multiple athlete objects', () => { 
        const athletesData = [
            {
                "athlete_name": "Jobble",
                "athlete_bio": "Destroys all of her competitors without a second thought",
                "years_competing": 2,
                "event": "dribbling"
            },
            {
                "athlete_name": "Tufty",
                "athlete_bio": "She looks like a dog, but she's actually the GOAT",
                "years_competing": 1,
                "event": "football"
            }
        ]
        const ref = {
            darts: 1,
            football: 2,
            dribbling: 3
        }
        const expected = [["Jobble", "Destroys all of her competitors without a second thought", 2, 3], ["Tufty", "She looks like a dog, but she's actually the GOAT", 1, 2]]

        expect(formatAthletesData(athletesData, ref)).toEqual(expected)
    })
})