import 'package:flutter/cupertino.dart';

import '../model/User.dart';

class UserProvider extends ChangeNotifier {
  User? user;
  bool isLogged = false;

  get isUserLogged => isLogged;
  get getUser => user;

  void login(User user) {
    this.user = user;
    isLogged = true;
    notifyListeners();
  }

  void logout() {
    user = null;
    isLogged = false;
    notifyListeners();
  }


}