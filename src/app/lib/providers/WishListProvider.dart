import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

import '../model/Item.dart';

class WishListProvider extends ChangeNotifier {
  Item? item;
  List<Item> _wishList = [];

  List<Item> get wishList => _wishList;
  get getItem => item;

  WishListProvider() {
    loadWishList();
  }

  void addItemToWishList(Item item) {
    _wishList.add(item);
    _saveWishList();
    notifyListeners();
  }

  void removeItemFromWishList(Item item) {
    _wishList.remove(item);
    _saveWishList();
    notifyListeners();
  }

  void _saveWishList() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    List<String> jsonList =
        _wishList.map((item) => jsonEncode(item.toJson())).toList();
    preferences.setStringList('wishList', jsonList);
  }

  void loadWishList() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    List<String>? jsonList = preferences.getStringList('wishList');
    print(jsonList);
    if (jsonList != null) {
      _wishList = jsonList
          .map((item) => Item.fromJsonShared(jsonDecode(item)))
          .toList();
      notifyListeners();
    } else {
      _wishList = [];
    }
  }
}
