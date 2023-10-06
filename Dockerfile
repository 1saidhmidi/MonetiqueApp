FROM 14.17.3

#ENVIRONMENT

ENV NODE_ENV=production


# Create app directory
WORKDIR /Users/laktit/Desktop/MonetiqueApp

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 4200


CMD [ "npm", "start" ]
