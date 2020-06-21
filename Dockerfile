FROM node:10.15.3

WORKDIR /user/src/express-ordering

COPY ./ ./

RUN npm install

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && npm run dev