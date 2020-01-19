# RESTful-API-in-Node.js
Different RESTful APIs in Node js like User authentication, authorisation, file uploading and many more...

# How to setup?
Open Nodemon.json file and set your Mongo Atlas db key and also the JWT_KEY key for Token generation..

```
{
    "env":{
          "MONGO_ATLAS_PW": "YOUR_KEY",
          "JWT_KEY": "YOUR_KEY"
    } 
}
```

Then run below command to get all the packages
```
npm install .
```

# How to run?

* Open terminal in project directory and run below command:
```
npm start
```
* Test the APIs

  Here we have total 4 end points:
   1. http://localhost:3000/upload
   
      It's require a post method. we can uload multiple file through it. This API will upload file to '/uploads' folder (you       can change it) and also populate data to Mongo Atlas.
      
   2. http://localhost:3000/user/login
   
      This API let you sigin to system and also provide to you a token for authorization with server to use next two APIs.
      
   3. http://localhost:3000/user/naerby
   
      So, Once you are login then you can check the nearby user. but, you must be sure to login first.
      
   2. http://localhost:3000/user/finder?latitude=YOUR_VALUE&longitude=YOUR_VALUE
      
      This API is for finding someone at particular geo-location. So, use latitude and longitude and find your people with         this API. One thing, It's also not public so you need to login...
 
 
 # Demo
 
 So, I have also a Demo for you. I am using [Postman](https://www.getpostman.com/) for testing my API. 
 
 
   [![](https://github.com/kumar-kunal/RESTful-API-in-Node.js/blob/master/media/API_DEMO.gif)](https://youtu.be/JxT_jBG0acs)
