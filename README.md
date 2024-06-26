# Todo List Application

Welcome to the Todo List Application. This project is a full-stack application with a React frontend, NestJS API, and a PostgreSQL database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 
- PostgreSQL
- Git (for cloning the repository)

## Setup

To set up the Todo List Application, follow these steps:

### Clone the repository

```sh
git clone https://github.com/amandaguan-ag/todo
cd todo
```

### Install dependencies

#### Backend

Navigate to the backend directory and install the required packages.

```sh
cd backend
npm install
```

#### Frontend

Navigate to the frontend directory in a separate terminal window and install the required packages.

```sh
cd frontend
npm install
```

### Database Configuration

Make sure PostgreSQL is running and create a new database named `<Your_Database_Name>`.

#### Backend Environment

Configure your database connection settings by creating an `.env` file in the backend directory or by setting your environment variables. Here's an example:

```plaintext
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=<Your_PostgreSQL_Username>
DATABASE_PASSWORD=<Your_PostgreSQL_Password>
DATABASE_NAME=<Your_Database_Name>
EMAIL_USER=<Your_Email>
EMAIL_PASS=<Your_Email_Password>
```

#### Migrate Database

Run the following command to perform the initial migration which will create the `Todo` table in your database.

```sh
npm run build
npm run migration:run    
```

### Start the Application

#### Backend

Start the NestJS server.

```sh
npm run start
```

#### Frontend

Start the React development server in a separate terminal.

```sh
cd frontend
npm start
```

The React application should now be running on [http://localhost:3000](http://localhost:3000) and the NestJS server on [http://localhost:3005](http://localhost:3005).

## License

This project is licensed under the MIT License.
