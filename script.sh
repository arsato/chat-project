#!/bin/bash
set -ex

cd server/

npm install

cd ../client/

npm install

npm start