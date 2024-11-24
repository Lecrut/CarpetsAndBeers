class User {
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
}