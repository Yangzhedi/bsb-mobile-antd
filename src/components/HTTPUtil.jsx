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
    url = 'http://localhost:8080/api' + url;
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
    url = 'http://localhost:8080/api' + url;
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


HTTPUtil.ajax = function (opt) {
    opt = opt || {};
    // console.log(opt)
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = ('http://localhost:8080/api' + opt.url) || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.setRequestHeader("Authentication", 'Bearer '+ id_token);
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + (postData?'?':'') + postData, opt.async);
        xmlHttp.send(null);
    } 
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(xmlHttp.responseText);
        }
    };
}




export default HTTPUtil;