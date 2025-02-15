import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { AddressService, AddressProvider, TomTomProvider, AddressSuggestion } from './AddressAutocomplete';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TomTomProvider', () => {
    const apiKey = 'test_api_key';
    const tomTomProvider = new TomTomProvider({ apiKey });
    const mockAxios = new MockAdapter(axios);

    afterEach(() => {
        mockAxios.reset();
    });

    it('should throw an error if no query is provided', async () => {
        await expect(tomTomProvider.getSuggestions('')).rejects.toThrow('Query is required to fetch address suggestions');
    });

    it('should fetch address suggestions successfully', async () => {
        const mockResponse = {
            results: [
                {
                    address: {country:'Australia', municipality:'Riddells Creek', freeformAddress: 'Riddells Creek, VIC' },
                    position: { lat: -37.455046, lon: 144.68643 },
                },
            ],
        };

        mockAxios.onGet(/search\/2\/search/).reply(200, mockResponse);

        const suggestions = await tomTomProvider.getSuggestions('72 Creek');

        expect(suggestions).toEqual([
            {
                address: 'Riddells Creek, VIC',
                latitude: -37.455046,
                longitude: 144.68643,
                country: 'Australia',
                municipality: 'Riddells Creek'
            },
        ]);
    });

    it('should handle empty results gracefully', async () => {
        mockAxios.onGet(/search\/2\/search/).reply(200, { results: [] });

        const suggestions = await tomTomProvider.getSuggestions('Unknown Place');

        expect(suggestions).toEqual([]);
    });

    it('should throw an error if the API request fails', async () => {
        mockAxios.onGet(/search\/2\/search/).reply(500);

        await expect(tomTomProvider.getSuggestions('123 Main St')).rejects.toThrow('Failed to fetch address suggestions');
    });
});

describe('AddressService', () => {
    let mockProvider: AddressProvider;
    let addressService: AddressService;

    beforeEach(() => {
        mockProvider = {
            getSuggestions: vi.fn(),
        };
        addressService = new AddressService(mockProvider);
    });

    it('should delegate getSuggestions to the provider', async () => {
        const mockSuggestions: AddressSuggestion[] = [
            {
                address: 'Riddells Creek, VIC',
                latitude: -37.455046,
                longitude: 144.68643,
                country: 'Australia',
                municipality: 'Riddells Creek'
            },
        ];

        (mockProvider.getSuggestions as Mock).mockResolvedValue(mockSuggestions);

        const suggestions = await addressService.getSuggestions('72 Creek');

        expect(mockProvider.getSuggestions).toHaveBeenCalledWith('72 Creek', undefined);
        expect(suggestions).toEqual(mockSuggestions);
    });
});
