# Timezone App - Tahiti Numérique

To build and run the services:
1. Make sure Docker and Docker Compose are installed
2. Open a terminal in the root directory
3. Run:
``` bash
docker-compose up -- build
```
This will:
- Build both frontend and backend Docker images
- Create a Docker network for service communication
- Start both services
- Make the frontend available on http://localhost
- Make the backend available on http://localhost:8080
The frontend will be served through Nginx on port 80, and it will proxy API requests to the backend service. The backend service runs on port 8080 inside the Docker network.