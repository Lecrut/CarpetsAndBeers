import 'dart:convert';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../model/Order.dart';
import 'package:http/http.dart' as http;

class OrderController {
  static Future<List<Order>> getUserOrders(String? userId) async {
    if (userId == null) {
      return [];
    }
    final serverIp = dotenv.env['SERVER_IP'];

    final response = await http
        .get(Uri.parse('http://$serverIp/api/orderapi/user/$userId'), headers: {
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
