class User {
  String? id;
  final String email;
  final String password;
  String? name;

  User({this.id, required this.email, required this.password, this.name});

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
      'id': id,
      'name': name,
      'email': email,
      'password': password,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        id: json['id'],
        name: json['name'],
        email: json['email'],
        password: json['password']);
  }
}
