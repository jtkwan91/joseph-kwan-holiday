# joseph-kwan-holiday

For this hackathon I made a React app that shows the top 10 cooperative games on Steam.

The Steam API is very limited and does not provide ability to search by criteria. The only capabilities offered were a complete list of over 100,000 game titles and game details by game ID. Instead of fetching from a traditional API end point, we created an Express server that scrapes content from Steam's webpage using a programmable headless browser.

Another issue we encountered was the Steam API does not support Cross-Origin requests, so querying directly within the React app was not an option. The Express server mitigates both issues.

To run this project, you must first start the Steam Search Server,

```sh
$ npm run server
```

You will see the following message:

```none
Steam Search Server listening at http://localhost:3001
```

Then start the React app normally,

```sh
$ npm start
```

And access the app by visiting

```none
http://localhost:3000
```

