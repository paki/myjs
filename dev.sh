#!/usr/bin/env bash

dir=$(cd $(dirname $0); pwd) &&
cd $dir


node index.js &

cd ./ui
gulp watch &

OK=1
while [ $OK -ne 0 ]; do
    sleep 1
    curl -s "http://127.0.0.1:3000/" > /dev/null
    OK=$?
done
open -aSafari "http://127.0.0.1:3000/"

trap "kill -TERM -$$" SIGINT
wait
