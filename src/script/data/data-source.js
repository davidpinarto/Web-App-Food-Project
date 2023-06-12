/* eslint-disable no-plusplus */
/* eslint-disable prefer-promise-reject-errors */

class DataSource {
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

export default DataSource;
