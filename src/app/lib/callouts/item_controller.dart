import 'dart:convert';

import 'package:app/callouts/UserController.dart';
import 'package:http/http.dart';

import '../model/Item.dart';
import 'package:http/http.dart' as http;

class ItemController {
  static String ITEM_API_ENDPOINT = 'http://192.168.0.157:8080/api/itemapi';

  static Future<List<Item>> getAllItems() async {
    final response =
        await http.get(Uri.parse('$ITEM_API_ENDPOINT/getAllItems'), headers: {
      'Content-Type': 'application/json',
    });
    print('Response status: ${response.body}, ${response.statusCode}');

    if (response.statusCode == 200) {
      final List<dynamic> items = jsonDecode(response.body);

      List<Item> allItems = items.map((item) => Item.fromJson(item)).toList();
      print('Items: $items');
      return allItems;
    } else {
      throw Exception('Failed to load items');
    }
  }
}
