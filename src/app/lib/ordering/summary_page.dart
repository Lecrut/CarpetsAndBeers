import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:app/ordering/paypal/paypal.dart';
import 'package:app/ordering/step_indicator.dart';
import 'package:flutter/material.dart';
import 'package:app/models/order_model.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SummaryPage extends StatelessWidget {
  final Address address;
  final List<Map<String, dynamic>> products;

  const SummaryPage({
    Key? key,
    required this.address,
    required this.products,
  }) : super(key: key);

  double calculateTotalPrice() {
    return products.fold(0.0,
        (total, product) => total + product['price'] * product['quantity']);
  }

  @override
  Widget build(BuildContext context) {
    final isKeyboardVisible = MediaQuery.of(context).viewInsets.bottom != 0;

    print("dotenv ${dotenv.env['PAYPAL_CLIENT_ID']}");

    final orderItems = products.map((product) {
      return OrderItem(
        item: product['id'].toString(),
        quantity: product['quantity'],
      );
    }).toList();

    final order = Order(
      address: address,
      userID: 1, // TODO Replace with actual user ID
      items: orderItems,
      totalPrice: calculateTotalPrice(),
    );

    return Scaffold(
      appBar: AppBar(
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: MediaQuery.of(context).size.height - kToolbarHeight,
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
                      Text('Ulica: ${address.street}'),
                      Text('Numer domu: ${address.number}'),
                      if (address.building.isNotEmpty)
                        Text('Numer mieszkania: ${address.building}'),
                      Text('Miasto: ${address.city}'),
                      Text('Kod pocztowy: ${address.zip}'),
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
                      ...products.map((product) {
                        return ListTile(
                          title: Text(product['name']),
                          subtitle: Text(
                              '${product['quantity']} x ${product['price'].toStringAsFixed(2)} PLN'),
                          trailing: Text(
                              '${(product['quantity'] * product['price']).toStringAsFixed(2)} PLN'),
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
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (BuildContext context) => UsePaypal(
                              sandboxMode: true,
                              clientId: dotenv.env['PAYPAL_CLIENT_ID']!,
                              secretKey: dotenv.env['PAYPAL_CLIENT_SECRET']!,
                              returnURL: "https://samplesite.com/return",
                              cancelURL: "https://samplesite.com/cancel",
                              transactions: [
                                {
                                  "amount": {
                                    "total":
                                        order.totalPrice.toStringAsFixed(2),
                                    "currency": "PLN",
                                    "details": {
                                      "subtotal":
                                          order.totalPrice.toStringAsFixed(2),
                                      "shipping": '0',
                                      "shipping_discount": 0
                                    }
                                  },
                                }
                              ],
                              note:
                                  "Contact us for any questions on your order.",
                              onSuccess: (Map params) async {
                                print("onSuccess: $params");
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
