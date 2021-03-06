function getDensePrice(currLevel) {
    return (4 * Math.pow(1.3, currLevel));
}

function getGravPrice(currLevel) {
    return (5 * Math.pow(1.3, currLevel));
}

//The price of the next level of a given meta upgrade

function onSubmit() {
    
    var denseBaseMult = document.getElementById("dMultiplier");
    //Input holding the base multiplier given.
    var denseBaseLevel = Math.log2(denseBaseMult.value);
    console.log(denseBaseLevel);
    var denseCurrLevel = denseBaseLevel;
    //Level at the start and level after optimizations.

    var gravBaseMult = document.getElementById("gMultiplier");
    //Input holding the base multiplier given.
    var gravBaseLevel = Math.log(gravBaseMult.value) / Math.log(1.1);
    var gravCurrLevel = gravBaseLevel;
    //Level at the start and level after optimizations.

    var currMeta = document.getElementById("currMeta").value;

    var updated = false;
    //Was meta used this cycle?

    var output = document.getElementById("result");
    //Text box to put the results in.
    
    if ((currMeta < getDensePrice(denseBaseLevel)) && (currMeta < getGravPrice(gravBaseLevel))) {
        output.value = "You cannot afford any upgrades!";
        //If the user cannot afford either upgrade, exit.
    } else {
        while ((currMeta >= getDensePrice(denseCurrLevel)) || (currMeta >= getGravPrice(gravCurrLevel))) {
            //While any upgrade is purchasable.
            updated = false;

            if (((Math.pow(2, denseCurrLevel + 1)) * (Math.pow(1.1, gravCurrLevel)) * (1 + (((currMeta - getDensePrice(denseCurrLevel)) * 2) / 10)))
            //All multiplier calculations are done in the form (Density value) * (Gravity value) * (1 + Meta bonus).
            >= 
            ((Math.pow(2, denseCurrLevel)) * (Math.pow(1.1, gravCurrLevel)) * (1 + ((currMeta * 2) / 10)))
            &&
            ((Math.pow(2, denseCurrLevel + 1)) * (Math.pow(1.1, gravCurrLevel)) * (1 + (((currMeta - getDensePrice(denseCurrLevel)) * 2) / 10)))
            //All multiplier calculations are done in the form (Density value) * (Gravity value) * (1 + Meta bonus).
            >= 
            ((Math.pow(2, denseCurrLevel)) * (Math.pow(1.1, gravCurrLevel + 1)) * (1 + (((currMeta - getGravPrice(gravCurrLevel)) * 2) / 10)))) {
                currMeta -= getDensePrice(denseCurrLevel);
                denseCurrLevel += 1;
                updated = true;
            } else if (((Math.pow(2, denseCurrLevel)) * (Math.pow(1.1, gravCurrLevel + 1)) * (1 + (((currMeta - getGravPrice(gravCurrLevel)) * 2) / 10)))
            >= 
            ((Math.pow(2, denseCurrLevel)) * (Math.pow(1.1, gravCurrLevel)) * (1 + ((currMeta * 2) / 10)))) {
                currMeta -= getGravPrice(gravCurrLevel);
                gravCurrLevel += 1;
                updated = true;
            }
            if (updated === false) {
                break;
            }
        }

        output.value = "You need to upgrade density " + Math.round(denseCurrLevel - denseBaseLevel) + " Times. \n"
        + "You need to upgrade gravity " + Math.round(gravCurrLevel - gravBaseLevel) + " Times. \n"
        + "And you will have " + Math.round(currMeta * 100) / 100 + " Meta left over.";
    }
}

//iblob the equation for density price scaling is 4*1.3**nextlevel-1