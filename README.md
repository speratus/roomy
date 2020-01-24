# Roomy
Roomy is an app to help people who want roommates connect to people looking for places to room.

## Features

* Users can sign in as either a Room Seeker or a Room Host.
* Room Seekers can browse listings and apply to Hosts they like.
* Hosts can review applications and accept or reject applicants.
* Room Seekers can See applications they've submitted and delete them if they choose.
* Users can edit their information including uploading pictures of themselves
* Room Hosts can upload pictures of their house or appartment.

## Installation
There are two parts to installing Roomy.

```
git clone https://github.com/speratus/roomy
```
Once you've navigated to the installation, you have to install the backend and frontend separately.

### Backend
Roomy uses Ruby on Rails as its backend. Once you have Rails installed all you have to do is run the command
```
bundle install
```
This should install all the required gems. Then run
```
rake db:migrate
```
to migrate the database and create the tables for the models. If you want some seed data, run the command
```
rake db:seed
```
to get the seeds installed.

You should be good to go! Just run `rails server` and your backend should be running

### Frontend
To install the frontend, you need to have npm installed. Once you have npm installed, simply navigate to the frontend folder (`roomy/roomy-frontend`) and run
```
npm install
```
to install the required node packages.

## Running
Once you have your backend running, you should be able to simply open `index.html` in `roomy/roomy-frontend` and you should be good to go. At the moment, Roomy is only configured to be accessed locally, so you may run into problems if you attempt to connect to it from an external machine.
