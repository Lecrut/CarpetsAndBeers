import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

import '../model/User.dart';

class UserProvider extends ChangeNotifier {
  User? user;
  bool isLogged = false;

  get isUserLogged => isLogged;
  get getUser => user;

  UserProvider() {
    _loadUser();
  }

  void login(User user) {
    this.user = user;
    isLogged = true;
    _saveUser();
    notifyListeners();
  }

  void logout() {
    user = null;
    isLogged = false;
    _clearUser();
    notifyListeners();
  }

  void _saveUser() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.setString('user', jsonEncode(user?.toJson()));
    preferences.setBool('isLogged', isLogged);
  }

  void _loadUser() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    String? userJson = preferences.getString('user');
    if (userJson != null) {
      user = User.fromJson(jsonDecode(userJson));
      isLogged = preferences.getBool('isLogged') ?? false;
      notifyListeners();
    }
  }

  void _clearUser() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    preferences.remove('user');
    preferences.remove('isLogged');
  }
}
