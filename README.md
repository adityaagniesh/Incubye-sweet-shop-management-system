📌 Project Title

Sweet Shop Management System

📖 Description

A Spring Boot–based RESTful web application designed to manage sweets, categories, users, and orders efficiently.
The application supports role-based access control, secure authentication using JWT, and follows clean architecture with DTOs.

🚀 Features

User authentication & authorization (JWT, Spring Security)

Role-based access (ADMIN / USER)

CRUD operations for sweets and categories

RESTful APIs with proper validation

DTO-based request & response handling

Exception handling with meaningful messages

🛠️ Tech Stack

Backend: Java, Spring Boot

Security: Spring Security, JWT

Database: H2(for testting) / PostgreSQL(change comment in application.properties and pom.xml)

ORM: Hibernate /JPA

Build Tool: Maven

Testing: JUnit, Mockito

API Testing: Postman

📂 Project Structure
```
Backend/
├── src/main/java/com/example/sweetshop
│   ├── config
│   │   ├── AppConfig.java
│   │   ├── DataInitializer.java
│   │   └── SecurityConfig.java
│   │
│   ├── controller
│   │   ├── AuthController.java
│   │   └── SweetController.java
│   │
│   ├── exception
│   │   ├── APIException.java
│   │   ├── InsufficientStockException.java
│   │   ├── MyGlobalExceptionHandler.java
│   │   └── ResourceNotFoundException.java
│   │
│   ├── model
│   │   ├── AppRole.java          (Enum)
│   │   ├── Sweet.java
│   │   ├── SweetCategory.java    (Enum)
│   │   └── Users.java
│   │
│   ├── payload   (DTOs)
│   │   ├── ApiResponse.java
│   │   ├── PurchaseRequestDTO.java
│   │   ├── PurchaseResponseDTO.java
│   │   ├── RestockRequestDTO.java
│   │   ├── RestockResponseDTO.java
│   │   ├── SignupRequestDTO.java
│   │   ├── SignupResponseDTO.java
│   │   ├── SweetRequestDTO.java
│   │   └── SweetResponseDTO.java
│   │
│   ├── repository
│   │   ├── SweetRepository.java
│   │   └── UserRepository.java
│   │
│   ├── security
│   │   ├── JwtAuthFilter.java
│   │   └── JwtUtil.java
│   │
│   ├── service
│   │   ├── SweetService.java
│   │   ├── SweetServiceImpl.java
│   │   ├── UserDetailsServiceImpl.java
│   │   ├── UserService.java
│   │   └── UserServiceImpl.java
│   │
│   └── SweetShopManagementApplication.java
│
├── src/main/resources
│   └── application.properties
│
├── src/test/java/com/example/sweetshop
│   ├── controller
│   │   └── SweetControllerTest.java
│   │
│   └── service
│       └── SweetServiceTest.java
│
└── pom.xml
```

📮 API Endpoints
🍬 Sweet Management

| Method | Endpoint             | Description                                     | Access       |
| ------ | -------------------- | ----------------------------------------------- | ------------ |
| POST   | `/api/sweets`        | Add a new sweet                                 | USER / ADMIN |
| GET    | `/api/sweets`        | Get all available sweets                        | USER / ADMIN |
| GET    | `/api/sweets/search` | Search sweets by name, category, or price range | USER / ADMIN |
| PUT    | `/api/sweets/{id}`   | Update sweet details                            | USER / ADMIN |
| DELETE | `/api/sweets/{id}`   | Delete a sweet                                  | ADMIN        |

📦 Inventory Management
| Method | Endpoint                    | Description                           | Access |
| ------ | --------------------------- | ------------------------------------- | ------ |
| POST   | `/api/sweets/{id}/purchase` | Purchase a sweet (decreases quantity) | USER   |
| POST   | `/api/sweets/{id}/restock`  | Restock a sweet (increases quantity)  | ADMIN  |


⚙️ Setup & Installation
1.Clone the repository
https://github.com/adityaagniesh/Incubye-sweet-shop-management-system.git

2.Navigate to backend folder
cd Backend

3.Database configuration

For H2 database: run the application directly

For PostgreSQL: comment H2 configuration and uncomment PostgreSQL configuration in both application.properties and pom.xml

4.Frontend and backend are running separately

Frontend is not connected with backend

Frontend co-author: Builder.io

Frontend setup steps

Go to frontend folder

Run npm install

Run npm run dev

🔑 Default Test Credentials

For testing purposes only

👑 Admin User

Username: admin

Password: admin123

👤 Normal User

Username: user
Password: user123

👤 Author

Aditya
Final Year BE CSE Student
Aspiring Full Stack Java Developer

🤝 Co-Authors & Acknowledgements

ChatGPT – Assisted with exception handling implementation and JWT-based authentication design.

Builder.io – Used for frontend development and UI scaffolding.

📝 Note

The backend and all REST APIs are working perfectly with the H2 database.

The search functionality is currently not working as expected with PostgreSQL.

The frontend and backend are developed and run separately.

This repository primarily focuses on backend development, as I worked as the backend developer for this project.

Made with ❤️ and Spring Boot by Aditya

