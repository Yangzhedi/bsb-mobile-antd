import { getCookie } from './Cookie';

var id_token = getCookie('id_token')
var HTTPUtil = {};

/**
 * 基于 fetch 封装的 GET请求
 * @param url
 * @param params {}
 * @param headers
 * @returns {Promise}
 */
HTTPUtil.get = function(url, params, headers) {
    url = 'https://118.190.81.215/api' + url;
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    console.log('进来了能用')
    console.log(headers)
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject({status:response.status})
            }
        })
        .then((response) => {
            console.log(response);
            resolve(response);
        })
        .catch((err)=> {
            console.log(err);
            reject({status:-1});
        })
    })
}


/**
 * 基于 fetch 封装的 POST请求  FormData 表单数据
 * @param url
 * @param formData
 * @param headers
 * @returns {Promise}
 */
HTTPUtil.post = function (url, formData, headers) {
    url = 'https://118.190.81.215/api' + url;
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body:JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                reject({status:response.status})
            }
        })
        .then((response) => {
            resolve(response);
        })
        .catch((err)=> {
            reject({status:-1});
        })
    })
};

export default HTTPUtil;