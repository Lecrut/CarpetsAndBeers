import 'package:app/ordering/address_page.dart';
import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  _CartPageState createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  final List<Map<String, dynamic>> products = [
    {
      'name': 'Dywan Perski',
      'price': 150.00,
      'imagePath': 'images/dywan.jpg',
      'quantity': 1
    },
    {
      'name': 'Piwo Corona',
      'price': 6.99,
      'imagePath': 'images/corona.png',
      'quantity': 1
    },
    {
      'name': 'Piwo Lech',
      'price': 5.99,
      'imagePath': 'images/lech.jpg',
      'quantity': 1
    },
  ];

  void removeProduct(int index) {
    setState(() {
      products.removeAt(index);
    });
  }

  void updateQuantity(int index, int quantity) {
    setState(() {
      if (quantity <= 0) {
        products.removeAt(index);
      } else {
        products[index]['quantity'] = quantity;
      }
    });
  }

  double calculateTotalPrice() {
    return products.fold(0.0,
        (total, product) => total + product['price'] * product['quantity']);
  }

  String truncateText(String text) {
    if (text.length > 20) {
      return '${text.substring(0, 20)}...';
    } else {
      return text;
    }
  }

  void _finalizeOrder(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const AddressPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Koszyk"),
      body: Stack(
        children: [
          ListView.builder(
            padding: const EdgeInsets.only(bottom: 150.0),
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8.0),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Image.asset(
                        product['imagePath'],
                        width: 100,
                        height: 100,
                        fit: BoxFit.cover,
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              truncateText(product['name']),
                              style: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              '${product['price'].toStringAsFixed(2)} PLN',
                              style: const TextStyle(
                                  fontSize: 14, color: Colors.grey),
                            ),
                            const SizedBox(height: 5),
                            Row(
                              children: [
                                IconButton(
                                  icon: Icon(Icons.remove_circle),
                                  onPressed: () {
                                    updateQuantity(
                                        index, product['quantity'] - 1);
                                  },
                                ),
                                Text(product['quantity'].toString()),
                                IconButton(
                                  icon: const Icon(Icons.add_circle),
                                  onPressed: () {
                                    updateQuantity(
                                        index, product['quantity'] + 1);
                                  },
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () => removeProduct(index),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              padding: const EdgeInsets.all(16.0),
              color: Colors.white,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Łączna cena: ${calculateTotalPrice().toStringAsFixed(2)} PLN',
                    style: const TextStyle(
                        fontSize: 20, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.right,
                  ),
                  const SizedBox(height: 10),
                  ElevatedButton(
                    onPressed: () => _finalizeOrder(context),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                      padding: const EdgeInsets.symmetric(vertical: 12.0),
                    ),
                    child: const Text(
                      'Sfinalizuj zamówienie',
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}
