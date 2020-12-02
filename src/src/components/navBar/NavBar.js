import React from 'react';
import classes from './HomePage.module.css';
import home from '../../../assets/backgroundImages/home.png';
import logo from '../../../assets/logo.svg';
import upload from '../../../assets/upload.svg';
const NavBar = props => {
    return (
        <div className={classes.wrapper} style={{backgroundImage: `url(${home})`}}>
            <img src={logo} alt={"UPLOADY"} className={classes.logo} />
            <div className={classes.uploadWrapper}>
                <div className={classes.uploadIcon}>
                    <img src={upload} alt={"Upload"} className={classes.upload}/>
                    <div className={classes.uploadText}>Upload File</div>
                </div>
            </div>
        </div>
    )
};

export default NavBar;
