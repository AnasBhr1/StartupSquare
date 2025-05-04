import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CURRENCY_OPTIONS } from '../config/constants';

interface CurrencyState {
  currency: string;
  setCurrency: (currency: string) => void;
  formatAmount: (amount: number) => string;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number;
}

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'MAD',
      setCurrency: (currency) => set({ currency }),
      formatAmount: (amount) => {
        const currency = get().currency;
        const formatter = new Intl.NumberFormat('fr-MA', {
          style: 'currency',
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formatter.format(amount);
      },
      convertAmount: (amount, fromCurrency, toCurrency) => {
        const fromRate = CURRENCY_OPTIONS.find(c => c.value === fromCurrency)?.rate || 1;
        const toRate = CURRENCY_OPTIONS.find(c => c.value === toCurrency)?.rate || 1;
        return (amount / fromRate) * toRate;
      },
    }),
    {
      name: 'currency-storage',
    }
  )
);

export const useCurrency = () => {
  const { currency, setCurrency, formatAmount, convertAmount } = useCurrencyStore();
  return { currency, setCurrency, formatAmount, convertAmount };
};