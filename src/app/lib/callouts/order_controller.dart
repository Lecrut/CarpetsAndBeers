import 'dart:convert';

import '../model/Order.dart';
import 'package:http/http.dart' as http;

class OrderController {
  static String ORDER_API_ENDPOINT = 'http://192.168.0.157:8080/api/orderapi';
  static Future<List<Order>> getUserOrders(String? userId) async {
    if (userId == null) {
      return [];
    }
    final response =
        await http.get(Uri.parse('$ORDER_API_ENDPOINT/user/$userId'), headers: {
      'Content-Type': 'application/json',
    });
    print('Response status: ${response.body}, ${response.statusCode}');

    if (response.statusCode == 200) {
      final List<dynamic> orders = jsonDecode(response.body);

      List<Order> allOrders =
          orders.map((order) => Order.fromJson(order)).toList();
      print('Orders: $orders');
      return allOrders;
    } else {
      return [];
    }
  }
}
