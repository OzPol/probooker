# Use the official Node.js image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
# RUN npm install --only=production
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the Next.js app
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "start" ]

# Inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 3000
