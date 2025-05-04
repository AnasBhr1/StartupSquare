import React from 'react';
import { CURRENCY_OPTIONS } from '../../config/constants';
import { useCurrency } from '../../hooks/useCurrency';
import Select from './Select';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select
      options={CURRENCY_OPTIONS.map(c => ({ label: c.value, value: c.value }))}
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-24"
    />
  );
};

export default CurrencySelector;