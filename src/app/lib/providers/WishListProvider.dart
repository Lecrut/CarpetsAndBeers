import 'package:flutter/cupertino.dart';

import '../model/Item.dart';

class WishListProvider extends ChangeNotifier {
  Item? item;
  List<Item> _wishList = [];

  List<Item> get wishList => _wishList;
  get getItem => item;

  void addItemToWishList(Item item) {
    _wishList.add(item);
    notifyListeners();
  }

  void removeItemFromWishList(Item item) {
    _wishList.remove(item);
    notifyListeners();
  }
}
