# ecobee-app
A Node.js-based server for portables to view/update Ecobee digital thermostats remotely

This application server runs in Node.js, serving up an interface for portable devices like smartphones. The intent is to control one or several Ecobee digital thermostats.

![ecobee](https://cloud.githubusercontent.com/assets/15971213/25590647/425dd7ba-2e66-11e7-8793-09f4fdfa5036.jpg)

In order to use and appreciate any of this, it is expected that you 1) own an Ecobee thermostat, 2) have created/registered an account on their Ecobee.com website, 3) have joined their https://www.ecobee.com/developers site by clicking the **Become a Developer button** and 4) have registered one or more Ecobee devices into the same scope. Once done, you would then have access to the Developer tab on their online portal. This is a requirement for generating a necessary **appKey** for the **/config.js** file.

It's good to know what style of Ecobee device that you have. Mine are of the EMS Si variety so my **/config.js** file's **scope** variable indicates "ems". If your Ecobee is more of the consumer style (rather than business-style like mine), it will be necessary to change this scope to match. Their developer website would give you this guidance of course.

## Security
The system is probably a little too secure in that each server->client instance requires a PIN-based credentialing step. The process *per-session* looks like this:
1. If it's not otherwise running, start the server with "npm start" from the program directory
2. Visit the server's address, for example, http://servername:3000 from your smartphone or from the same computer as the server (http://localhost:3000 in this case)
3. Note the PIN request number issued on this screen
4. From any computer, log into the Ecobee.com website with your email/password from an earlier registration you've hopefully done
5. Visit the App tab from their portal and enter in the PIN request
6. Authorize the application to run
7. Back on the web session from step 2 above, select the **Complete Link** link at the bottom of this screen
8. You should see a list of Ecobee thermostats
9. Select one to see its current values and optionally, to control its temperature

## Installation
Here are the instructions for installing the application server.
1. git clone https://github.com/OutsourcedGuru/ecobee-app.git
2. cd ecobee-app
3. npm install
4. Log into your Ecobee.com portal, click the Developer tab, and create a new application

![developer](https://cloud.githubusercontent.com/assets/15971213/25591712/7fce49f0-2e6a-11e7-9840-1a2e28a84326.png)
![portal](https://cloud.githubusercontent.com/assets/15971213/25591492/9e7c3f70-2e69-11e7-8612-a25806702ee9.png)

5. Copy/paste the API key into your local **/config.js** file's **apiKey** value
6. In the EMS (or similar) main tab, navigate to the Thermostats section and note the scope path

![scope](https://cloud.githubusercontent.com/assets/15971213/25591920/627337fc-2e6b-11e7-876e-ebc7c86179a1.png)

7. Update your **/config.js** file's **scopePath** value.
8. npm start
9. From the same or another computer, visit http://servername:3000
10. Note the PIN request number

![getpinscreen](https://cloud.githubusercontent.com/assets/15971213/25597299/cc66b8de-2e82-11e7-9c42-a91c9edc9213.png)

11. Back in the Ecobee portal's EMS (or similar) tab, navigate to **My Apps**, enter this PIN and click the **Install App** button, authorizing this app

![installapp](https://cloud.githubusercontent.com/assets/15971213/25592141/799c3b26-2e6c-11e7-85f1-437f823bed03.png)
![authorize](https://cloud.githubusercontent.com/assets/15971213/25597325/f572920c-2e82-11e7-8803-cfa9d09f192b.png)

12. Back in the application session, click the **Complete Link** button at the bottom of the screen
13. If successful, you should see a collection of thermostats that are registered against your account and in the scope you found earlier on their portal.

![thermostats](https://cloud.githubusercontent.com/assets/15971213/25597360/1d2648e8-2e83-11e7-829e-0b766a597415.png)
![singlemanual](https://cloud.githubusercontent.com/assets/15971213/25597378/3aeb4414-2e83-11e7-95cd-19912ff2bc62.png)

|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|
