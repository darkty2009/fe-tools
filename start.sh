#webpack -p

datestr=$(date +%Y%m%d%H%M)
path=$(pwd)
mkdir logs

forever stopall
NODE_ENV=production forever start -l $path/logs/$datestr.log -e $path/logs/$datestr.error -a server/index.js