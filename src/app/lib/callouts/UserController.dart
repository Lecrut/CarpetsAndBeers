import 'dart:convert';

import 'package:http/http.dart';

import '../model/User.dart';
import 'package:http/http.dart' as http;

class UserController {
  static const USER_API_ENDPOINT = 'http://192.168.56.1:8080/api/userapi';

  static Future<Response> createUser(User user) async {
    final response = await http.post(
      Uri.parse('$USER_API_ENDPOINT/register'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(user.mapToRegister()),
    );
    print('Response status: ${response.toString()}');

    return response;
  }

  static Future<void> updateUser(String name, String email, String password) async {
    // Update user
  }

  static Future<void> deleteUser(String email) async {
    // Delete user
  }

  static Future<void> getUser(String email) async {
    // Get user
  }

  static Future<Response> loginUser(User user) async {
    final response = await http.post(
      Uri.parse('$USER_API_ENDPOINT/login'),
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonEncode(user.mapToLogin()),
    );
    print('Response status: ${response.toString()}');
    print('Response body: ${response.body}');

    return response;
  }
}