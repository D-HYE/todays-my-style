import { useEffect, useState } from 'react';

const SeoulWeather = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=2f4b4e5ea74b7627da5fef1fe0fe1635&units=metric&lang=kr'
        );
      
        if (!response.ok) {
          throw new Error('날씨 정보를 가져오는데 실패했습니다.');
        }
        const data = await response.json();
        setTemperature(data.main.temp);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { temperature, loading, error };
};

export default SeoulWeather;
