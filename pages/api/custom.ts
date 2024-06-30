// The custom.ts file in the pages/api directory can be used to define a simple API endpoint.
// Here’s an example of how we can set it up:

// pages/api/custom.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: 'This is a custom API endpoint' });
};
