// The custom.ts file in the pages/api directory can be used to define a simple API endpoint.
// Here’s an example of how we can set it up:

// pages/api/custom.ts
import { NextApiRequest, NextApiResponse } from 'next';

const customHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'This is a custom API endpoint' });
};

export default customHandler;

// The arrow function handling the request is assigned to the customHandler variable.
// The customHandler variable is then exported as the default export of the module.
// http://localhost:3000/api/custom
