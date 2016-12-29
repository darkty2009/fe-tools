webpack -p

datestr=$(date +%Y%m%d%H%M)
path=$(pwd)
mkdir logs

mv ./logs/access.log ./logs/access_$datestr.log
mv ./logs/error.log ./logs/error_$datestr.log

forever stopall
NODE_ENV=production forever start -l $path/logs/access.log -e $path/logs/error.log -a server/index.js
