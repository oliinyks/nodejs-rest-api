FROM node

WORKDIR /app

COPY . .

RUN npm i

EXPOSE 3000

CMD ['nade', 'bin/server']