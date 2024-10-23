class UserRepository {
    constructor(User) {
        this.User = User;
    }

    async findUserByEmail(email) {
        try {
            console.log(email + " here in user repository");
            const user = this.User.findOne({ email });
            return user;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserRepository;
