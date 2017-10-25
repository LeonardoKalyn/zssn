import {simpleGet, simplePost} from './restApiAccess';
import {tradeURL, propertiesURL} from './url';

export const trade = (data, callback) => {
    const {id, ...rest} = data;
    simplePost(
        tradeURL(id),
        rest,
        (response, body) => {
            callback((response.statusCode===204), response.statusCode);
        }
    );
};

const getPersonProperties = (id, callback) => {
    simpleGet(
        propertiesURL(id),
        (response,body) => {
            callback ((response.statusCode===200), JSON.parse(body));
        }
    );
};

export default getPersonProperties;