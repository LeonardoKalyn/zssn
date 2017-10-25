import { simplePost } from './restApiAccess';
import { infectedURL} from './url';

const reportInfected = (data, callback) => {
    simplePost(
        infectedURL(data.id),
        {infected: data.infected},
        (response, body) => {
            callback((response.statusCode===204), response.statusCode);
        }
    );
};

export default reportInfected;