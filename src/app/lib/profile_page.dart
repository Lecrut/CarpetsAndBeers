import 'dart:convert';

import 'package:app/callouts/order_controller.dart';
import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:app/providers/UserProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'RegisterPage.dart';
import 'callouts/UserController.dart';
import 'model/Order.dart';
import 'model/User.dart';

class ProfilePage extends StatefulWidget {
  ProfilePage({super.key});
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  late Future<List<Order>> orders;
  bool _isLogged = false;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Check if user is logged in
    _isLogged = Provider.of<UserProvider>(context, listen: false).isLogged;
    if (_isLogged) {
      _fetchOrders();
    }
  }

  void _fetchOrders() {
    String? userId = Provider.of<UserProvider>(context, listen: false).user?.id;
    if (userId != null) {
      setState(() {
        orders = OrderController.getUserOrders(userId);
      });
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void logIn() {
    setState(() {
      _isLogged = true;
    });
    _fetchOrders();
  }

  void logOut() {
    setState(() {
      _isLogged = false;
    });
  }

  void goToRegister() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const RegisterPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    _isLogged = Provider.of<UserProvider>(context).isLogged;

    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Twój profil"),
      body: _isLogged
          ? SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: const EdgeInsets.only(top: 20, left: 16, right: 16),
            ),
            const SizedBox(height: 20),
            const CircleAvatar(
              radius: 50,
              backgroundImage: AssetImage('images/lech.jpg'),
            ),
            const SizedBox(height: 20),
            Text(
              Provider.of<UserProvider>(context).user!.name ?? 'brak',
              style: const TextStyle(
                  fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text(
              Provider.of<UserProvider>(context).user!.email,
              style: const TextStyle(fontSize: 16, color: Colors.grey),
            ),
            const SizedBox(height: 30),
            FutureBuilder<List<Order>>(
              future: orders,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(
                      child: Text('Error: ${snapshot.error.toString()}'));
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  return Center(child: Text('No orders available.'));
                } else {
                  final orders = snapshot.data!;
                  return SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: orders.map((order) {
                        return Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: OrderCard(
                            id: order.id,
                            orderDate: order.orderDate,
                            totalPrice: order.price,
                          ),
                        );
                      }).toList(),
                    ),
                  );
                }
              },
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextButton.icon(
                  onPressed: () {
                    // Handle edit profile
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
                    Provider.of<UserProvider>(context, listen: false)
                        .logout();
                    logOut();
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
          : SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.8,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextFormField(
                      controller: _emailController,
                      decoration: const InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.emailAddress,
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _passwordController,
                      decoration: const InputDecoration(
                        labelText: 'Hasło',
                        border: OutlineInputBorder(),
                      ),
                      obscureText: true,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  try {
                    User user = User(
                      email: _emailController.text,
                      password: _passwordController.text,
                    );
                    final response = await UserController.loginUser(user);

                    if (response.statusCode == 200) {
                      user.name = jsonDecode(response.body)['name'];
                      user.id = jsonDecode(response.body)['id'];
                      Provider.of<UserProvider>(context, listen: false)
                          .login(user);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('Logowanie się powiodło!')),
                      );
                      logIn();
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Błąd: ${response.body}')),
                      );
                    }
                  } catch (error) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Wystąpił błąd: $error')),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                ),
                child: const Text(
                  'Zaloguj',
                  style: TextStyle(color: Colors.white),
                ),
              ),
              TextButton(
                onPressed: goToRegister,
                child: const Text('Nie masz konta? Zarejestruj się'),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}

class OrderCard extends StatelessWidget {
  final String id;
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
          const SizedBox(height: 5),
          Text(
            orderDate,
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
          const SizedBox(height: 5),
          Text(
            totalPrice.toStringAsFixed(2) + ' PLN',
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
