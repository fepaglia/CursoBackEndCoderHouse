export default class UserDto {
    constructor(user) {
        if (user) {
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.email = user.email;
            this.age = user.age;
            this.carts = user.carts;
            this.role = user.role;
        }
    }
};