webpack -p

datestr=$(date +%Y%m%d%H%M)
mkdir logs
nohup npm run start > logs/$datestr.log &