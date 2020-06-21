FROM node:10.15.3

WORKDIR /user/src/express-ordering

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]