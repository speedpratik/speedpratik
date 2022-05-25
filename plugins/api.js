export default {
    /* Récupère les infos utilisateur */
    getUserDetails: (auth, axios) => {
        return new Promise(async (res, rej) => {
            const strategy = auth.$state.strategy;
            const infos = {
                username: null,
                avatarLink: null,
                email: null,
                oauth: strategy
            }

            switch (strategy) {
                case "discord":
                    const { username, id, avatar, email } = auth.user;
                    infos.username = username;
                    infos.avatarLink = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`;
                    infos.email = email
                    break;
            }


            try {
                const req = await axios.$post("/api/users", {
                    username: infos.username,
                    email: infos.email,
                    oauth2: infos.oauth,
                    avatar: infos.avatarLink
                });
                res(req);
            } catch (e) {
                auth.loginWith(strategy); // Reconnection, erreur
            }
        });
    },


    /* Récupère le contenu d'un sujet à partir de son id */
    getSubjectExerciseFromId: (id, axios) => {
        return new Promise(async (res, rej) => {
            try {
                const req = await axios.$get(`/api/subjects/id/${id}/exercises`);
                res(req);
            } catch (e) {
                rej(e);
            }
        });
    },
}