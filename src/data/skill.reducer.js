export const initialState = {
    counter: 0,
    skillList: []
};

export const reducer = (state, action) => {
    console.log()
    switch (action.type) {
        case "add": {
            const newSkill = {
                id: state.counter,
                skill: action.skill,
                year: action.year,
            };
            return {
                counter: state.counter + 1,
                skillList: [...state.skillList, newSkill]
            };
        }
        case "remove": {

            // find matching index
            const idx = state.skillList.findIndex(element => parseInt(element.id) === parseInt(action.id));
            // console.log(idx)

            const skillLists = Object.assign([], state.skillList);
            skillLists.splice(idx, 1)

            return {
                counter: state.counter,
                skillList: skillLists
            };
        }
        case "clearall": {
            return initialState;
        }

        default:
            return state;
    }

};