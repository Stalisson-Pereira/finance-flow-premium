interface ExchangeRates {
    [code: string]: number;
}

export interface ExchangeResponse {
    base: string;
    rates: ExchangeRates;
    timestamp: number;
}

class ExchangeService {
    private apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
    private baseUrl = "https://open.er-api.com/v6/latest";
    private cache = new Map<string, { data: ExchangeResponse; at: number }>();
    private ttl = 60 * 60 * 1000;

    private async fetchRates(base: string): Promise<ExchangeResponse> {
        const cached = this.cache.get(base);
        if (cached && Date.now() - cached.at < this.ttl) return cached.data;

        const res = await fetch(`${this.baseUrl}/${base}`);
        if (!res.ok) throw new Error("Falha ao buscar câmbio");
        const json = await res.json();

        const data: ExchangeResponse = {
            base: json.base_code,
            rates: json.rates,
            timestamp: json.time_last_update_unix * 1000
        };

        this.cache.set(base, { data, at: Date.now() });
        return data;
    }

    async convert(amount: number, from: string, to: string): Promise<number> {
        if (from === to) return amount;
        const data = await this.fetchRates(from);
        const rate = data.rates[to];
        if (!rate) throw new Error(`Sem taxa para ${to}`);
        return amount * rate;
    }

    getSupportedCurrencies(): string[] {
        return ["BRL", "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"];
    }
}

export const exchangeService = new ExchangeService();
