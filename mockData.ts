// mockData.ts
import { Service } from './types';

export const mockServices: Service[] = [
    {
        $id: '1',
        name: 'Service 1',
        description: 'Description for Service 1',
        price: 100,
        providerId: 'provider1',
    },

    {
        $id: '2',
        name: 'Service 2',
        description: 'Description for Service 2',
        price: 200,
        providerId: 'provider2',
    },
];
