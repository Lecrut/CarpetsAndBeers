import 'package:app/navigation/bottom_navigation.dart';
import 'package:app/ordering/order_success_confirmation_page.dart';
import 'package:app/ordering/paypal/paypal.dart';
import 'package:app/ordering/step_indicator.dart';
import 'package:app/providers/ItemProvider.dart';
import 'package:app/providers/UserProvider.dart';
import 'package:flutter/material.dart';
import 'package:app/models/order_model.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:provider/provider.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

class SummaryPage extends StatefulWidget {
  final Address address;
  final List<Map<String, dynamic>> products;

  const SummaryPage({
    Key? key,
    required this.address,
    required this.products,
  }) : super(key: key);

  @override
  _SummaryPageState createState() => _SummaryPageState();
}

class _SummaryPageState extends State<SummaryPage> {
  bool paymentSuccessful = false;

  double calculateTotalPrice() {
    return widget.products.fold(
        0.0,
        (total, product) =>
            total + product['item'].price * product['quantity']);
  }

  Future<int> createCompletedOrder(
      Order order, String paymentId, String secretKey) async {
    final serverIp = dotenv.env['SERVER_IP'];
    final url =
        Uri.parse('http://$serverIp/api/orderapi/addCompletedOrder/$paymentId');
    final response = await http.post(
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $secretKey',
      },
      body: jsonEncode(order.toJson()),
    );
    return response.statusCode;
  }

  Future<void> clearCart() async {
    final itemsProvider = Provider.of<ItemProvider>(context, listen: false);
    await itemsProvider.clearCartItems();
  }

  @override
  Widget build(BuildContext context) {
    final isKeyboardVisible = MediaQuery.of(context).viewInsets.bottom != 0;

    final user = Provider.of<UserProvider>(context, listen: false).user;
    final userId = user?.id;

    final orderItems = widget.products.map((product) {
      return OrderItem(
        item: product['id'].toString(),
        quantity: product['quantity'],
      );
    }).toList();

    final order = Order(
      address: widget.address,
      userID: userId,
      items: orderItems,
      totalPrice: calculateTotalPrice(),
    );

    return Scaffold(
      appBar: paymentSuccessful
          ? null
          : AppBar(
              title: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: EdgeInsets.only(left: 50.0),
                    child: Text(
                      "Finalizacja",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: Colors.green,
                        fontSize: 32.0,
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.fromLTRB(0, 0, 42, 0),
                    child: Divider(
                      color: Colors.green,
                      thickness: 4.0,
                    ),
                  ),
                ],
              ),
              centerTitle: true,
            ),
      body: paymentSuccessful
          ? const OrderConfirmationPage()
          : SingleChildScrollView(
              padding: const EdgeInsets.all(20.0),
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight:
                      MediaQuery.of(context).size.height - kToolbarHeight,
                ),
                child: IntrinsicHeight(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            buildStepIndicator("Adres dostawy", true),
                            buildStepIndicator("Podsumowanie", true),
                          ],
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Adres dostawy:',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text('Ulica: ${widget.address.street}'),
                            Text('Numer domu: ${widget.address.number}'),
                            if (widget.address.building.isNotEmpty)
                              Text(
                                  'Numer mieszkania: ${widget.address.building}'),
                            Text('Miasto: ${widget.address.city}'),
                            Text('Kod pocztowy: ${widget.address.zip}'),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),
                      Padding(
                        padding: const EdgeInsets.only(top: 16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Podsumowanie zamówienia:',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            ...widget.products.map((product) {
                              return ListTile(
                                title: Text(product['item'].name),
                                subtitle: Text(
                                    '${product['quantity']} x ${product['item'].price.toStringAsFixed(2)} PLN'),
                                trailing: Text(
                                    '${(product['quantity'] * product['item'].price).toStringAsFixed(2)} PLN'),
                              );
                            }).toList(),
                            const Divider(),
                            Text(
                              'Łączna cena: ${calculateTotalPrice().toStringAsFixed(2)} PLN',
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                              textAlign: TextAlign.right,
                            ),
                          ],
                        ),
                      ),
                      if (!isKeyboardVisible) const Spacer(),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          ElevatedButton(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.grey,
                              foregroundColor: Colors.white,
                            ),
                            child: Text("Powrót"),
                          ),
                          ElevatedButton.icon(
                            onPressed: () async {
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (BuildContext context) => UsePaypal(
                                    sandboxMode: true,
                                    clientId: dotenv.env['PAYPAL_CLIENT_ID']!,
                                    secretKey:
                                        dotenv.env['PAYPAL_CLIENT_SECRET']!,
                                    returnURL: "https://samplesite.com/return",
                                    cancelURL: "https://samplesite.com/cancel",
                                    transactions: [
                                      {
                                        "amount": {
                                          "total": order.totalPrice
                                              .toStringAsFixed(2),
                                          "currency": "PLN",
                                          "details": {
                                            "subtotal": order.totalPrice
                                                .toStringAsFixed(2),
                                            "shipping": '0',
                                            "shipping_discount": 0
                                          }
                                        },
                                      }
                                    ],
                                    note:
                                        "Contact us for any questions on your order.",
                                    onSuccess: (Map params) async {
                                      int code = await createCompletedOrder(
                                          order,
                                          params['paymentId'],
                                          dotenv.env['PAYPAL_CLIENT_SECRET']!);

                                      if (code == 200) {
                                        for (int i = 10; i > 0; i--) {
                                          await Future.delayed(
                                              Duration(seconds: 1));
                                          print("Navigating in $i seconds...");
                                        }
                                        await clearCart();

                                        setState(() {
                                          paymentSuccessful = true;
                                        });
                                      } else {
                                        print("Failed to add order");
                                      }
                                    },
                                    onError: (error) {
                                      print("onError: $error");
                                    },
                                    onCancel: (params) {
                                      print('cancelled: $params');
                                    },
                                  ),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.green,
                              foregroundColor: Colors.white,
                            ),
                            icon: Icon(Icons.payment),
                            label: Text("Przejdź do płatności"),
                          ),
                        ],
                      ),
                      const Spacer(),
                    ],
                  ),
                ),
              ),
            ),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}
