import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

import '../model/Item.dart';

class ItemProvider extends ChangeNotifier {
  Item? item;
  List<Item> _cartItems = [];

  List<Item> get cartItems => _cartItems;
  get getItem => item;

  ItemProvider() {
    loadCartItems();
  }

  void addItemToCart(Item item) {
    _cartItems.add(item);
    _saveCartItems();
    notifyListeners();
  }

  void removeItemFromCart(Item item) {
    _cartItems.remove(item);
    _saveCartItems();
    notifyListeners();
  }

  void _saveCartItems() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    List<String> jsonList =
        _cartItems.map((item) => jsonEncode(item.toJson())).toList();
    preferences.setStringList('cartItems', jsonList);
  }

  Future<void> loadCartItems() async {
    SharedPreferences preferences = await SharedPreferences.getInstance();
    List<String>? jsonList = preferences.getStringList('cartItems');
    if (jsonList != null) {
      _cartItems = jsonList
          .map((item) => Item.fromJsonShared(jsonDecode(item)))
          .toList();
      notifyListeners();
    } else {
      _cartItems = [];
    }
  }
}
