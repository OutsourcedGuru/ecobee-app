# ecobee-app
A Node.js-based server for portables to view/update Ecobee digital thermostats remotely

This application server runs in Node.js, serving up an interface for portable devices like smartphones. The intent is to control one or several Ecobee digital thermostats.

![ecobee](https://cloud.githubusercontent.com/assets/15971213/25590647/425dd7ba-2e66-11e7-8793-09f4fdfa5036.jpg)

In order to use and apprecicate any of this, it is expected that you 1) own an Ecobee thermostat, 2) have created/registered an account on their Ecobee.com website and 3) have joined their developer program. Once done, you would then have access to the Developer tab on their online portal. This is a requirement for generating a necessary **appKey** for the **/config** file.

It's good to know what style of Ecobee device that you have. Mine are of the EMS Si variety so my **/config** file's **scope** variable indicates "ems". If your Ecobee is more of the consumer style (rather than business-style like mine), it will be necessary to change this scope to match. Their developer website would give you this guidance of course.
