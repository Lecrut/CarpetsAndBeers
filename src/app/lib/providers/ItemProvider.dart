import 'package:flutter/cupertino.dart';

import '../model/Item.dart';

class ItemProvider extends ChangeNotifier {
  Item? item;
  List<Item> _cartItems = [];

  List<Item> get cartItems => _cartItems;
  get getItem => item;

  void addItemToCart(Item item) {
    _cartItems.add(item);
    notifyListeners();
  }

  void removeItemFromCart(Item item) {
    _cartItems.remove(item);
    notifyListeners();
  }
}
