'use strict';

import http = require("http");
import Promise = require("bluebird");
import axios = require("axios");

import { Authentication } from '../auth/Authentication';
import { HMACAuthentication } from '../auth/HMACAuthentication';
import { ObjectSerializer } from '../serializers/ObjectSerializer';

import { ClientError } from  '../models/ClientError';
import { ServerError } from  '../models/ServerError';
import { TransactionInvoiceComment } from  '../models/TransactionInvoiceComment';
import { TransactionInvoiceCommentActive } from  '../models/TransactionInvoiceCommentActive';
import { TransactionInvoiceCommentCreate } from  '../models/TransactionInvoiceCommentCreate';

class TransactionInvoiceCommentService {
    protected _basePath = 'https://gateway.vr-payment.de:443/api';
    protected _defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;
    protected _timeout : number = 25;
    protected _defaultAuthentication: Authentication;

    constructor(configuration: any) {
        this._defaultAuthentication = new HMACAuthentication(configuration).apply;
        this._defaultHeaders = configuration.default_headers;
        this.setTimeout(configuration.timeout);
    }

    /**
    * Set timeout in seconds. Default timeout: 25 seconds
    * @param {number} timeout
    */
    set timeout(timeout: number) {
        this.setTimeout(timeout)
    }

    private setTimeout(timeout: number) {
        if (timeout !== undefined) {
            if (!Number.isInteger(timeout)) {
                throw new Error('Timeout value has to be integer');
            }
            if (timeout) {
                this._timeout = timeout;
            } else {
                throw new Error('Timeout value has to be greater than 0');
            }
        }
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    protected setDefaultAuthentication(auth: Authentication) {
        this._defaultAuthentication = auth;
    }

    private getVersion(): string {
        if (typeof (process) !== 'undefined' && process && process.version) {
            return 'node ' + process.version;
        } else {
            return 'unknown';
        }
    }

    /**
    * Deletes the comment with the given id.
    * @summary Delete
    * @param spaceId 
    * @param id 
    * @param {*} [options] Override http request options.
    */
    public _delete (spaceId: number, id: number, options: any = {}) : Promise<{ response: http.IncomingMessage; body?: any;  }> {
        const url: string = '/transaction-invoice-comment/delete';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling _delete.');
        }

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling _delete.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }




        headers['Content-Type'] = 'application/json;charset=utf-8';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'POST',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            data: id,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body?: any;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;

                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

    /**
    * Returns all comments of the given transaction invoice.
    * @summary Find by invoice
    * @param spaceId 
    * @param invoiceId 
    * @param {*} [options] Override http request options.
    */
    public all (spaceId: number, invoiceId: number, options: any = {}) : Promise<{ response: http.IncomingMessage; body: Array<TransactionInvoiceComment>;  }> {
        const url: string = '/transaction-invoice-comment/all';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling all.');
        }

        // verify required parameter 'invoiceId' is not null or undefined
        if (invoiceId === null || invoiceId === undefined) {
            throw new Error('Required parameter invoiceId was null or undefined when calling all.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }

        if (invoiceId !== undefined) {
            queryParams['invoiceId'] = ObjectSerializer.serialize(invoiceId, "number");
        }




        headers['Content-Type'] = 'application/json;charset=utf-8';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'POST',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body: Array<TransactionInvoiceComment>;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;
                        body = ObjectSerializer.deserialize(success.data, "Array<TransactionInvoiceComment>");
                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

    /**
    * Creates the comment with the given properties.
    * @summary Create
    * @param spaceId 
    * @param entity The comment object which should be created.
    * @param {*} [options] Override http request options.
    */
    public create (spaceId: number, entity: TransactionInvoiceCommentCreate, options: any = {}) : Promise<{ response: http.IncomingMessage; body: TransactionInvoiceComment;  }> {
        const url: string = '/transaction-invoice-comment/create';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling create.');
        }

        // verify required parameter 'entity' is not null or undefined
        if (entity === null || entity === undefined) {
            throw new Error('Required parameter entity was null or undefined when calling create.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }




        headers['Content-Type'] = 'application/json;charset=utf-8';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'POST',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            data: entity,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body: TransactionInvoiceComment;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;
                        body = ObjectSerializer.deserialize(success.data, "TransactionInvoiceComment");
                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

    /**
    * Pins the comment to the top.
    * @summary Pin
    * @param spaceId 
    * @param id The id of the comment to pin to the top.
    * @param {*} [options] Override http request options.
    */
    public pin (spaceId: number, id: number, options: any = {}) : Promise<{ response: http.IncomingMessage; body?: any;  }> {
        const url: string = '/transaction-invoice-comment/pin';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling pin.');
        }

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling pin.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }

        if (id !== undefined) {
            queryParams['id'] = ObjectSerializer.serialize(id, "number");
        }




        headers['Content-Type'] = '*/*';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'GET',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body?: any;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;

                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

    /**
    * Reads the comment with the given 'id' and returns it.
    * @summary Read
    * @param spaceId 
    * @param id The id of the comment which should be returned.
    * @param {*} [options] Override http request options.
    */
    public read (spaceId: number, id: number, options: any = {}) : Promise<{ response: http.IncomingMessage; body: TransactionInvoiceComment;  }> {
        const url: string = '/transaction-invoice-comment/read';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling read.');
        }

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling read.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }

        if (id !== undefined) {
            queryParams['id'] = ObjectSerializer.serialize(id, "number");
        }




        headers['Content-Type'] = '*/*';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'GET',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body: TransactionInvoiceComment;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;
                        body = ObjectSerializer.deserialize(success.data, "TransactionInvoiceComment");
                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

    /**
    * Unpins the comment from the top.
    * @summary Unpin
    * @param spaceId 
    * @param id The id of the comment to unpin.
    * @param {*} [options] Override http request options.
    */
    public unpin (spaceId: number, id: number, options: any = {}) : Promise<{ response: http.IncomingMessage; body?: any;  }> {
        const url: string = '/transaction-invoice-comment/unpin';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling unpin.');
        }

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling unpin.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }

        if (id !== undefined) {
            queryParams['id'] = ObjectSerializer.serialize(id, "number");
        }




        headers['Content-Type'] = '*/*';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'GET',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body?: any;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;

                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

    /**
    * This updates the comment with the given properties. Only those properties which should be updated can be provided. The 'id' and 'version' are required to identify the comment.
    * @summary Update
    * @param spaceId 
    * @param entity The comment object with the properties which should be updated.
    * @param {*} [options] Override http request options.
    */
    public update (spaceId: number, entity: TransactionInvoiceCommentActive, options: any = {}) : Promise<{ response: http.IncomingMessage; body: TransactionInvoiceComment;  }> {
        const url: string = '/transaction-invoice-comment/update';
        let queryParams: any = {};
        let headers: any = Object.assign({}, this._defaultHeaders);

        // verify required parameter 'spaceId' is not null or undefined
        if (spaceId === null || spaceId === undefined) {
            throw new Error('Required parameter spaceId was null or undefined when calling update.');
        }

        // verify required parameter 'entity' is not null or undefined
        if (entity === null || entity === undefined) {
            throw new Error('Required parameter entity was null or undefined when calling update.');
        }

        if (spaceId !== undefined) {
            queryParams['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }




        headers['Content-Type'] = 'application/json;charset=utf-8';

        Object.assign(headers, options.headers);

        let defaultHeaders = {
            "x-meta-sdk-version": "4.7.0",
            "x-meta-sdk-language": "typescript",
            "x-meta-sdk-provider": "VRPay",
            "x-meta-sdk-language-version": this.getVersion(),
        };

        Object.assign(headers, defaultHeaders);

        let requestConfig: axios.AxiosRequestConfig = {
            url,
            method: 'POST',
            baseURL: this._basePath,
            headers,
            params: queryParams,
            data: entity,
            timeout: this._timeout * 1000,
            responseType: 'json',
        }

        const axiosInstance: axios.AxiosInstance  = axios.default.create();
        axiosInstance.interceptors.request.use(this._defaultAuthentication);

        return new Promise<{ response: http.IncomingMessage; body: TransactionInvoiceComment;  }>((resolve, reject) => {
            axiosInstance.request(requestConfig)
                .then(
                    success => {
                        let body;
                        body = ObjectSerializer.deserialize(success.data, "TransactionInvoiceComment");
                        return resolve({ response: success.request.res, body: body });
                    },
                    failure => {
                        let errorObject: ClientError | ServerError | Object;
                        if (failure.response?.status) {
                            if (failure.response.status >= 400 && failure.response.status <= 499) {
                                errorObject = new ClientError();
                            } else if (failure.response.status >= 500 && failure.response.status <= 599) {
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                        } else {
                            errorObject = new Object()
                        }
                        return reject({
                            errorType: errorObject.constructor.name,
                            date: (new Date()).toDateString(),
                            statusCode: failure.response?.status && isNaN(failure.response.status) ? String(failure.response.status) : "Unknown",
                            statusMessage: failure.response?.statusText != null ? failure.response.statusText : "Unknown",
                            body: failure.response?.data,
                            response: failure.response?.request.res
                        });
                    }
                )
                .catch(error => {
                    return reject(error);
                });
        });
    };

}

export { TransactionInvoiceCommentService }
