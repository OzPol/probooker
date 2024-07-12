// mockData.ts
import { Service } from './types';

export const mockServices: Service[] = [
    {
        $id: '1',
        name: 'Service 1',
        description: 'Description for Service 1',
        price: 100,
        providerId: 'provider1',
        providerName: 'Ozlem\'s Services',
    },

    {
        $id: '2',
        name: 'Service 2',
        description: 'Description for Service 2',
        price: 200,
        providerId: 'provider2',
        providerName: 'Shawn\'s Services',
    },

    {
        $id: '3',
        name: 'Service 3',
        description: 'Description for Service 3',
        price: 200,
        providerId: 'provider3',
        providerName: 'Ben\'s Services',
    },

    {
        $id: '3',
        name: 'Service 3',
        description: 'Description for Service 3',
        price: 350,
        providerId: 'provider3',
        providerName: 'Vejay\'s Services',
    },
];
