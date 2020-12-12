export const backendGet = (url) => {

    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.responseType = `json`;

        xhr.addEventListener(`load`, () => {
            if (xhr.status == 200) {
                resolve(xhr.response);
            } else {
                const error = new Error(xhr.statusText);
                error.code = xhr.status;
                reject(error);
            }
        });

        xhr.addEventListener(`error`, () => {
            reject(new Error("Network Error"));
        });

        xhr.open(`GET`, url);
        xhr.send();
    });
};