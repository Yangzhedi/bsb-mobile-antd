export function get(url,params){  
    if (params) {  
        let paramsArray = [];  
        //拼接参数  
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
        if (url.search(/\?/) === -1) {  
            url += '?' + paramsArray.join('&')  
        } else {  
            url += '&' + paramsArray.join('&')  
        }  
    }  
    //fetch请求  
    fetch(url,{  
        method: 'GET',  
    })  
    .then((response) => response.json())  
    .then((json) => {  
        console.log(JSON.stringify(json));  
        // this.setState({ discounts: json.data })  
    })  
    .catch((error) => {  
        alert(error)  
    })  
} 