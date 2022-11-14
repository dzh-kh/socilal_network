module.exports = class UserDto {
  firstName;
  lastName;
  email;
  id;
  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }
};
