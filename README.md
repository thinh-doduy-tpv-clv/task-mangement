# Task Management

Task Management! This application provides a comprehensive solution for managing tasks efficiently. It consists of both a frontend and a backend, each with specific functionalities. Please follow the instructions below to set up and run the project.

## Features
- Authentication Module: Have Sign in/Sign out/Register/Forgot Password features
- Task Module: have basic CRUD features
  - The task should have 4 statuses: TO DO, IN PROGRESS, COMPLETED, ARCHIVED
- Need to validate input data, validate Biz logic (check duplicate items, cannot delete archived task)
- Handle exception to:
  - Return 401 status code if not authorized
  - Return 400 bad request status code for validation
  - Return 500 internal exceptions when having an unhandled error
- Swagger Module

## Tech stacks:
### Frontend
- Uses NextJS
- Call the server by using GraphQL
- React Query + React Mutation
- Backend for Frontend:
- NestJS
- Receives GraphQL request
- Request Backend services by using gRPC
### Backend services:
- NestJS
- Applies gRPC
- All projects should write unit tests, E2E test

## Guides
### API Documentation for Graphql
- npm i -g @magidoc/cli@latest && magidoc generate
- magidoc preview

### Deploy to kubernetes (using minikube)
1. Setup kubectl
URL: https://kubernetes.io/docs/tasks/tools/
Windows: 
- Navigate to any directory and run:
```sh
curl.exe -LO "https://dl.k8s.io/release/v1.29.0/bin/windows/amd64/kubectl.exe"
```
Then, add kubectl cli to PATH ENV

2. Setup minikube
Download the installer for minikube: 
```sh
https://storage.googleapis.com/minikube/releases/latest/minikube-installer.exe
```

3. Create new cluster
```sh
minikube start
```

Optional: Run this command whenever need to set default context
```sh
# (Optional) use default context
docker context use default

# Verify cluster
kubectl cluster-info
```

- Check cluster status
```sh
kubectl cluster-info
```

4. Deploy services and database to kubernetes
```sh
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f auth-deployment.yaml
kubectl apply -f auth-service.yaml
```

5. Some useful minikube commands
Check IP cluster: minikube ip
Open dashboard: minikube dashboard

6. Example output

## Contributor / Members
```
Name          | Role
------------- | -------------
Mr. Kai       | Front Developer
Mr. Max       | Backend Developer
Mr. Sheng     | Backend Developer
Mr. Chou      | QC
```
## License
[MIT](https://choosealicense.com/licenses/mit/)