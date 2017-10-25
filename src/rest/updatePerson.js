import {personIdURL} from './url';
import {simplePatch, simpleGet} from './restApiAccess';

export const getSinglePerson = (id, callback) => {
    simpleGet(
        personIdURL(id),
        (response, body)=>{
            if(response.statusCode === 200){
                callback(true, JSON.parse(body));
            }
            else{
                callback(false, body);
            }
        }
    );
};

const updatePerson = (person, callback) => {
    const {id, ...rest} = person;
    simplePatch(
        personIdURL(id),
        rest,
        (response, body)=>{
            callback((response.statusCode === 200), JSON.parse(body));
        }
    );
};

export default updatePerson;