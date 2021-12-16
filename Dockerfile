FROM node:14-alpine as build-stage

WORKDIR /app

# Arguments
ARG API_ADDR

# Environment variables 
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_API_ADDRESS=${API_ADDR}

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

#####################

FROM fitiavana07/nginx-react

# Copy built files
COPY --from=build-stage /app/build /usr/share/nginx/html

# 80 for HTTP
EXPOSE 80

# Run nginx
CMD nginx -g 'daemon off;'