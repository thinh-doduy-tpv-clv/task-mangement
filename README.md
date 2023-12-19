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