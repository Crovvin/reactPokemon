import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(isFlipped = true) {
  const [flipped, setFlipped] = useState(isFlipped);
  const flip = () => {
    setFlipped(isUp => !isUp);
  };

  return [flipped, flip];
}

function useStorage(key, startValue = []) {
    if (localStorage.getItem(key)) {
      startValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(startValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
}

function useAxios(key, leftUrl) {
  const [responses, setResponses] = useStorage(key);
  const addResponseData = async (formatter = data => data, rightUrl = "") => {
    const response = await axios.get(`${leftUrl}${rightUrl}`);
    setResponses(data => [...data, formatter(response.data)]);
  };
  const clearResponses = () => setResponses([]);
  return [responses, addResponseData, clearResponses];
}

export default useStorage;
export { useFlip, useAxios, useStorage };