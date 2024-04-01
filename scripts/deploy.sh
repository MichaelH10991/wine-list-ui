#!/bin/bash
. .env.prod

timestamp=$(date)
export REACT_APP_TIMESTAMP=$timestamp
export REACT_APP_WINE_LIST_API_HOST=$REACT_APP_WINE_LIST_API_HOST

BUCKET="s3://wine-list-ui/"

 build the app
npm install
npm run build

# deploy
aws --profile mike s3 cp build/ $BUCKET --recursive