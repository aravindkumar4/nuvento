import RequestMiddleware from './RequestMiddleware'
import axios from 'axios';
import { APIURLTypeEnum } from '../core/Enum';

class RequestHelper {
    static POST = (url, apiType, request, callback) => {
        return axios.post(RequestMiddleware.urlRequest(url, apiType), request).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static POST1 = (url, request, callback) => {
        return axios.post(url, request).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static MultiPOST = (requestOneUrl, requestTwoUrl, apiType, request1, request2, callback) => {
        const requestOne = axios.post(RequestMiddleware.urlRequest(requestOneUrl, apiType), request1);
        const requestTwo = axios.post(RequestMiddleware.urlRequest(requestTwoUrl, apiType), request2);

        return axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            let res = responses[0];
            let returnResponseOne = {};

            if (res && res.data.StatusCode == 200) {
                returnResponseOne = res.data;
            } else {
                returnResponseOne = res;
            }

            res = responses[1];
            let returnResponseTwo = {};

            if (res && res.data.StatusCode == 200) {
                returnResponseTwo = res.data;
            } else {
                returnResponseTwo = res;
            }

            callback({
                responseOne: returnResponseOne,
                responseTwo: returnResponseTwo
            });
        })).catch(errors => {
            callback(errors);
        })
    }

    static GET1 = (url, callback) => {
        return axios.get(url).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static PUT = (url, request, callback) => {

        return axios.put(url, request).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static PUT1 = (url, apiType, request, callback) => {
        
        return axios.put(RequestMiddleware.urlRequest(url, apiType), request).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static GET = (url, apiType, params, callback) => {
        return axios.get(RequestMiddleware.urlRequest(url, apiType) + params).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static POST1 = (url, request, callback) => {
        return axios.post(url, request).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }

    static GET1 = (url, callback) => {
        return axios.get(url).then(res => {
            if (res && res.data.StatusCode == 200) {
                callback(res.data);
            } else {
                callback(res);
            }
        }).catch((error) => {
            callback(error)
        })
    }
}

export default RequestHelper;