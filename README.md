# Real-Assist_Skill_Assestment
Build an app that integrates OPEN AI API and acts as an assistant for RealAssist.<br>
 (Please note: This app does not track your token count, if your token count exceeds the 4096 limit the app will not work)

##Preview
![REALASSISTHOME](https://user-images.githubusercontent.com/99637335/228670613-c1958254-d898-4ea2-8544-824ade971517.JPG)

![REAlassist_chat](https://user-images.githubusercontent.com/99637335/228670840-cdfd2ebd-4f95-49ac-ab3c-c3f45d411847.JPG)

## Getting started
1. Clone or download the repo.
2. Install all dependencies on backend and frontend folder. ``cd api/ && npm install``, ``cd client/ && npm install``
3. Create an .env file based on the .env.example in the backend server (/api).
4. Set env variables, ``URI`` for Mongo DB Atlas needed, ``OPENAI_KEY`` for OPEN AI API, keep ``PORT`` 3005.  
5. Start both servers ``cd api/ && npm start``, ``cd client/ && npm start``
6. Everything should be up and running!

## Technologies Used
#### Front End: -React, -JavaScript, -CSS3
#### Back End: -Express.JS, -Node.JS, -MongoDB, -Mongoose, -Cors -OpenAI -Axios
