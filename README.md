# PocketCare S - Web Portal (Front End)

<p align="center">
<img src="https://github.com/PocketCareS/PocketCareS-Android/blob/development/assets/logo.png" width="300">
</p>

**Call for code submission for COVID-19 track.**

PocketCare S is a comprehensive smartphone-based solution for monitoring close encounters. It is a bluetooth low energy (BLE) based solution which enables smartphones to send and receive anonymous beacon signals. It checks the distance between a smartphone and another beacon (or smartphone running PocketCare S) to see if they are close to each other (less than 2m). If so, the smartphone records the duration of such a close encounter with another beacon. 

PocketCare S is designed to report social distance information without collecting or revealing any personally identifiable information about any specific individual.


## Contents 
1. [Demo Video](#demo-video) 
2. [The Architecture](#the-architecture)
3. [Getting Started](#getting-started)
4. [How does PocketCare S Work?](#how-does-pocketcare-s-work)
5. [Built With](#built-with)
6. [Project RoadMap](#project-roadmap)
7. [Further Readings](#further-readings)
8. [License](#license)
9. [Acknowledgments](#acknowledgements)

## Demo Video 

[![Demo](https://github.com/PocketCareS/PocketCareS-iOS/blob/master/assets/Video%20Thumbnail.png)](https://youtu.be/JUTQIcdgXwc "PocketCare S Demo")
 
 
## The Architecture

![Architecture](https://github.com/PocketCareS/PocketCareS-Android/blob/development/assets/PocketCareS_Design_Simplified.png)

## Getting Started  

### Prerequisites for installation on local machine

Before you begin, make sure you satisfy the following requirements in order to run the server on your local system:

1. NPM (node package manager) which can be installed from [here](https://nodejs.org/en/download/)
   
### Running the application on local system
1. Clone the repository
2. Open the project on Visual Studio Code
3. Search for file constants.js
4. Update the Server API URL from [here]() and paste inplace of "YOUR_HOSTED_SERVER_API_URL"
   export const baseUrl =
  "YOUR_HOSTED_SERVER_API_URL";
5. Inside the project directory open the terminal and run the following commands in order:
     
     ```npm install```
    
     ```npm start```

### Steps for Openshift Deployment
1. Install the OC cli on your system using the following [link](https://docs.openshift.com/container-platform/4.2/cli_reference/openshift_cli/getting-started-cli.html)
2. Once installed, open the Openshift console
3. Copy the Login command as shown in the figure below ![](assets/2.png)
4. Copy and paste the login command in terminal at the folder where the react application source code resides.
5. Inside the terminal run the following commands in order:
     
     ```npm install```
    
     ```npx nodeshift --strictSSL=false --dockerImage=nodeshift/ubi8-s2i-web-app --imageTag=10.x --build.env YARN\_ENABLED=true --expose```
6. This will install the react application on Openshift and public url will be provided in terminal logs.

### Web Portal - Screenshots
[Click here](https://github.com/PocketCareS/webportal/blob/master/WorkFlow.md#web-portal---screenshots) to view the screenshots.

#### Steps to perform Contact Tracing.
1. Get the patient's App-Client ID following the steps as mentioned [here](https://github.com/PocketCareS/PocketCareS-Android#getting-app-client-id)
2. Copy and paste the ID in the text box with the label "Enter COVID-19 infected patient's App-Client ID for tracing".
3. On Start tracing the web portal will fetch all the APP-Client ID which have come in contact with the infected user within 14 days and had atleast 5 minutes of close encounter.
4. The close encountered App-Client ID with their respective encouter details will be displayed as shown in **Contact Tracing Screenshot**
5. The information displayed is the brief information based on which tracer can make decision to notify the respective User.
6. On **Notify** push notification will be sent using IBM's Push notification service with the proper guidelines.
7. Tracer can also export the detailed information of the encountered user by clicking on the **Export Data** in top right corner of table. 


## How does PocketCare S Work?

### Key Highlights (Mobile Application)

1. PocketCare S uses **Bluetooth Low Energy (BLE)** to discover and compute the duration **close encounters**. 
2. A **close encounter** session starts when two people are within **2 meters** for at least **5 minutes**. 
3. **Close encounter** data will be displayed in the mobile application after a close encounter session starts. 
4. Users are **notified immediately** if a close encounter session exceeds **10 minutes**.
5. The **virtual bluetooth name** changes **every hour** to ensure **user privacy**. 
6. Data stored in the mobile application is **anonymized** (contains no Personally Identifiable Information) and consists of **daily health report** and **close encounters** for a **maximum period of 14 days.**
7. Data upload to the server takes place **every hour**.

### Detailed Architecture 

![Working](https://github.com/PocketCareS/PocketCareS-Android/blob/development/assets/PocketCareS_Design_Technical.png)


### Security and Privacy 

PocketCare S cares values the security and privacy of its users. The app does not collect any private information about an individual person.  All the data collected is anonymous and will not reveal any personally identifiable information. An Infographic with this information can be found [here](https://engineering.buffalo.edu/content/dam/engineering/computer-science-engineering/images/pocketcare/PocketCareS.pdf).


**For a more detailed description, refer to the [additional information](#additional-information) section.**


## Built With

### iOS
- [BeaconMonitor](https://github.com/sebk/BeaconMonitor) - Used for close contact detection
- [Charts](https://github.com/danielgindi/Charts) - Used to visualize data
- [CryptoSwift](https://github.com/krzyzanowskim/CryptoSwift) - Used for encryption

### Android 
- [Android Beacon Library](https://altbeacon.github.io/android-beacon-library/) - Used for close contact detection
- [High Charts](https://www.highcharts.com/) - Used to visualize data
- [IBM Push Notifications](https://www.ibm.com/cloud/push-notifications) - Push Notification for Exposure 

### Server 
- [Red Hat OpenShift on IBM Cloud](https://www.ibm.com/cloud/openshift)
  - Server using [OpenJDK 8](https://www.ibm.com/cloud/support-for-runtimes)
  - Database using [MongoDB](https://www.ibm.com/cloud/databases-for-mongodb)
  - Web Portal hosted using [Node JS Server](https://developer.ibm.com/node/cloud/)
- [React](https://reactjs.org/) - Used to build the web portal
- [High Charts](https://www.highcharts.com/) - Used to visualize data
- [Spring Boot](https://spring.io/projects/spring-boot) - Framework for the Server

## Project Road Map 

![Road Map](https://github.com/PocketCareS/PocketCareS-Android/blob/development/assets/PocketCare_S_Road_Map.png)

## Additional Information 

You can read more about PocketCare S on our [website](https://engineering.buffalo.edu/computer-science-engineering/pocketcares.html). We also have a [White Paper](https://docs.google.com/document/d/e/2PACX-1vT6UqA3HByzG5Di576gmz-JWzgKOFx5KLYGgJMpxcmWkOXYJ_vUFz2h1w2LnDNWI4y-xnyKhPi_s70p/pub) which can be accessed here.  

An in-depth video of the PocketCare S Mobile Application can be found [here](https://youtu.be/qvDil5-OTio).

PocketCare S is also available on [Google Play](https://play.google.com/store/apps/details?id=com.ub.pocketcares) and to the University at Buffalo (UB) community using the [Apple Developer Enterprise Program](https://engineering.buffalo.edu/computer-science-engineering/pocketcares/pocketcares-ios.html).

## License 

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to all who helped bring the project to fruition:

Sourav Samanta, Rishabh Joshi, Jeetendra Gan, Shanelle Ileto, Aritra Paul, Dr. Peter Winkelstein, Dr. Matthew R. Bonner, Kevin Wang, Chen Yuan, Dheeraj Bhatia, Latheeshwarraj Mohanraj, Dr. Wen Dong, Dr. Tong Guan, Dr. Marina Blanton, Sasha Shapiro, Stephen Fung, David G. Young

And our deepest gratitude for the support of **University at Buffalo**.
