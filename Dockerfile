FROM node:20-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY dist/index.js .
EXPOSE 3000
CMD ["node", "index.js"].
