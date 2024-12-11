import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../model/Item.dart';
import 'package:http/http.dart' as http;

class ItemController {
  static String ITEM_API_ENDPOINT = 'http://192.168.1.13:8080/api/itemapi';

  static Future<List<Item>> getAllItems() async {
    final serverIp = dotenv.env['SERVER_IP'];

    final response = await http
        .get(Uri.parse('http://$serverIp/api/itemapi/getAllItems'), headers: {
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
