import React from 'react';
import { Prediction } from '../models/Prediction';
import { CONFIG } from '../config';

export function useFetchOriginPredictions(id: number): {predictions: Prediction[], error: string | null, loading: boolean } {
  const [predictions, setPredictions] = React.useState<Prediction[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!id) {
      setPredictions([]);
      setError(null);
      setLoading(false);
      return;
    }
    let mounted: boolean = true;
    fetch(`${CONFIG.apiUrl}/api/CountryPrediction/pedict-country?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        setPredictions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        if (mounted) {
          setError(err.message || "Fetch error");
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [id]);
  return { predictions, error, loading };
}