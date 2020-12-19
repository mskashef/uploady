import React , {useState, useEffect} from 'react';
import classes from './AuthPage.module.css';
import auth from '../../../assets/backgroundImages/auth.png';
import {authNavBarLinks} from "../../constants";
import {Link} from 'react-router-dom';
import axios from 'axios';

const AuthPage = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const data = {
            username: username,
            password: password
        };
        axios
            .post('/api/login', data, {withCredentials: true})
            .then(res => {
                if (res.data.success) {
                    props.history.replace('/');
                } else (alert(res.data.msg));
            })
            .catch(err => {});
    };
    return (
        <div className={classes.wrapper} style={{backgroundImage: `url(${auth})`}}>
            <ul className={classes.navbarWrapper}>
                {authNavBarLinks.map(link => (
                    <li className={link.box ? classes.box : ''}><Link to={link.linkTo}>{link.title}</Link></li>
                ))}
            </ul>
            <div className={classes.card}>
                <div className={classes.authTitle}>User Login</div>
                <div className={classes.authDescription}>Sign in and start sharing your files!</div>
                <input
                    style={{color: username ? 'black' : 'white'}}
                    type={"text"}
                    value={username}
                    placeholder={"Username"}
                    className={classes.authInput}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    style={{color: password ? 'black' : 'white'}}
                    type={"password"}
                    value={password}
                    placeholder={"Password"}
                    className={classes.authInput}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={classes.row}>
                    <div className={classes.forgotPassword}>Forgot password?</div>
                    <button className={classes.signInButton} onClick={() => {
                        axios.get('/api/posts').then((response) => {console.log(response)})
                    }}>Sign In</button>
                </div>
                <button className={classes.submit} onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
};

export default AuthPage;
