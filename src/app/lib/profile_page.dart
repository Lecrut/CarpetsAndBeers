import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  final bool _isLogged = true;
  ProfilePage({super.key});

  final List<Map<String, dynamic>> orders = [
    {'name': 'Dywan Perski', 'price': 150.00, 'imagePath': 'images/dywan.jpg'},
    {'name': 'Piwo Corona', 'price': 6.99, 'imagePath': 'images/corona.png'},
    {'name': 'Piwo Lech', 'price': 5.99, 'imagePath': 'images/lech.jpg'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Twój profil"),
      body: true
          ? SingleChildScrollView(
              child: Column(
                children: [
                  Container(
                    margin: EdgeInsets.only(top: 20, left: 16, right: 16),
                  ),
                  const SizedBox(height: 20),
                  const CircleAvatar(
                    radius: 50,
                    backgroundImage: AssetImage('images/lech.jpg'),
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'Jan Kowalski',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'jan.kowalski@example.com',
                    style: TextStyle(fontSize: 16, color: Colors.grey),
                  ),
                  const SizedBox(height: 30),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: orders.map((product) {
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: OrderCard(
                          id: product['id'],
                          orderDate: product['orderDate'],
                          totalPrice: product['totalPrice'],
                        ),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      TextButton.icon(
                        onPressed: () {
                          // edycja
                        },
                        icon: const Icon(Icons.edit, color: Colors.white),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue,
                          iconColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 25, vertical: 10),
                        ),
                        label: const Text(
                          'Edytuj profil',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(255, 255, 255, 255),
                          ),
                        ),
                      ),
                      const SizedBox(width: 20),
                      TextButton.icon(
                        onPressed: () {
                          // logout
                        },
                        icon: const Icon(Icons.logout, color: Colors.white),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.red,
                          iconColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 25, vertical: 10),
                        ),
                        label: const Text(
                          'Wyloguj',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color.fromARGB(255, 255, 255, 255),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          : SingleChildScrollView(),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}

class OrderCard extends StatelessWidget {
  final num id;
  final String orderDate;
  final double totalPrice;

  OrderCard(
      {required this.id, required this.orderDate, required this.totalPrice});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          SizedBox(height: 10),
          Text(
            id.toString(),
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 5),
          Text(
            '\$${totalPrice.toStringAsFixed(2)}',
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
