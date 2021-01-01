import React, {useState, useEffect, useRef} from 'react';
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
import CropIcon from '@material-ui/icons/Crop';
import FullScreenDialog from "../../components/Modal/Modal";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropFreeIcon from '@material-ui/icons/CropFree';
import {backendURL} from "../../../constants";


const isImage = (fileName) => {
    if (!fileName || !fileName.includes('.')) return false;
    return ['png', 'jpg', 'jpeg', 'bmp'].includes(fileName.slice(fileName.lastIndexOf('.') + 1));
};

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );
    let link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL();
    link.click();
}

const DownloadPage = props => {
    const [versions, setVersions] = useState([]);
    const [version, setVersion] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [percent, setPercent] = useState(100);
    const [crop, setCrop] = useState({
        unit: '%', // default, can be 'px' or '%'
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });
    const imgRef = useRef(null);
    const [img, setImg] = useState(null);
    useEffect(() => {
        axios.get(`/api/getFileVersions/${props.match.params.id}`)
            .then(res => {
                // console.log(res.data);
                setVersions(res.data);
                setVersion(res.data[res.data.length - 1].version);
            });
    }, []);
    const file = versions.find(v => v.version === version);
    const link = 'http://localhost:5000' + file?.src;
    return (
        <div className={classes.wrapper}>

            <div className={classes.backgroundImage} style={{backgroundImage: `url(${bg})`}}>
                <Container>
                    <ul className={classes.navbarWrapper}>
                        {DownloadNavBarLinks?.map(link => (
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
                    {versions?.map(v => <option value={v.version}>{v.version}</option>)}
                </select>
            </div>

            <div className={classes.linkWrapper}>
                <a href={link}>{link}</a>
            </div>

            <div className={classes.row}>
                <div
                    className={classes.downloadBtn}
                    onClick={() => window.location.href = link}
                >
                    Download
                </div>
                <IconButton style={{color: '#090909', margin: "0 -10px"}}>
                    <InfoIcon style={{width: 40, height: 40}}/>
                </IconButton>
                <IconButton style={{color: '#090909', margin: "0 -10px"}}>
                    <ShareIcon style={{width: 40, height: 40}}/>
                </IconButton>
                <IconButton style={{color: 'red', margin: "0 -10px"}}>
                    <FavoriteBorderIcon style={{width: 40, height: 40}}/>
                </IconButton>
                {isImage(file?.name) ? (
                    <IconButton style={{color: 'steelblue', margin: "0 -10px"}} onClick={() => setOpen(true)}>
                        <CropIcon style={{width: 40, height: 40}}/>
                    </IconButton>
                ) : null}
                {isImage(file?.name) ? (
                    <IconButton style={{color: 'steelblue', margin: "0 -10px"}} onClick={() => setOpen2(true)}>
                        <CropFreeIcon style={{width: 40, height: 40}}/>
                    </IconButton>
                ) : null}
            </div>
            <FullScreenDialog
                title={'Crop Image'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={classes.modalBody}>
                    <div className={classes.modalImageWrapper}>
                        <ReactCrop
                            src={file?.src}
                            onChange={crop => setCrop(crop)}
                            crop={crop}
                            onImageLoaded={img => {
                                setImg(img)
                            }}
                        />
                    </div>
                    <div
                        className={classes.downloadBtn}
                        onClick={async () => await getCroppedImg(img, crop, file.name)}
                    >
                        Download Selected Part
                    </div>
                </div>
            </FullScreenDialog>
            <FullScreenDialog
                title={'Resize Image'}
                open={open2}
                onClose={() => setOpen2(false)}
            >
                <div className={classes.modalBody}>
                    <div className={classes.modalImageWrapper}>
                        <img
                            ref={imgRef}
                            style={{maxWidth: 500, maxHeight: 500}}
                            src={file?.src}
                        />
                    </div>
                    <div>
                        The result image will be
                        <input
                            value={percent}
                            onChange={e => {
                                setPercent(Number(e.target.value));
                            }}
                            type={'number'}
                            className={classes.percentage}
                        />
                        % of the resource image!
                    </div>
                    <div
                        className={classes.downloadBtn}
                        onClick={() => {
                            console.log(file);
                            window.location.href = backendURL + file.src + '/resize?percentage=' + percent;
                        }}
                    >
                        Download Resized Image
                    </div>
                </div>
            </FullScreenDialog>
            <Footer/>
        </div>
    )
};

export default DownloadPage;
