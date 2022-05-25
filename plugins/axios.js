export default function ({ $axios, error: nuxtError }) {
    $axios.onError(error => {
        nuxtError({
            message: error.message
        });
        return Promise.resolve(false);
    });

    $axios.onResponse(response => {
        $axios.setToken('123', 'Bearer')
    });
}