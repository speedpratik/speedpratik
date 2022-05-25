export default function ({ $axios, error: nuxtError }) {
    $axios.onError(error => {
        nuxtError({
            message: error.message
        });
        return Promise.resolve(false);
    });

    $axios.onResponse(response => {
        $axios.setHeader('authorization_token', 'THISISATEST')
        return Promise.resolve(response)
    });

    $axios.onRequest(request => {
        $axios.setHeader('authorization_token', 'THISISATEST')
        return Promise.resolve(request)
    });
}