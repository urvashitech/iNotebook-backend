# iNotebook-backend

iNotebook-backend is the backend component of the iNotebook project, a secure and efficient digital notebook application. This backend provides the necessary APIs and functionality to support user authentication, note management, and other core features of the iNotebook application.

## Features

1. **Log In to an Account**: This API endpoint allows users to log in to their accounts using their registered credentials. It provides secure access to their saved notes and maintains privacy.

2. **Sign Up to Create an Account**: This API endpoint enables new users to create an account by providing essential information and setting up login credentials. It's the first step to start using the iNotebook application.

3. **Logout from the Account**: This API endpoint allows users to log out from their accounts, ensuring the protection of their notes and personal information when they are not using the application.

4. **Add a Note**: This API endpoint allows users to add new notes to their notebooks. Users can send the details of the note, and it will be stored securely on the server.

5. **Edit a Note**: This API endpoint enables users to make changes to their existing notes. Users can send the modified details of the note, and the server will update it accordingly.

6. **Delete a Note**: This API endpoint allows users to remove notes that are no longer needed or relevant. Users can send the ID of the note to be deleted, and the server will handle the deletion process.

## Getting Started

Follow these instructions to set up and run the iNotebook-backend project:

1. **Clone the Repository**: Begin by cloning this repository to your local machine using the following command:
```
git clone https://github.com/urvashitech/inotebook-backend.git
```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies by running the following command:

```
cd inotebook-backend
npm install
```

3. **Environment Configuration**: Configure the necessary environment variables, such as database connection strings and authentication keys, by creating a `.env` file based on the provided `.env.example` file.

4. **Run the Application**: Start the backend server using the following command:

```
npm start
```

5. **Access the API**: The iNotebook-backend API will be accessible at `http://localhost:8000` or a different port specified in your `.env` file.

## API Endpoints

The following are the API endpoints provided by the iNotebook-backend:

- `POST /api/login`: Log in to an existing account.
- `POST /api/signup`: Sign up to create a new account.
- `POST /api/logout`: Log out from the account.
- `POST /api/notes`: Add a new note to the user's notebook.
- `PUT /api/notes/:noteId`: Edit an existing note.
- `DELETE /api/notes/:noteId`: Delete a note from the user's notebook.

## Contributing

Contributions to the iNotebook-backend project are always welcome. If you find any issues or have suggestions for improvements, feel free to open a GitHub issue or submit a pull request. Please ensure that any contributions align with the project's coding standards and follow the existing code structure.

## License

The iNotebook-backend project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgments

- This project utilizes various open-source libraries and tools for its functionality, which are listed as dependencies in the `package.json` file.
- Special thanks to the contributors of the libraries and resources used in this project.

## Contact

If you have any questions, suggestions, or feedback, you can reach out to the project maintainer at [urvashikshatriya9@gmail.com](mailto:your-email@example.com).

---

