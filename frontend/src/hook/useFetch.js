import axios from "axios";
import { useEffect, useState } from "react";
// a costume hook to setchdata from api :
export const useFetch = (url) => {
  // states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };

    // calling fetching func
    fetchData();
  }, [url]);

  return { data, loading, error };
};
