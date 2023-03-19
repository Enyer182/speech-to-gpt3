# Description

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a chat application that utilizes the OpenAI API for natural language processing to chat with users. What makes this app unique is its real-time speech recognition feature that enables users to speak instead of type, and its image generation feature that allows users to generate images based on their input. The app processes the input and sends it to the OpenAI API, which generates an image based on the text. This feature can be helpful

## Installation

To install the application, follow these steps:

    Clone the repository to your local machine.
    Set the environment variable for your OpenAI API key. You can do this by creating a .env file at the root of the project       
    REACT_APP_OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
    Install dependencies by running npm install.
    Start the development server by running npm start.

### `Note`

npm install --legacy-peer-deps. Please note that this command may be required because the react-speech-kit package has some installation issues.
I'll be working to find alternatives for this library.
Please note that real-time speech recognition may not work in Firefox, I'm working on finding a solution that works across all browsers.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `Usage`

Once the application is running, you can use it to chat with the OpenAI API. Simply type your message in the chat footer and hit enter to send it. The app will display the chat messages in the chat body, with the most recent message at the bottom.

To generate an image based on your input, type "generate an image: " followed by your desired prompt. The app will then send the prompt to the OpenAI API, which will generate an image based on the text. The image will be displayed in the chat body along with your message.

### `Screenshot`
![image](https://user-images.githubusercontent.com/42762798/226215544-70b16c90-d5c1-4c13-b218-eab84a922d03.png)


### `Image generation`

![image](https://user-images.githubusercontent.com/42762798/226215987-b6bf0784-7dba-4234-abfb-5652d03b43db.png)


### `Build Instructions`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

