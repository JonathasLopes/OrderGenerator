# OrderGenerator

**OrderGenerator** is a frontend application designed to a selection process that simulate order creation. It’s built using modern React standards and follows clean component architecture, making it a solid base for scalable UI development.

## Description

This project generates and displays simulated orders, with clear separation of UI components, services, and application logic. It leverages TypeScript for type safety and Vite for fast development builds. Ideal for showcasing frontend architecture in technical assessments.

## Notable Techniques

- **[React Context API](https://react.dev/learn/passing-data-deeply-with-context)**: Used to manage global state across components.
- **[Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)**: Encapsulates reusable logic for API interaction and form handling.
- **[CSS Modules](https://github.com/css-modules/css-modules)**: Helps scope styles locally to components.
- **[React Router](https://reactrouter.com/en/main/start/tutorial)**: Provides structured client-side navigation.

## Non-obvious Technologies

- **[Vite](https://vitejs.dev/)**: Development server and build tool offering faster performance than traditional setups like Webpack.
- **[Axios](https://axios-http.com/)**: For HTTP requests and REST API communication.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Popular icon library with access to multiple icon sets in a single package.
- **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Used for non-blocking toast notifications with minimal setup.

## Project Structure

```
OrderGenerator/
├── src/
│   ├── apis/
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   ├── helpers/
│   ├── hooks/
│   ├── interfaces/
│   ├── layouts/
│   ├── models/
│   ├── pages/
│   ├── services/
│   ├── statics/
│   ├── App.tsx
│   ├── Routes.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
```

### Directory Descriptions

- **apis/**: API configuration and client logic.
- **assets/styles/**: Global and component-specific styles.
- **components/**: Reusable UI elements.
- **helpers/**: Utility functions and constants.
- **hooks/**: Custom React hooks for common patterns.
- **interfaces/**: Shared TypeScript interfaces.
- **layouts/**: Application layout wrappers.
- **models/**: Data models used throughout the app.
- **pages/**: Route-based component views.
- **services/**: Business logic and service layer.
- **statics/**: Static assets like images and icons.
