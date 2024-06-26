FROM node:20-alpine
WORKDIR /usr/src/app
COPY dist/index.js .
EXPOSE 3000
CMD ["node", "index.js"].
