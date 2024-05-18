# LinkedIn Profile Generator

This project is a web application that generates a LinkedIn profile based on the user's CV/resume text input. It uses Next.js, TypeScript, and Tailwind CSS for the frontend and communicates with OpenAI's API to generate the profile content.

## Features

- Text area for pasting CV/resume text
- Generates LinkedIn profile with heading, about section, experience, and skills
- Simulated streaming effect while generating the profile
- Loader/spinner indicating the profile generation process

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://www.openai.com/)

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/fujahgabriel/linkedin-profile-generator.git
    cd linkedin-profile-generator
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root of the project and add your OpenAI API key:
    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### Using the Application

1. Paste your CV/resume text into the text area.
2. Click the "Generate LinkedIn Profile" button.
3. Wait for the profile to be generated. A loader/spinner will be displayed during the process.
4. View the generated profile with heading, about section, experience, and skills.

## Project Structure

- `pages/index.tsx`: Main page component with the CV text area and profile display logic.
- `pages/api/generateProfile.ts`: API route for generating the LinkedIn profile using OpenAI's API.
- `styles/globals.css`: Global styles including Tailwind CSS and custom spinner styles.
- `.env.local`: Environment variables including the OpenAI API key.

## Demo

You can view a live demo of the application [here](https://linkedin-profile-generator.netlify.app/)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [OpenAI](https://www.openai.com/) for providing the AI model used to generate the LinkedIn profiles.
- [Next.js](https://nextjs.org/) for the React framework.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS framework.
