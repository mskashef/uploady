import React from 'react';
import classes from './HomePage.module.css';
import home from '../../../assets/backgroundImages/home.png';
import logo from '../../../assets/logo.svg';
import upload from '../../../assets/upload.svg';
import {navBarLinks} from "../../components/navBar/data";
import {Link} from 'react-router-dom';

const HomePage = props => {
    return (
        <div className={classes.wrapper} style={{backgroundImage: `url(${home})`}}>
            <img src={logo} alt={"UPLOADY"} className={classes.logo} />
            <div className={classes.uploadWrapper}>
                <div className={classes.uploadIcon}>
                    <img src={upload} alt={"Upload"} className={classes.upload}/>
                    <div className={classes.uploadText}>Upload File</div>
                </div>
            </div>
            <ul className={classes.navbarWrapper}>
                {navBarLinks.map(link => (
                    <li className={link.box ? classes.box : ''}><Link to={link.linkTo}>{link.title}</Link></li>
                ))}
            </ul>
        </div>
    )
};

export default HomePage;
