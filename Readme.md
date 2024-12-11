# User Data API with Express

This project demonstrates how to create a RESTful API using Express.js. The API provides mock data of several users in JSON format and allows clients to perform CRUD (Create, Read, Update, Delete) operations. This project was created as part of learning how to build APIs in Express.

## Features

- Provides mock user data in JSON format.
- Supports various HTTP methods like GET, POST, PATCH, and DELETE.
- Logs every API request to a `logs.txt` file.
- Includes endpoints for retrieving data in JSON and HTML formats.

## Project Setup

### Prerequisites

- Node.js (version 14 or later recommended)
- npm (Node Package Manager)
- express
### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. The server will start at `http://localhost:8000`.

## API Endpoints

### Home Endpoint
- **URL**: `/`
- **Method**: GET
- **Description**: Provides information about available endpoints in the API.

### JSON Data Endpoints
1. **Get all users**
   - **URL**: `/api/users`
   - **Method**: GET
   - **Description**: Returns all users in JSON format.

2. **Get a specific user**
   - **URL**: `/api/users/:id`
   - **Method**: GET
   - **Description**: Returns a specific user's data based on their ID.
   - **Example**: `/api/users/5`

### HTML Data Endpoints
1. **Get all users (HTML)**
   - **URL**: `/users`
   - **Method**: GET
   - **Description**: Displays all users in an HTML list.

2. **Get a specific user (HTML)**
   - **URL**: `/users/:id`
   - **Method**: GET
   - **Description**: Displays a specific user's data in an HTML format.
   - **Example**: `/users/5`

### Create a User
- **URL**: `/users`
- **Method**: POST
- **Description**: Creates a new user with the provided data (using form data or `x-www-form-urlencoded`).
- **Required Fields**:
  - `fname`: First name
  - `lname`: Last name
  - `email`: Email
  - `gender`: Gender

### Update a User
- **URL**: `/users`
- **Method**: PATCH
- **Description**: Updates an existing user's data.
- **Required Fields**:
  - `id`: User ID to update
  - Other fields (e.g., `fname`, `lname`, `email`, `gender`) to update

### Delete a User
- **URL**: `/users`
- **Method**: DELETE
- **Description**: Deletes the specified user's data.
- **Required Fields**:
  - `id`: User ID to delete

## Logging

Each API request is logged to `logs.txt` in the following format:
```
<Timestamp>:: <HTTP Method> :: <Path>
```
This is implemented using middleware.

## Example Requests

### Get All Users (JSON)
```bash
curl http://localhost:8000/api/users
```

### Get Specific User (HTML)
```bash
curl http://localhost:8000/users/5
```

### Create a New User
```bash
curl -X POST -d "fname=John&lname=Doe&email=john.doe@example.com&gender=Male" http://localhost:8000/users
```

### Update an Existing User
```bash
curl -X PATCH -d "id=5&fname=Jane" http://localhost:8000/users
```

### Delete a User
```bash
curl -X DELETE -d "id=5" http://localhost:8000/users
```

## Project Structure
```
|-- index.js         # Main server file
|-- MOCK_DATA.json   # Mock user data
|-- logs.txt         # Request logs
|-- package.json     # Project metadata and dependencies
```

## Future Enhancements

- Add authentication to secure endpoints.
- Implement pagination for large datasets.
- Add validation for incoming requests.

## License

This project is for learning purposes and does not have an associated license.

