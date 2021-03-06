export function getTokenFromCookie () {
    if (!document.cookie) {
        return;
    }
    
    const cookies = document.cookie.split(';');
    const token = cookies.find( cookie => cookie.includes('token='));
    
    return (token && token.replace('token=','')) || undefined;
};

const options = {
    mode: "cors",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": getTokenFromCookie()
    }
};

const fetchThis = (url) => {
    return fetch(url, options)
        .then(resp => resp.json())
        .catch(error => error);
};

export function setTokenCookie (token) {
    document.cookie = `token=${token}`;
};

export function get (url, params) {
    options.method = 'GET';

    delete options.body

    if (params) {
        url += `?${params}`;
    }

    return fetchThis(url);
}

export function post (url, payload, params) {
    options.method = 'POST';

    if (params) {
        url += `?${params}`;
    }

    options.body = JSON.stringify(payload);

    return fetchThis(url);
}
