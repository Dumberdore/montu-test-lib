// Import necessary modules
import axios, { AxiosResponse } from 'axios';

interface AddressSuggestion {
    address: string;
    latitude: number;
    longitude: number;
}

interface AddressProvider {
    getSuggestions(query: string, options?: { limit?: number; countryCode?: string }): Promise<AddressSuggestion[]>;
}

interface TomTomConfig {
    apiKey: string;
}

class TomTomProvider implements AddressProvider {
    private readonly apiKey: string;
    private baseUrl: string = 'https://api.tomtom.com/search/2/search';

    constructor(config: TomTomConfig) {
        if (!config.apiKey) {
            throw new Error('TomTom API key is required');
        }
        this.apiKey = config.apiKey;
    }

    public async getSuggestions(query: string, options?: { limit?: number; countryCode?: string }): Promise<AddressSuggestion[]> {
        if (!query) {
            throw new Error('Query is required to fetch address suggestions');
        }

        const { limit = 10, countryCode } = options || {};
        const params: Record<string, string | number | boolean> = {
            key: this.apiKey,
            query,
            limit,
            typeahead: true,
            countrySet: 'AU', // Restrict results to Australia
        };

        if (countryCode) {
            params['countrySet'] = countryCode;
        }

        try {
            const response: AxiosResponse<any> = await axios.get(`${this.baseUrl}.json`, { params });
            return this.parseSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            throw new Error('Failed to fetch address suggestions');
        }
    }

    private parseSuggestions(data: any): AddressSuggestion[] {
        if (!data || !data.results) {
            return [];
        }

        return data.results.map((result: any) => {
            return {
                address: result.address?.freeformAddress || '',
                latitude: result.position?.lat || 0,
                longitude: result.position?.lon || 0,
            };
        });
    }
}

class AddressService {
    private provider: AddressProvider;

    constructor(provider: AddressProvider) {
        this.provider = provider;
    }

    public getSuggestions(query: string, options?: { limit?: number; countryCode?: string }): Promise<AddressSuggestion[]> {
        return this.provider.getSuggestions(query, options);
    }
}

// Example usage:
// const tomTomProvider = new TomTomProvider({ apiKey: 'your_api_key_here' });
// const addressService = new AddressService(tomTomProvider);
// addressService.getSuggestions('1600 Amphitheatre', { limit: 5, countryCode: 'US' })
//   .then((suggestions) => console.log(suggestions))
//   .catch((error) => console.error(error));

export { AddressService, AddressProvider, TomTomProvider, AddressSuggestion };
