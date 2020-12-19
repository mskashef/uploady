import Cookies from "js-cookie";

const isLoggedIn = () => !!Cookies.get('uploadyToken');

const checkAuthentication = (history) =>  {
    if (!!!Cookies.get('uploadyToken'))
        history.replace('/auth');
};

export {isLoggedIn, checkAuthentication}
