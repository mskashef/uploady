# Uploady

An upload center with good functionality! 

# Deployment/Start Guide
To Start Development:
1. Install `Node.js` on your system.
2. In the project directory, run the following command in the terminal: `npm install`
3. Edit `package.json` and change the `proxy` value to your REST API url
4. Run `npm start` to start the project.

Or to build and run the project (for deployment):
1. Do the instructions from 1 to 3 in previous section (development start).
2. Run `npm run build` in the terminal.
3. Run `serve -s build` to start the built project on port 3000;

## Implemented Functionalities
1. JWT User Authentication
2. File Upload
3. File Download
4. Can have different versions of a file
5. Delete File
6. Image Crop
7. Image Resize
8. Monitoring
9. Download Partial Content using `Range` Header
10. URL Shortener


# Screenshots
#### HomePage
![HomePage](/screenshots/Home.png)
#### Dashboard
![Dashboard](/screenshots/Dashboard.png)
#### DownloadPage
![DownloadPage](/screenshots/Download.png)
#### Crop Image
![ImageCrop](/screenshots/Crop.png)
#### Resize Image
![ImageResize](/screenshots/Resize.png)

