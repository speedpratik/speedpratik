export default function ({ $axios }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                authorization_token: `Bearer ${process.env.API_AUTHORIZATION_TOKEN}`
            }
        }
    });

    // Inject to context as $api
    inject("api", api);
}
