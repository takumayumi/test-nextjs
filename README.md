# Recipe Manager - Coding Challenge Submission

This project is a submission for the [test-nextjs](https://github.com/testsecuritybanker/test-nextjs) coding challenge. It is a fully functional recipe CRUD app built with **Next.js 14 (Pages Router)** and **TypeScript**, featuring form validation, local file handling, filtering, and a polished UI.

## Tech Stack

| Category             | Library/Tool                | Description                      |
| -------------------- | --------------------------- | -------------------------------- |
| **Framework**        | Next.js 14 (Pages Router)   | SSR-enabled React App            |
| **Language**         | TypeScript                  | Type safety                      |
| **UI**               | Chakra UI                   | Responsive and accessible design |
| **State Management** | Redux Toolkit + React-Redux | Global app state (no useContext) |
| **Forms**            | React Hook Form + Zod       | Validation + schema enforcement  |
| **Image Upload**     | Formidable                  | Handles file uploads on backend  |
| **Utils**            | lodash.debounce             | Debouncing                       |
| **Icons**            | React Icons                 | App icons                        |
| **Form (extra)**     | Formik                      | Used where appropriate           |
| **Barrel Files**     | Barrelsby + Chokidar CLI    | Auto-generates index files       |

## Scripts & Tooling

```bash
npm run dev                         # Run the app in development
npm run build                       # Build the production bundle
npm run start                       # Start production server
npm run lint                        # Run ESLint

# Barrel file generation
npm run generate:barrels           # Generate index.ts for all folders
npm run watch:barrels              # Watch + regenerate barrel files on change
```

> Barrel files are generated using [`barrelsby`](https://www.npmjs.com/package/barrelsby), with watch support via `chokidar-cli`.

## Features

### 1. Recipe List

- Scrollable section (not the entire page)
- Sortable by **Title** and **Date** (ASC/DESC)
- Search by **Title** with debounce
- Filter by **Favorites** (Yes/No checkbox)
- "Clear Filter" button resets all filters
- "No Record Found" message when no matches

### 2. Add Recipe

- Fields:
  - Image (uploaded)
  - Name
  - Email (valid format)
  - Title (must be unique)
  - Description (optional)
  - Ingredients
  - Instructions
- Validation via **Zod**
- Image saved to `/public/images/[title].ext`
- Toast shown on success; redirect to previous page

### 3. Edit Recipe

- Title is read-only
- Editable fields: all except title
- Toast/modal on success
- Redirect to recipe list after update

### 4. Delete Recipe

- Deletion via button
- Toast on success
- Redirect to recipe list

## Backend Details

| Endpoint                     | Method | Description             |
| ---------------------------- | ------ | ----------------------- |
| `/api/recipes`               | GET    | Fetch all recipes       |
| `/api/recipes`               | POST   | Add a new recipe        |
| `/api/recipes/[id]`          | GET    | Fetch recipe by ID      |
| `/api/recipes/[id]`          | PUT    | Update recipe by ID     |
| `/api/recipes/[id]/favorite` | PATCH  | Update isFavorite by ID |
| `/api/upload`                | POST   | Upload recipe image     |
| `/api/upload`                | POST   | Upload recipe image     |

### Data & Files

- All recipe data stored in: `src/data/recipes.json`
  > If file does not exist, it will be auto-created.
- Uploaded images saved under: `/public/images`
  > If folder does not exist, it will be auto-created.

## Getting Started

```bash
git clone https://github.com/takumayumi/test-nextjs
cd test-nextjs

npm install
npm run dev
```

## Author

**Yumi Takuma**  
[GitHub](https://github.com/takumayumi)  
[Email](mailto:yumitakuma@outlook.com)

## License

MIT
