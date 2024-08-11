## Grocery Scanner App

**A React application for scanning grocery items and managing inventory.**

### Features

- Scan grocery items using a barcode scanner.
- Retrieve detailed product information based on the scanned barcode.
- Display product details including name, brand, category, and image.
- Save scanned product information to a Firebase Firestore database.
- Manage and view inventory stored in Firestore.

### Technologies Used

- React
- Firebase Firestore
- Next.js
- React Simple Toasts
- Tailwind CSS

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/enkhbold470/headstarter_02_pantry.git
   cd <repository-directory>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Firebase:**

   - Create a Firebase project.
   - Add your Firebase configuration to `firebase.js` in the `lib` directory.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

### Usage

- Open your browser and navigate to `http://localhost:3000`.
- Click the "Эхлэх" button to start scanning.
- Scan a barcode using the barcode scanner.
- View the scanned product information.
- Click the "Хадгалах" button to save the product to Firestore.
- Click the "Өмнөх хуудас руу буцах" button to return to the previous page.

### Components

- **Home:** The main component handling scanning and product saving.
- **[Other components, if applicable]**

### State Management (optional)

- Briefly explain the state management approach used (e.g., React Context, Redux, Zustand).

### Contributing

- Guidelines for contributing to the project.

### License

- Specify the license under which the project is released.

### Additional Considerations

- **Screen captures or screenshots:** Visuals can significantly enhance understanding.
- **Deployment instructions:** If applicable, include steps for deploying the app to a hosting platform.
- **API usage:** If using external APIs, document their usage and any rate limits.
- **Testing:** Mention any testing frameworks or strategies used.
