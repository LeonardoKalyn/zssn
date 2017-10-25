import { simpleGet } from './restApiAccess';
import { personURL } from './url';

const getAllPeople = (callback) => {
    simpleGet(
        personURL(),
        (response, body) => {
            callback((response.statusCode===200), JSON.parse(body));
        }
    );
};

export default getAllPeople;