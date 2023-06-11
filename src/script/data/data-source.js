/* eslint-disable no-plusplus */
/* eslint-disable prefer-promise-reject-errors */

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

  static listAllMealsByFirstLetter(keyword) {
    return fetch(`https://themealdb.com/api/json/v1/1/search.php?f=${keyword}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson);
        }
        return Promise.reject('Failed to get data');
      });
  }

  static listMealByName(keyword) {
    return fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson);
        }
        return Promise.reject('Failed to get data');
      });
  }
}
// const listMealByName = async () => {
//   try {
//     const result = await DataSource.listMealByName('z');
//     const { meals } = result;
//     if (meals.length > 5) meals.length = 5;
//     console.log(meals);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // // // get ingredient
// const listMealByName = async () => {
//   try {
//     const result = await DataSource.listMealByName('z');
//     const { meals } = result;
//     if (meals.length > 5) meals.length = 5;
//     meals.forEach((value, index) => {
//       console.log(index);
//       for (let i = 1; i <= 20; i++) {
//         const ingredient = `strIngredient${i}`;
//         if (value[ingredient]) {
//           console.log(value[ingredient]);
//         }
//       }
//       // console.log(value);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // // // get measurement
// const listMealByName = async () => {
//   try {
//     const result = await DataSource.listMealByName('z');
//     const { meals } = result;
//     if (meals.length > 1) meals.length = 1;
//     meals.forEach((value, index) => {
//       console.log(index);
//       for (let i = 1; i <= 20; i++) {
//         const measurement = `strMeasure${i}`;
//         if (value[measurement] !== ' ') {
//           console.log(value[measurement]);
//         }
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// listMealByName();

export default DataSource;
