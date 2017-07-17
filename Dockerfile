FROM keymetrics/pm2-docker-alpine:latest

# You can insert here your custom docker commands if you need it.

CMD [ "pm2-docker", "--raw", "start", "pm2.json" ]