#webpack -p

datestr=$(date +%Y%m%d%H%M)
path=$(pwd)
mkdir logs

mv .log $datestr.log
mv .error $datestr.error

forever stopall
NODE_ENV=production forever start -l $path/logs/.log -e $path/logs/.error -a server/index.js
