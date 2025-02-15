// Import necessary modules
import axios, {AxiosResponse} from 'axios';

interface AddressSuggestion {
    address: string;
    latitude: number;
    longitude: number;
    // Req. 4 - The result elements should contain important information about the place (country, municipality, etc.)
    country: string;
    municipality: string;
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

    public async getSuggestions(query: string, options?: { limit?: number}): Promise<AddressSuggestion[]> {
        if (!query) {
            throw new Error('Query is required to fetch address suggestions');
        }

        // Req. 2 - Restrict results to Australia
        const CountryCode = 'AU'
        // Req. 4 - The result elements should contain important information about the place (country, municipality, etc.)
        const EntityTypeSet = 'Municipality'

        const { limit = 10} = options || {};
        const params: Record<string, string | number | boolean > = {
            key: this.apiKey,
            query,
            limit,
            typeahead: true,
            countrySet: CountryCode,
            entityTypeSet: EntityTypeSet
        };

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
            const res: AddressSuggestion = {
                address: result.address?.freeformAddress || '',
                latitude: result.position?.lat || 0,
                longitude: result.position?.lon || 0,
                country: result.address.country || '',
                municipality: result.address.municipality || '',
            };

            return res;
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

export { AddressService, AddressProvider, TomTomProvider, AddressSuggestion };
