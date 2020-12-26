import React, {useState, useEffect} from 'react';
import classes from './DashboardPage.module.css';
import logo from '../../../assets/logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import {IconButton} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {checkAuthentication, getToken, getUsername} from "../../../scripts";
import {toast} from "react-toastify";

const DrawerItem = props => {
    const Icon = props.icon;
    return (
        <div className={classes.drawerItem} onClick={props.onClick}>
            <Icon className={classes.drawerIcon}/>
            <div className={classes.drawerItemTitle}>{props.title}</div>
        </div>
    )
};
const DashboardPage = props => {
    checkAuthentication(props.history);
    const username = getUsername();
    const [isUpdate, setIsUpdate] = useState(false);
    const [file, setFile] = useState(null);
    const [updateFor, setUpdateFor] = useState('');
    const [version, setVersion] = useState('');
    const [searchText, setSearchText] = useState('');
    const [redirectLogin, setRedirectLogin] = useState('');
    const [files, setFiles] = useState([]);

    const handleLogout = () => {
        axios.delete('/api/logout').then(res => window.location.reload(), err => {
        });
    };

    const handleDeleteFile = (fid, vid) => {
        axios.delete(`/api/deleteFile/${fid}/${vid}`).then(res => {
            setTimeout(getMyFiles, 1200);
        }).catch(err => {
            toast.error('An error occurred!');
        })
    };

    const handleUpload = () => {
        if (!file) return;
        const data = new FormData();
        if (!version.trim()) return toast.error('The Version Name field can not be empty!');
        data.append('version', version);
        if (isUpdate) {
            if (!updateFor.trim() || !version.trim()) return toast.error('Enter both file id and version name!');
            data.append('updateFor', updateFor);
        }
        data.append('file', file);
        axios
            .post('/api/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            }).then(res => {
            if (res.data.redirect) setRedirectLogin(res.data.redirect);
            setFile(null);
            setVersion('');
            setUpdateFor('');
            setTimeout(getMyFiles, 1200);
        }, err => console.log(err));
    };
    const getMyFiles = () => {
        axios.get('/api/getMyFiles').then(res => {
            console.log(res.data)
            setFiles(res.data);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getMyFiles();
    }, []);

    const used = files.map(file => file.size)?.reduce((sum, cur) => sum + cur, 0);
    let usedSize = files.map(file => file.size)?.reduce((sum, cur) => sum + cur, 0);
    let unit = "B";
    if (usedSize >= 1000) {
        usedSize /= 1000;
        unit = 'KB';
    }
    if (usedSize >= 1000) {
        usedSize = Math.floor(usedSize) / 1000;
        unit = 'MB';
    }
    if (usedSize >= 1000) {
        usedSize = Math.floor(usedSize) / 1000;
        unit = 'GB';
    }

    return (
        <div className={classes.wrapper}>
            {redirectLogin && <Redirect to={redirectLogin}/>}
            <div className={classes.titleBar}>
                <img src={logo} alt={"UPLOADY"} className={classes.logo}/>
                <div className={classes.menuIcon}><MenuIcon style={{color: '#FFFFFF', width: 40, height: 40}}/></div>
                <div style={{flex: 1}}/>
                <div className={classes.menuIcon}><MailIcon style={{color: '#FFFFFF', width: 40, height: 40}}/></div>
                <AccountCircleIcon style={{color: '#FFFFFF', width: 40, height: 40}}/>
                <div className={classes.user}>{username}</div>
                <ArrowDropDownIcon style={{color: '#FFFFFF', width: 40, height: 40, marginRight: 20}}/>
            </div>
            <div className={classes.div}>
                <div className={classes.drawer}>
                    <div className={classes.navTitle}>Navigation</div>
                    <DrawerItem icon={HomeIcon} title={'Home'}/>
                    <DrawerItem icon={FolderIcon} title={'My Files'}/>
                    <DrawerItem icon={MonetizationOnIcon} title={'My Earnings'}/>
                    <DrawerItem icon={LocalAtmIcon} title={'Premium'}/>
                    <DrawerItem icon={AssessmentIcon} title={'Reports'}/>
                    <DrawerItem icon={SettingsIcon} title={'User & Payment Settings'}/>
                    <DrawerItem icon={ChatIcon} title={'File Comments'}/>
                    <DrawerItem icon={FavoriteIcon} title={'Favorite Files'}/>
                    <DrawerItem icon={HelpOutlineIcon} title={'Training'}/>
                    <DrawerItem icon={PowerSettingsNewIcon} title={'Logout'} onClick={handleLogout}/>
                </div>
                <div className={classes.body}>
                    <div className={classes.bodyTitleBar}>
                        <FolderIcon style={{color: '#13262C'}}/>
                        <div className={classes.bodyTitle}>My Files</div>
                        <button className={classes.uploadButton}>
                            <CloudUploadIcon/>
                            <div className={classes.uploadButtonText}>Upload</div>
                        </button>
                    </div>
                    <div className={classes.tableWrapper}>
                        <div className={classes.tableTitle}>Report</div>
                        <div className={classes.report}>
                            <div className={classes.reportItem}>
                                <b>56$</b>
                                <div className={classes.reportProp}>Earnings</div>
                            </div>
                            <div className={classes.reportItem}>
                                <b>3261</b>
                                <div className={classes.reportProp}>Total Clicks</div>
                            </div>
                        </div>
                        <div className={classes.usageWrapper}>
                            <div className={classes.usageTextContainer}>
                                <div className={classes.usageText} style={{flex: 1}}>
                                    {usedSize + ' ' + unit}
                                    &nbsp;of 100.0 GB
                                </div>
                                <div className={classes.usageText}>{files.length} files</div>
                            </div>
                            <div className={classes.usageRange}>
                                <div className={classes.usageRangeValue} style={{width: used / (100 * 1024 * 1024 * 1024) * 100 + '%'}}/>
                            </div>
                        </div>
                    </div>
                    <div className={classes.searchBarWrapper}>
                        <input type={"search"} placeholder={'search in files...'}
                               onChange={e => setSearchText(e.target.value)}/>
                        <button className={classes.searchButton}>Search</button>
                    </div>
                    <div className={classes.tableWrapper}>
                        <div className={classes.tableTitle}>Files</div>
                        <table className={classes.table} cellPadding="0" cellSpacing="0">
                            <thead>
                            <td>ID</td>
                            <td>VID</td>
                            <td>Name</td>
                            <td>Short Link</td>
                            <td>Version</td>
                            <td>Size</td>
                            <td>date</td>
                            <td>Delete</td>
                            </thead>
                            <tbody>
                            {
                                files.length > 0 ? (
                                    (searchText.trim() ? files.filter(f => f.display_name.toLowerCase().includes(searchText.toLowerCase().trim())) : files).map(file => (
                                        <tr>
                                            <td>{file.fid}</td>
                                            <td>{file.vid}</td>
                                            <td>{file.display_name}</td>
                                            <td><Link to={`/${file.shortId}`}>{file.shortId}</Link></td>
                                            <td>{file.version}</td>
                                            <td>{file.size}</td>
                                            <td>{new Date(file.upload_date).toLocaleString()}</td>
                                            <td>
                                                <DeleteForeverIcon
                                                    style={{color: 'red', cursor: 'pointer'}}
                                                    onClick={() => handleDeleteFile(file.fid, file.vid)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : <tr>
                                    <td colSpan={100}>No Files Yet...</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className={classes.tableWrapper}>
                        <div className={classes.tableTitle}>Upload</div>
                        <input type={"file"} id={"fileInput"} style={{display: 'none'}} onChange={e => {
                            setFile(e.target.files[0]);
                            console.log(e.target.files[0]);
                        }}/>
                        <div className={classes.fileInput}>
                            <div className={classes.file}>{file?.name}</div>
                            <label className={classes.fileUploadLabel} htmlFor={'fileInput'}>
                                <div className={classes.uploadButtonText}>Select File</div>
                            </label>
                        </div>
                        <div style={{paddingLeft: 20}}>
                            <br/>
                            Version Name:
                            <input
                                type='text'
                                className={classes.fileId}
                                value={version}
                                onChange={e => setVersion(e.target.value)}
                            />
                        </div>
                        <div className={classes.update}>
                            {
                                isUpdate ? (
                                    <IconButton style={{color: 'green'}}
                                                onClick={() => setIsUpdate(isUpdate => !isUpdate)}>
                                        <CheckBoxIcon/>
                                    </IconButton>
                                ) : (
                                    <IconButton style={{color: 'gray'}}
                                                onClick={() => setIsUpdate(isUpdate => !isUpdate)}>
                                        <CheckBoxOutlineBlankIcon/>
                                    </IconButton>
                                )
                            }
                            This is an update for file with id:
                            <input
                                type='text'
                                className={classes.fileId}
                                disabled={!isUpdate}
                                value={updateFor}
                                onChange={e => setUpdateFor(e.target.value)}
                            />
                            <div className={classes.finalUploadButton} onClick={handleUpload}>
                                <CloudUploadIcon/>
                                <div className={classes.uploadButtonText}>Upload</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/*<Footer/>*/}
        </div>
    )
};

export default DashboardPage;
