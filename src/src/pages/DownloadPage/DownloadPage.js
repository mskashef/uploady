import React, {useState, useEffect} from 'react';
import classes from './DownloadPage.module.css';
import bg from '../../../assets/backgroundImages/download.png';
import {DownloadNavBarLinks} from "../../constants";
import {Link} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import {IconButton} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Footer from "../../components/Footer/Footer";
import {Container} from '@material-ui/core';
import axios from 'axios';

const DownloadPage = props => {
    const [versions, setVersions] = useState([]);
    const [version, setVersion] = useState([]);
    useEffect(() => {
        axios.get(`/api/getFileVersions/${props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                setVersions(res.data);
                setVersion(res.data[res.data.length - 1].version);
            });
    }, []);
    return (
        <div className={classes.wrapper}>

            <div className={classes.backgroundImage} style={{backgroundImage: `url(${bg})`}}>
                <Container>
                    <ul className={classes.navbarWrapper}>
                        {DownloadNavBarLinks.map(link => (
                            <li className={link.box ? classes.box : ''}><Link to={link.linkTo}>{link.title}</Link></li>
                        ))}
                    </ul>
                </Container>
                <h1 className={classes.upgradeYourAccount}>
                    Upgrade<br/>
                    Your Account
                </h1>
                <div className={classes.desc}>Pick a plan that best suits your needs</div>
            </div>

            <div className={classes.cards}>
                <div className={classes.card}>
                    <div className={classes.authTitle}>Guest</div>
                    <div className={classes.authDescription}>Very Limited</div>
                    <ul className={classes.ul}>
                        <li>Very Low Download Speed</li>
                        <li>No Hosting Space</li>
                        <li>1024 MB Maximum Filesize</li>
                        <li>Very Slow Download</li>
                        <li>Min 60 Second Delay</li>
                        <li>Delete File 10 Days After Last Download</li>
                    </ul>
                    <button className={classes.signInButton}>Be A Premium Now</button>
                </div>
                <div className={classes.card}>
                    <div className={classes.authTitle}>Premium</div>
                    <div className={classes.authDescription}>Unlimited</div>
                    <ul className={classes.ul}>
                        <li>From 1000 GB Space</li>
                        <li>High Speed Download</li>
                        <li>FTP Upload</li>
                        <li>Remote URL Upload</li>
                        <li>Fast & Direct Download</li>
                        <li>Earn Money</li>
                        <li>No Delay or Captcha</li>
                        <li>24X7 Support</li>
                        <li>No Advertise</li>
                    </ul>
                    <button className={classes.signInButton}>Be A Premium Now</button>
                </div>
                <div className={classes.card}>
                    <div className={classes.authTitle}>Registered</div>
                    <div className={classes.authDescription}>Limited</div>
                    <ul className={classes.ul}>
                        <li>100 GB Free Space</li>
                        <li>Low Download Speed</li>
                        <li>2048 MB Maximum Filesize</li>
                        <li>Remote URL Upload</li>
                        <li>Slow Download</li>
                        <li>Min 30 Seconds Delay</li>
                        <li>Delete File 30 Days After Last Download</li>
                        <li>Earn Money</li>
                    </ul>
                    <button className={classes.signInButton}>Be A Premium Now</button>
                </div>
            </div>

            <div>
                <select value={version} onChange={e => setVersion(e.target.value)}>
                    {versions.map(v => <option value={v.version}>{v.version}</option>)}
                </select>
            </div>

            <div className={classes.linkWrapper}>
                <a href={'http://localhost:5000' + versions.find(v => v.version === version)?.src}>http://localhost:5000{versions.find(v => v.version === version)?.src}</a>
            </div>

            <div className={classes.row}>
                <div className={classes.downloadBtn} onClick={() => window.location.href = 'http://localhost:5000' + versions.find(v => v.version === version)?.src}>Download</div>
                <IconButton style={{color: '#090909', margin: "0 -10px"}}>
                    <InfoIcon style={{width: 40, height: 40}}/>
                </IconButton>
                <IconButton style={{color: '#090909', margin: "0 -10px"}}>
                    <ShareIcon style={{width: 40, height: 40}}/>
                </IconButton>
                <IconButton style={{color: 'red'}}>
                    <FavoriteBorderIcon style={{width: 40, height: 40, margin: "0 -10px"}}/>
                </IconButton>
            </div>
            <Footer/>
        </div>
    )
};

export default DownloadPage;
