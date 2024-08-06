# ProBooker

ProBooker is a dynamic booking system designed to connect customers with local service providers seamlessly. The platform allows users to register as either service providers or customers, enabling them to book services or offer their services.

## Table of Contents

- Project Overview
- Technologies Used
- Getting Started
  - Prerequisites
  - Installation
  - Running the Application
- Features
- Roadmap
- Contributing
- License

## Project Overview

ProBooker is a web application that facilitates the booking of services from local providers. Users can create accounts as service providers or customers. Service providers can manage their services and bookings through a dedicated dashboard.

## Technologies Used

- **Programming Languages**: TypeScript and JavaScript
- **Frontend Framework**: Next.js (built on React)
- **Backend Services**: Appwrite
- **Database**: Appwrite
- **Styling**: CSS and Sass
- **State Management**: React useState and useContext (Context API)
- **Deployment**: Heroku
- **Containerization**: Docker
- **Linting**: ESLint
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for deployment)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/OzPol/probooker.git
    cd probooker
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env.local` file in the root of the project and add the following environment variables:
    ```sh
    .env.local

    APPWRITE_ENDPOINT=your_appwrite_endpoint
    APPWRITE_PROJECT_ID=your_appwrite_project_id
    APPWRITE_API_KEY=your_appwrite_api_key
    ```

### Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000)

2. Running with Docker:
 
   ```sh
    docker build -t probooker .
    docker run -p 3000:3000 probooker
    ```

## Features

- **User Registration and Authentication**: Secure sign-up and login for service providers and customers.
- **User Profiles**: Detailed profiles for both service providers and customers, including service history and reviews.
- **Service Listings**: Service providers can list their services, including descriptions, prices, and availability.
- **Booking System**: Customers can book services using a clear and intuitive booking form with calendar integration.
- **Messaging**: In-app messaging system for secure communication between users.
- **Reviews and Ratings**: Customers can view and leave reviews and ratings for service providers.

## Roadmap

1.	User Registration Page
2.	User Dashboard
3.	Service Provider Registration Page
4.	Service Provider Dashboard
5.	Database Setup and Seeding

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.
