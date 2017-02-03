function getPrice(currLevel) {
    return (4 * Math.pow(1.3, currLevel));
}

//The price of the next level of a given meta upgrade

function onSubmit() {
    
    var denseBaseMult = document.getElementById("dMultiplier");
    var denseBaseLevel = Math.round(Math.log2(denseBaseMult.value));
    console.log(denseBaseLevel);
    var denseCurrLevel = denseBaseLevel;

    var gravBaseMult = document.getElementById("gMultiplier");
    var gravBaseLevel = Math.log(gravBaseMult.value) / Math.log(1.1);
    var gravCurrLevel = gravBaseLevel;

    var currMeta = document.getElementById("currMeta").value;

    var updated = false;

    var output = document.getElementById("result");
    
    if ((currMeta < getPrice(denseBaseLevel)) && (currMeta < getPrice(gravBaseLevel))) {
        output.value = "You cannot afford any upgrades!";
    } else {
        while ((currMeta > getPrice(denseCurrLevel)) || (currMeta > getPrice(gravCurrLevel))) {
            updated = false;

            if ((((currMeta - getPrice(denseCurrLevel)) * 5) * Math.pow(2, denseCurrLevel + 1) * (Math.pow(1.1, gravCurrLevel)) * 1.4) 
            > 
            ((currMeta * 5) * Math.pow(2, denseCurrLevel) * (Math.pow(1.1, gravCurrLevel)) * 1.4)) {
                currMeta -= getPrice(denseCurrLevel);
                denseCurrLevel += 1;
                updated = true;
            }
            if ((((currMeta - getPrice(gravCurrLevel)) * 5) * Math.pow(2, denseCurrLevel) * (Math.pow(1.1, gravCurrLevel + 1)) * 1.4) 
            > 
            ((currMeta * 5) * Math.pow(2, denseCurrLevel) * (Math.pow(1.1, gravCurrLevel)) * 1.4)) {
                currMeta -= getPrice(gravCurrLevel);
                gravCurrLevel += 1;
                updated = true;
            }
            if (updated === false) {
                break;
            }
        }

        output.value = "You need to upgrade density " + (denseCurrLevel - denseBaseLevel) + " Times. \n"
        + "You need to upgrade gravity " + (gravCurrLevel - gravBaseLevel) + " Times. \n"
        + "And you will have " + currMeta + " Meta left over.";
    }
}

//iblob the equation for density price scaling is 4*1.3**nextlevel-1