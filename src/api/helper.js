/***
 * API calling function
 * 
 */
export function fetchFromServer(url, method = 'GET', formData = null) {
    return new Promise(resolve => {
      fetch(url, {
        method: method,
        body: formData,
      })
        .then(res => res.json())
        .then(
          (result) => {
            resolve(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.error(error, "API Error");
            resolve(false)
          }
        )
    })
  }