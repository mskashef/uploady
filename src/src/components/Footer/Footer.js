import React from 'react';
import classes from './Footer.module.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Container} from '@material-ui/core';
import {footerNavBarLinks} from "../../constants";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
const Footer = props => {
    return (
        <div className={classes.wrapper} >
            <div className={classes.goToTop}><ExpandLessIcon /></div>
            <div className={classes.icons}>
                <FacebookIcon className={classes.footerIcon} style={{color: '#204888', width: 40, height: 40}} />
                <TelegramIcon className={classes.footerIcon} style={{color: '#039BE5', width: 40, height: 40}} />
                <InstagramIcon className={classes.footerIcon} style={{color: '#CF2362', width: 40, height: 40}} />
                <TwitterIcon className={classes.footerIcon} style={{color: '#1DA1F2', width: 40, height: 40}} />
            </div>
            <p className={classes.desc}>Making Your File Sharing Easy.</p>
            <h1 className={classes.title}>uploady.com</h1>
            <Container>
                <div className={classes.hr} />
                <div className={classes.row}>
                    <div style={{flex: 1, textAlign: 'left'}}>Copyright ©2012-2020 Uploady.All Rights Reserved.</div>
                    {
                        footerNavBarLinks.map(link => <div className={classes.navLink}>{link.title}</div>)
                    }
                </div>
            </Container>

        </div>
    )
};

export default Footer;
