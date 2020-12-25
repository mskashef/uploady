import Cookies from "js-cookie";

const getToken = () => Cookies.get('uploadyToken');

const getUsername = () => Cookies.get('username');

const checkAuthentication = (history) => {
    if (!!!Cookies.get('uploadyToken'))
        history.replace('/auth');
};

export {getToken, checkAuthentication, getUsername}
