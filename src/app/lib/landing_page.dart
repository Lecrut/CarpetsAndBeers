import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';
import 'package:app/navigation/app_bar.dart';

class LandingPage extends StatefulWidget {
  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  final List<Map<String, dynamic>> products = [
    {'name': 'Dywan Perski', 'price': 150.00, 'imagePath': 'images/dywan.jpg'},
    {'name': 'Piwo Corona', 'price': 6.99, 'imagePath': 'images/corona.png'},
    {'name': 'Piwo Lech', 'price': 5.99, 'imagePath': 'images/lech.jpg'},
  ];

  @override
  void initState() {
    super.initState();
    // final itemStore = Provider.of<ItemStore>(context, listen: false);
    // itemStore.fetchItems();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Carpets & Beers"),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(top: 20, left: 16, right: 16),
            ),
            Center(
              child: Image.asset('images/banner2.jpg'),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // funkcja do logowania
                  },
                  style: ElevatedButton.styleFrom(
                    iconColor: Colors.green,
                    backgroundColor: Colors.green,
                  ),
                  child: const Text(
                    'Zaloguj',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                ElevatedButton(
                  onPressed: () {
                    // funkcja do rejestracji
                  },
                  style: ElevatedButton.styleFrom(
                    iconColor: Colors.blue,
                    backgroundColor: Colors.green,
                  ),
                  child: const Text(
                    'Zarejestruj',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 30.0),
              child: Divider(
                color: Colors.green,
                thickness: 4.0,
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Najnowsze produkty:',
              style: TextStyle(
                fontSize: 20,
                color: Colors.green,
              ),
              textAlign: TextAlign.center,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: products.map((product) {
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: ProductCard(
                    name: product['name'],
                    price: product['price'],
                    imagePath: product['imagePath'],
                  ),
                );
              }).toList(),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomMenu(),
    );
  }
}

class ProductCard extends StatelessWidget {
  final String name;
  final double price;
  final String imagePath;

  ProductCard(
      {required this.name, required this.price, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Image.asset(
            imagePath,
            width: 100,
            height: 100,
          ),
          SizedBox(height: 10),
          Text(
            name,
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 5),
          Text(
            '\$${price.toStringAsFixed(2)}',
            style: TextStyle(fontSize: 14, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
