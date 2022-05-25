export default function ({ $axios }, inject) {
    const api = $axios.create({
        headers: {
            common: {
                authorization_token: `Bearer ${process.env.API_AUTHORIZATION_TOKEN}`
            }
        }
    })
    api.setBaseURL("http://localhost:3000/api/");

    // Inject to context as $api
    inject("api", api);
}
