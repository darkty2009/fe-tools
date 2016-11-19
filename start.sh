webpack -p

datestr=$(date +%Y%m%d%H%M)
mkdir logs

NODE_ENV=production forever start -l logs/$datestr.log -e logs/$datestr.error -w -a server/index