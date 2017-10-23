export const validateNumber = (number) => {
    if(number !==0 && !number)
        return false;
        
    const numberString = number.toString();
    return (
        (number>=0) &&
        (numberString !== '') &&
        (/^\d+$/.test(numberString)) //Only contain numbers
    );
};

export const validateName = (name) =>{
    return (name);
};

export const validateGender = (gender) =>
    ((gender === 'M') || (gender === 'F'));

export const validateLocation = (location) => (
    (location === '') || 
    (/^-?\d+\.?\d+,-?\d+\.?\d+$/.test(location)) // On format 'latitude,longitude'
);
