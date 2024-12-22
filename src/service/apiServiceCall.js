export const api = function () {
    return new Promise((resolve, reject) => {
      fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json")
        .then((response) => {
          if (!response.ok) {
            reject(new Error(`HTTP error! status: ${response.status}`));
          }
          
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  