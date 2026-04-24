// client/src/hooks/useSearch.js
// Custom hook for reading and managing bus search query params
import { useSearchParams } from 'react-router-dom';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  const updateSearch = (params) => {
    setSearchParams(params);
  };

  return { from, to, date, updateSearch };
}
