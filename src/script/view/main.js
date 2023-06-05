const testAPI = async () => {
  try {
    const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    const responseJson = await response.json();
    console.log(responseJson.meals[0].strInstructions);
  } catch (error) {
    console.log(error);
  }
};

// testAPI();


