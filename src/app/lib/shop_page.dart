import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';
import 'package:app/navigation/app_bar.dart';

class ShopPage extends StatefulWidget {
  @override
  _ShopPageState createState() => _ShopPageState();
}

class _ShopPageState extends State<ShopPage> {
  final List<Map<String, dynamic>> products = [
    {
      'name': 'Dywan Perski testuje sobie naze',
      'price': 150.00,
      'imagePath': 'images/dywan.jpg'
    },
    {'name': 'Piwo Corona', 'price': 6.99, 'imagePath': 'images/corona.png'},
    {'name': 'Piwo Lech', 'price': 5.99, 'imagePath': 'images/lech.jpg'},
  ];

  late List<Map<String, dynamic>> filteredProducts;
  TextEditingController searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    filteredProducts = products;
    searchController.addListener(() {
      filterProducts();
    });
  }

  void filterProducts() {
    setState(() {
      filteredProducts = products
          .where((product) => product['name']
              .toLowerCase()
              .contains(searchController.text.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: const MyAppBar(pageTitle: "Shop"),
      body: Column(
        children: [
          const SizedBox(height: 20.0),
          const Text(
            'Nasze produkty',
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.green,
              fontSize: 42.0,
            ),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 30.0),
            child: Divider(
              color: Colors.green,
              thickness: 4.0,
            ),
          ),
          SizedBox(height: 10),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: searchController,
              decoration: const InputDecoration(
                labelText: 'Wyszukaj produkt',
                hintText: 'Jakie piwko wariacie?',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(25.0)),
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(8.0),
              itemCount: filteredProducts.length,
              itemBuilder: (context, index) {
                final product = filteredProducts[index];
                return ProductTile(
                  name: product['name'],
                  price: product['price'],
                  imagePath: product['imagePath'],
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomMenu(),
    );
  }
}

class ProductTile extends StatelessWidget {
  final String name;
  final double price;
  final String imagePath;

  ProductTile(
      {required this.name, required this.price, required this.imagePath});

  void _addToCart() {
    // dodanie do koszyka
  }

  void _addToFavorite() {
    // dodanie do ulubionych
  }

  String truncateText(String text) {
    if (text.length > 20) {
      return '${text.substring(0, 20)}...';
    } else {
      return text;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(
          children: [
            Image.asset(
              imagePath,
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
                    truncateText(name),
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    '${price.toStringAsFixed(2)} PLN',
                    style: TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                ],
              ),
            ),
            Column(
              children: [
                IconButton(
                  onPressed: _addToCart,
                  icon: const Icon(Icons.shopping_cart_sharp,
                      color: Colors.green),
                ),
                IconButton(
                  onPressed: _addToFavorite,
                  icon: const Icon(Icons.favorite, color: Colors.red),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
