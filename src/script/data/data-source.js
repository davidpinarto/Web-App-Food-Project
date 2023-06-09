/* eslint-disable prefer-promise-reject-errors */
// import clubs from "../data/clubs.js";

class DataSource {
  static listAllMealCategory() {
    return fetch('https://themealdb.com/api/json/v1/1/categories.php')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          // console.log(responseJson.teams)
          return Promise.resolve(responseJson);
        }
        return Promise.reject('meal is not found');
      });
  }

  static listAllCategoryAreaIngredients() {
    return fetch('https://themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson);
        }
        return Promise.reject('Failed to get data');
      });
  }
}

const listAllMealCategory = async () => {
  try {
    const result = await DataSource.listAllMealCategory();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const listAllCategoryAreaIngredients = async () => {
  try {
    const result = await DataSource.listAllCategoryAreaIngredients();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// listAllMealCategory();
listAllCategoryAreaIngredients();

// const testAPI = async () => {
//   try {
//     const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php');
//     const responseJson = await response.json();
//     console.log(responseJson.meals[0].strInstructions);
//   } catch (error) {
//     console.log(error);
//   }
// };

// testAPI();
// export default DataSource;
