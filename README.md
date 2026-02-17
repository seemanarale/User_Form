# React User Management App

## Features
- Full CRUD functionality
- Schema-driven dynamic form
- TypeScript strict typing
- Material UI styling
- Validation with regex support
- Confirmation dialogs
- Snackbar notifications

## Tech Stack
- React
- TypeScript
- Material UI
- Axios
- JSON Server

## Setup

1. Install dependencies
   npm install

2. Start JSON server
   npx json-server --watch db.json --port 3001

3. Start frontend
   npm run dev

## Extending Form Fields

To add a new field:
1. Add property to `UserFormData` in `types/User.ts`
2. Add entry in `userFormSchema`
No changes required in UI logic.