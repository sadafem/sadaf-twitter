# Twitter Clone

A modern Twitter clone built with React, Node.js, and MongoDB. This application provides a simplified version of Twitter's core functionality with a clean, responsive UI that supports both light and dark themes.

![Twitter Clone Screenshot](https://via.placeholder.com/800x400?text=Twitter+Clone)

## Features

- **User Authentication**: Secure signup, login, and logout functionality
- **Tweet Management**: Create, read, update, and delete tweets
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Support**: Light and dark mode with smooth transitions
- **Real-time Updates**: See new tweets as they're posted
- **User Profiles**: View and edit user information
- **Modern UI**: Built with Tailwind CSS and Shadcn UI components

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn UI**: High-quality UI components
- **React Router**: Client-side routing
- **Context API**: State management

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/twitter-clone.git
   cd twitter-clone
   ```

2. Install backend dependencies
   ```bash
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the root directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Create a `.env` file in the frontend directory with:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

5. Start the development servers
   - Backend:
     ```bash
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm run dev
     ```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
twitter-clone/
├── frontend/                # React frontend
│   ├── public/              # Static assets
│   │   ├── components/      # UI components
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── .env                 # Frontend environment variables
│   └── package.json         # Frontend dependencies
├── src/                     # Backend source code
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   └── utils/               # Utility functions
├── .env                     # Backend environment variables
├── .ebignore                # Elastic Beanstalk ignore file
├── .elasticbeanstalk/       # AWS Elastic Beanstalk config
├── package.json             # Backend dependencies
└── README.md                # Project documentation
```

## Deployment

This project is configured for deployment on AWS:

- **Backend**: Deployed on AWS Elastic Beanstalk
- **Frontend**: Deployed on AWS S3 with CloudFront

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
