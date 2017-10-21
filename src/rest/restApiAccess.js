import request from 'request';

export const simpleGet = (url, callback) => {
    request(
        url, 
        (err, response, body) => {
            if(err && (process.env.NODE_ENV !== 'production')){
                console.log(err);
            }
            if(callback && !err)
                callback(response, body);
        });
};

export const simplePost = (url, data, callback) => {
    request.post(
        {
            url: url, 
            form:{...data}
        },
        (err, response, body)=>{
            if(err && (process.env.NODE_ENV !== 'production')){
                console.log(err);
            }
            if(callback)
                callback(response, body);
        }
    );
};

export const simplePatch = (url, data, callback) => {
    request.patch(
        {
            url: url, 
            form:{...data}
        },
        (err, response, body)=>{
            if(err && (process.env.NODE_ENV !== 'production')){
                console.log(err);
            }
            if(callback)
                callback(response, body);
        }
    );
};