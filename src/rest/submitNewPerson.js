import {simplePost} from './restApiAccess';
import {personURL} from './url';

const submitNewPerson = (newPerson, callback) => {
    simplePost(
        personURL(),
        newPerson,
        (response, body) => {
            callback((response.statusCode === 201), JSON.parse(body));
        }
    );
};

export default submitNewPerson;