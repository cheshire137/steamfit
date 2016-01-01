# SteamFit

Correlate your Steam activity with your Fitbit activity.

## How to Develop

Register a [Fitbit application](https://dev.fitbit.com/apps/new). Set your
'OAuth 2.0 Application Type' to 'Client'. Set your 'Callback URL' to
`http://localhost:3000/auth`. 'Default Access Type' should be 'Read-Only'.

Get a [Steam Web API Key](http://steamcommunity.com/dev/apikey).

    cp src/env.sh.example src/env.sh

Customize src/env.sh.

    npm install
    npm start

Visit [localhost:3000](http://localhost:3000/).

## How to Deploy to Heroku

1. [Add an app on heroku.com.](https://dashboard.heroku.com/new)
1. `heroku git:remote -a your_heroku_app_name`
1. `heroku config:set STEAM_API_KEY="your Steam Web API Key"`
1. `heroku config:set FITBIT_CLIENT_ID="your Fitbit OAuth 2.0 client ID"`
