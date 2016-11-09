#webpack -p

datestr=$(date +%Y%m%d%H%M)

mkdir logs
nohup sudo npm run start > logs/$datestr.log &