import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const jsonData = await res.json();
      setData(jsonData?.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchData();

    return () => {};
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useFetch;
