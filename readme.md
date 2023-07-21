# University Management System (UMS) - API Documentation

The University Management System (UMS) is a robust and modular web application developed using Node.js, Express, MongoDB, and TypeScript. It follows a microservice architecture, providing separate modules for user management, academic management, administrative tasks, and authentication. UMS supports multiple roles, including admin, faculty, and student, with JWT-based authentication and authorization to ensure secure access to various functionalities.

## API Endpoints

### User Module

#### Create a Student (POST)

Endpoint: `/users/create-student`

Description: This endpoint allows administrators to create a new student user in the system.

Request Body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "role": "student"
}
```

Response:

```json
{
  "message": "Student user created successfully!",
  "user": {
    "_id": "6495edaa2bb9d39f9de972f0",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "student"
  }
}
```

#### Create a Faculty (POST)

Endpoint: `/users/create-faculty`

Description: This endpoint enables administrators to create a new faculty member in the system.

Request Body:

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "role": "faculty"
}
```

Response:

```json
{
  "message": "Faculty user created successfully!",
  "user": {
    "_id": "6496edaa2bb9d39f9de972f1",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "role": "faculty"
  }
}
```

#### Create an Admin (POST)

Endpoint: `/users/create-admin`

Description: This endpoint allows super-administrators to create a new admin user in the system.

Request Body:

```json
{
  "firstName": "Super",
  "lastName": "Admin",
  "email": "super.admin@example.com",
  "password": "securepassword",
  "role": "admin"
}
```

Response:

```json
{
  "message": "Admin user created successfully!",
  "user": {
    "_id": "6497edaa2bb9d39f9de972f2",
    "firstName": "Super",
    "lastName": "Admin",
    "email": "super.admin@example.com",
    "role": "admin"
  }
}
```

### Academic Semester Module

#### Create an Academic Semester (POST)

Endpoint: `/academic-semester/create-academic-semester`

Description: This endpoint allows administrators to create a new academic semester.

Request Body:

```json
{
  "semesterName": "Fall 2023",
  "code": "2023-FALL",
  "startDate": "2023-08-15",
  "endDate": "2023-12-15"
}
```

Response:

```json
{
  "message": "Academic semester created successfully!",
  "academicSemester": {
    "_id": "648d96r554ca0d6ea702e0fa",
    "semesterName": "Fall 2023",
    "code": "2023-FALL",
    "startDate": "2023-08-15",
    "endDate": "2023-12-15"
  }
}
```

#### List Academic Semesters (GET)

Endpoint: `/academic-semester/`

Description: This endpoint retrieves a paginated list of academic semesters.

Parameters:

- `page` (optional): Page number for pagination (default: 1).
- `limit` (optional): Number of items per page (default: 10).
- `sortBy` (optional): Field to sort the results (e.g., `code`, `startDate`, `endDate`).
- `sortOrder` (optional): Sorting order (`asc` for ascending, `desc` for descending).

Response:

```json
{
  "totalPages": 3,
  "currentPage": 1,
  "totalItems": 26,
  "academicSemesters": [
    {
      "_id": "648d96r554ca0d6ea702e0fa",
      "semesterName": "Fall 2023",
      "code": "2023-FALL",
      "startDate": "2023-08-15",
      "endDate": "2023-12-15"
    }
    // Other academic semesters...
  ]
}
```

#### Partial Search for Academic Semesters (GET)

Endpoint: `/academic-semester/`

Description: This endpoint allows searching for academic semesters using a partial search term.

Parameters:

- `searchTerm`: Partial term to search for in the semester name or code.

Response:

```json
{
  "academicSemesters": [
    {
      "_id": "648d96r554ca0d6ea702e0fa",
      "semesterName": "Fall 2023",
      "code": "2023-FALL",
      "startDate": "2023-08-15",
      "endDate": "2023-12-15"
    }
    // Other matching academic semesters...
  ]
}
```

#### Exact Search for Academic Semesters (GET)

Endpoint: `/academic-semester/`

Description: This endpoint allows searching for an academic semester using an exact code.

Parameters:

- `code`: Exact code to search for in the academic semester.

Response:

```json
{
  "academicSemester": {
    "_id": "648d96r554ca0d6ea702e0fa",
    "semesterName": "Fall 2023",
    "code": "2023-FALL",
    "startDate": "2023-08-15",
    "endDate": "2023-12-15"
  }
}
```

#### Get Academic Semester by ID (GET)

Endpoint: `/academic-semester/:semesterId`

Description: This endpoint retrieves an academic semester by its ID.

Response:

```json
{
  "_id": "648d96r554ca0d6ea702e0fa",
  "semesterName": "Fall 2023",
  "code": "2023-FALL",
  "startDate": "2023-08-15",
  "endDate": "2023-12-15"
}
```

#### Update Academic Semester by ID (PATCH)

Endpoint: `/academic-semester/:semesterId`

Description: This endpoint allows updating an academic semester's information by its ID.

Request Body (Example for updating the semester name):

```json
{
  "semesterName": "Spring 2024"
}
```

Response:

```json
{
  "message": "Academic semester updated successfully!",
  "academicSemester": {
    "_id": "648d96r554ca0d6ea702e0fa",
    "semesterName": "Spring 2024",
    "code": "2023-FALL",
    "startDate": "2023-08-15",
    "endDate": "2023-12

-15"
  }
}
```

#### Delete Academic Semester by ID (DELETE)

Endpoint: `/academic-semester/:semesterId`

Description: This endpoint allows deleting an academic semester by its ID.

Response:

```json
{
  "message": "Academic semester deleted successfully!",
  "deletedAcademicSemester": {
    "_id": "648d96r554ca0d6ea702e0fa",
    "semesterName": "Fall 2023",
    "code": "2023-FALL",
    "startDate": "2023-08-15",
    "endDate": "2023-12-15"
  }
}
```

### Faculty Module

#### Create a Faculty (POST)

Endpoint: `/faculty/create-faculty`

Description: This endpoint enables administrators to create a new faculty member.

Request Body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "contactNo": "0123456789",
  "department": "Computer Science",
  "designation": "Assistant Professor"
}
```

Response:

```json
{
  "message": "Faculty member created successfully!",
  "faculty": {
    "_id": "F-00000001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "contactNo": "0123456789",
    "department": "Computer Science",
    "designation": "Assistant Professor"
  }
}
```

#### List Faculty Members (GET)

Endpoint: `/faculty/`

Description: This endpoint retrieves a paginated list of faculty members.

Parameters:

- `page` (optional): Page number for pagination (default: 1).
- `limit` (optional): Number of items per page (default: 10).
- `sortBy` (optional): Field to sort the results (e.g., `firstName`, `lastName`, `department`).
- `sortOrder` (optional): Sorting order (`asc` for ascending, `desc` for descending).

Response:

```json
{
  "totalPages": 5,
  "currentPage": 1,
  "totalItems": 48,
  "facultyMembers": [
    {
      "_id": "F-00000001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "contactNo": "0123456789",
      "department": "Computer Science",
      "designation": "Assistant Professor"
    }
    // Other faculty members...
  ]
}
```

#### Partial Search for Faculty Members (GET)

Endpoint: `/faculty/`

Description: This endpoint allows searching for faculty members using a partial search term.

Parameters:

- `searchTerm`: Partial term to search for in the faculty member's first name, last name, or department.

Response:

```json
{
  "facultyMembers": [
    {
      "_id": "F-00000001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "contactNo": "0123456789",
      "department": "Computer Science",
      "designation": "Assistant Professor"
    }
    // Other matching faculty members...
  ]
}
```

#### Get Faculty Member by ID (GET)

Endpoint: `/faculty/:facultyId`

Description: This endpoint retrieves a faculty member by their ID.

Response:

```json
{
  "_id": "F-00000001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "contactNo": "0123456789",
  "department": "Computer Science",
  "designation": "Assistant Professor"
}
```

#### Update Faculty Member by ID (PATCH)

Endpoint: `/faculty/:facultyId`

Description: This endpoint allows updating a faculty member's information by their ID.

Request Body (Example for updating the contact number):

```json
{
  "contactNo": "9876543210"
}
```

Response:

```json
{
  "message": "Faculty member updated successfully!",
  "faculty": {
    "_id": "F-00000001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "contactNo": "9876543210",
    "department": "Computer Science",
    "designation": "Assistant Professor"
  }
}
```

#### Delete Faculty Member by ID (DELETE)

Endpoint: `/faculty/:facultyId`

Description: This endpoint allows deleting a faculty member by their ID.

Response:

```json
{
  "message": "Faculty member deleted successfully!",
  "deletedFaculty": {
    "_id": "F-00000001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "contactNo": "9876543210",
    "department": "Computer Science",
    "designation": "Assistant Professor"
  }
}
```
