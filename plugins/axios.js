export default function ({ $axios, error: nuxtError }) {
    $axios.onError(error => {
        nuxtError({
            message: error.message
        });
        return Promise.resolve(false);
    });

    $axios.onResponse(response => {
        $axios.setHeader('authorization_token', process.env.API_AUTHORIZATION_TOKEN);
        if (response) return Promise.resolve(response);
        return Promise.resolve(false);
    });

    $axios.onRequest(request => {
        $axios.setHeader('authorization_token', process.env.API_AUTHORIZATION_TOKEN);
        if (request) return Promise.resolve(request);
        return Promise.resolve(false);
    })
}