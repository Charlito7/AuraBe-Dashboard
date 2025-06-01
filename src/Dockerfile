# Use an official Node.js runtime as a base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install --save-dev @types/node

# Copy the rest of the application code
COPY . .


# Build the Vue.js app
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the built files to the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional, for security)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]