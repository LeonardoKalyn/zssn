import request from 'request';

export const simpleGet = (url, callback) => {
    request(
        url, 
        (err, response, body) => {
            if(err){
                console.log(err);
                return;
            }
            callback(body);
        });
};

export const simplePost = (url, data, callback) => {
    request.post(
        {
            url: url, 
            form:{...data}
        },
        (err, response, body)=>{
            if(err){
                console.log(err);
                return;
            }
            callback(body);
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
            if(err){
                console.log(err);
                return;
            }
            callback(body);
        }
    );
};