#webpack -p

datestr=$(date +%Y%m%d%H%M)
path=$(pwd)
mkdir logs

mv .log access_$datestr.log
mv .error error_$datestr.log

forever stopall
NODE_ENV=production forever start -l $path/logs/access.log -e $path/logs/error.log -a server/index.js
