type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const categories = (endpoint: string, methodType: methodType) =>
  fetch(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}`, {
    method: methodType,
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' }
  }).then((result) => result.json());

(async () => {
  try {
    const all_categories = await categories('categories', 'GET');
    console.log(all_categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
})();
