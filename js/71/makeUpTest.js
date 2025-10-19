'use strict';
(function () {

    let id = 0;
    const maleNames = ['Aiden', 'Jackson', 'Ethan', 'Liam', 'Noah', 'Lucas', 'Mason', 'Oliver', 'Caden', 'Elijah', 'Logan', 'James', 'Benjamin', 'Jacob', 'Alexander', 'Michael', 'William', 'Daniel', 'Henry', 'Samuel'];
    const femaleNames = ['Sophia', 'Olivia', 'Emma', 'Ava', 'Isabella', 'Aria', 'Riley', 'Chloe', 'Zoey', 'Amelia', 'Mia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Ella', 'Scarlett', 'Grace', 'Madison', 'Layla'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

    function personCreator(gender, first, last) {
        if (!first) {
            if (gender.toLowerCase() === 'male') {
                first = maleNames[Math.floor(Math.random() * maleNames.length)];
            } else {
                first = femaleNames[Math.floor(Math.random() * femaleNames.length)];
            }
        }
        if (!last) {
            last = lastNames[Math.floor(Math.random() * lastNames.length)];
        }

        id++;

        return {
            id,
            first,
            last,
            gender
        };
    }

    function shidduchMaker(maleArray, femaleArray) {
        let tempFemaleArray = femaleArray.slice();

        maleArray.forEach(male => {
            let i = Math.floor(Math.random() * tempFemaleArray.length);
            male.spouse = tempFemaleArray[i];
            tempFemaleArray[i].spouse = male;
            tempFemaleArray.splice(i, 1);
        });
    }

    let males = [];
    let females = [];

    for (let i = 0; i < 20; i++) {
        males.push(personCreator('male'));
        females.push(personCreator('female'));
    }

    shidduchMaker(males, females);

    males.concat(females).sort((a, b) => a.id - b.id).forEach(person => { console.log(`ID: ${person.id}, First: ${person.first}, Last: ${person.last}, Gender: ${person.gender}, Spouse: ${person.spouse ? person.spouse.first + ' ' + person.spouse.last : 'None'}, Spouse ID: ${person.spouse ? person.spouse.id : 'N/A'}`); });

})();