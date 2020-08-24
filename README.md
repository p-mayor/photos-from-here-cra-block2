# Photos from Here Demo

This is a demo project showing how to use the built-in fetch method to connect to the flickr API and display some photos for the user. The user is also able to input their own search term and location so they can get pictures from flickr of whatever they want, from whatever location they want.

See `src/flickrService.js` for the flickr fetch request.

See `src/googleMapsService.js` for the google maps API request.

See `src/Display.jsx` for the react component which handles displaying the images and getting input from the user.

- [Flickr API Docs](https://www.flickr.com/services/api/)
- [Google's Geocoding Docs](https://developers.google.com/maps/documentation/geocoding/overview)

Note: it is a bad practice to store API keys in your client code. Instead, you should use a `.env` file. For more info, see [this guide](https://www.pluralsight.com/guides/hiding-secret-keys-in-create-react-app). Even using this method, your API key will still be made public when your app is compiled and deployed via github pages, it will just be slightly harder to find. A better practice would be to store the API keys on your backend server so that the client never has access to them. This is easy to set up when deploying via [heroku](https://blog.heroku.com/deploying-react-with-zero-configuration)

# Initial CRA README

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
