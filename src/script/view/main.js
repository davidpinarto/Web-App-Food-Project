const testAPI = async () => {
  try {
    const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?f=c');
    const responseJson = await response.json();
    console.log(responseJson.meals.length);
  } catch (error) {
    console.log(error);
  }
};

testAPI();
