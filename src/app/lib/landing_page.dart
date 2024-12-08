import 'package:app/callouts/item_controller.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:app/shop_page.dart';
import 'package:flutter/material.dart';
import 'package:app/navigation/app_bar.dart';

import 'model/Item.dart';

class LandingPage extends StatefulWidget {
  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  late Future<List<Item>> _futureItems;

  @override
  void initState() {
    super.initState();
    _futureItems = ItemController.getAllItems();
  }

  void _navigateToProductList() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ShopPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Carpets & Beers"),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 20, left: 16, right: 16),
                ),
                Center(
                  child: Image.asset('images/banner2.jpg'),
                ),
                const SizedBox(height: 10),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 30.0),
                  child: Divider(
                    color: Colors.green,
                    thickness: 4.0,
                  ),
                ),
                const Text(
                  'Najnowsze produkty:',
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.green,
                  ),
                  textAlign: TextAlign.center,
                ),
                FutureBuilder<List<Item>>(
                  future: _futureItems,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      return Center(
                          child: Text('Error: ${snapshot.error.toString()}'));
                    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                      return Center(child: Text('No products available.'));
                    } else {
                      final items = snapshot.data!.take(3).toList();
                      return SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: items.map((item) {
                            return Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: ProductCard(
                                name: item.name,
                                price: item.price,
                                imagePath: item.imageUrl,
                              ),
                            );
                          }).toList(),
                        ),
                      );
                    }
                  },
                ),
              ],
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 16.0),
              child: FloatingActionButton.extended(
                onPressed: _navigateToProductList,
                backgroundColor: Colors.green,
                icon: const Icon(
                  Icons.list,
                  color: Colors.white,
                ),
                label: const Text(
                  'Lista produktów',
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
        ],
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

  String truncateText(String text) {
    if (text.length > 10) {
      return '${text.substring(0, 10)}...';
    } else {
      return text;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Image.network(
            imagePath,
            width: 100,
            height: 100,
          ),
          const SizedBox(height: 10),
          Text(
            truncateText(name),
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 5),
          Text(
            '${price.toStringAsFixed(2)} PLN',
            style: const TextStyle(fontSize: 14, color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
