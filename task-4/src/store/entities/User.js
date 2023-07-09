class User {
    constructor(username, password, id) {
        if (username !== undefined && password !== undefined) {
            this.username = username;
            this.password = password;
            if (id !== undefined) {
                this.id = id;
            } else {
                this.id = new Date() / 1;
            }
        } else {
            throw new Error('{username, password} is not valid');
        }
    }
}

export default User;
