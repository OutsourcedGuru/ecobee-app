# ecobee-app
A Node.js-based server for portables to view/update Ecobee digital thermostats remotely

This application server runs in Node.js, serving up an interface for portable devices like smartphones. The intent is to control one or several Ecobee digital thermostats.

![ecobee](https://cloud.githubusercontent.com/assets/15971213/25590647/425dd7ba-2e66-11e7-8793-09f4fdfa5036.jpg)

In order to use and apprecicate any of this, it is expected that you 1) own an Ecobee thermostat, 2) have created/registered an account on their Ecobee.com website and 3) have joined their [https://www.ecobee.com/developers/](developer program) by clicking the **Become a Developer button**. Once done, you would then have access to the Developer tab on their online portal. This is a requirement for generating a necessary **appKey** for the **/config** file.

It's good to know what style of Ecobee device that you have. Mine are of the EMS Si variety so my **/config** file's **scope** variable indicates "ems". If your Ecobee is more of the consumer style (rather than business-style like mine), it will be necessary to change this scope to match. Their developer website would give you this guidance of course.

## Security
The system is probably a little too secure in that each server->client instance requires a PIN-based credentialing step. The process *per-session* looks like this:
1. If it's not otherwise running, start the server with "npm start" from the program directory
2. Visit the server's address, for example, http://computername from your smartphone or from the same computer as the server (http://localhost in this case)
3. Note the PIN request number issued on this screen
4. From any computer, log into the Ecobee.com website with your email/password from an earlier registration you've hopefully done
5. Visit the App tab from their portal and enter in the PIN request
6. Authorize the application to run
7. Back on the web session from step 2 above, select the Connect link at the bottom of this screen
8. You should see a list of Ecobee thermostats
9. Select one to see its current values and optionally, to control its temperature

## Installation
Here are the instructions for installing the application server.
1. git clone https://github.com/OutsourcedGuru/ecobee-app
2. cd ecobee-app
3. npm install
4. Log into your Ecobee.com portal, click the Developer tab, and create a new application

![developer](https://cloud.githubusercontent.com/assets/15971213/25591712/7fce49f0-2e6a-11e7-9840-1a2e28a84326.png)
![portal](https://cloud.githubusercontent.com/assets/15971213/25591492/9e7c3f70-2e69-11e7-8612-a25806702ee9.png)

5. Copy/paste the API key into your local **/config** file's **apiKey** value
