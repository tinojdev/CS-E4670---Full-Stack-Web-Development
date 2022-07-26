const initialState = {
    good: 0,
    ok: 0,
    bad: 0
};

const counterReducer = (state = initialState, action) => {
    console.log(action);
    const copyOfState = {...state};

    switch (action.type) {
    case "GOOD": {
        copyOfState.good++;
        return copyOfState; 
    }
    case "OK": {
        copyOfState.ok++;
        return copyOfState; 
    }
    case "BAD": {
        copyOfState.bad++;
        return copyOfState; 
    }
    case "ZERO": {
        copyOfState.bad = 0;
        copyOfState.ok = 0;
        copyOfState.good = 0;
        return copyOfState; 
    }
    default: return copyOfState; 
    }
  
};

export default counterReducer;