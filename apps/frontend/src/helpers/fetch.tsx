
export const fetchData = async (url: string, options: object = {}) => {

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("An error ocurred on the API");
    }
    const json = await response.json();
    return json;
  } catch (err: any) {
    console.log(err);
    return []
  }
};
