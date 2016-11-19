#webpack -p

datestr=$(date +%Y%m%d%H%M)
mkdir logs

forever stopall
NODE_ENV=production forever start -l ./logs/$datestr.log -e ./logs/$datestr.error -a server/index.js