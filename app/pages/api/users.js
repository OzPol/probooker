// app/pages/api/users.js
export default function handler(req, res) {
    res.status(200).json([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ]);
  }
  