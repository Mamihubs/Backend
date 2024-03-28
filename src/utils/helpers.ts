import mongoose from 'mongoose';

export const getSortByParams = <T>(queryParam: string | undefined) => {
    let obj: Partial<T> = {};
    if (queryParam) {
      // Split the sort parameter by comma to get individual sort instructions
      const result = queryParam.split(",");
      result.forEach((r) => {
          const [key, value] = r.split(":");
          obj[key as keyof T] = parseInt(value) as T[keyof T];
      });
    }
    return obj as T;
  };

  export const getFilterParams = <T>(queryParam: string | undefined) => {
    let obj: Partial<T> = {};
    if(!queryParam) return undefined
    // Split the sort parameter by comma to get individual sort instructions
    const result = queryParam.split(",");
    result.forEach((r) => {
        const [key, value] = r.split(":");
        obj[key as keyof T] = value as T[keyof T];
    });
    return obj as T;
  };

  export const boolFromString = (val: string): boolean => {
    if(!val) return false;
    const value = val.toString().toLowerCase().replace(/\s+/g, "").trim();
    const testValues = ["true", "false"];
    if (!value || !testValues.includes(value)) {
      return false;
    }
    return Boolean(JSON.parse(String(value.trim())));
  };


export const isValidEmailAddress = (str: string) =>{
  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the regex pattern
  return emailRegex.test(str);

}