class User {
  String? id;
  final String email;
  final String password;
  String? name;

  User({required this.email, required this.password, this.name});

  Map<String, dynamic> mapToRegister() {
    return {
      'email': email,
      'password': password,
      'name': name,
    };
  }

  Map<String, dynamic> mapToLogin() {
    return {
      'email': email,
      'password': password,
    };
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'password': password,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        name: json['name'], email: json['email'], password: json['password']);
  }
}
