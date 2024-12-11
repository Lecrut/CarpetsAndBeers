import 'package:app/providers/WishListProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'callouts/item_controller.dart';
import 'model/Item.dart';
import '../providers/ItemProvider.dart'; // Ścieżka do UserProvider

class ShopPage extends StatefulWidget {
  @override
  _ShopPageState createState() => _ShopPageState();
}

class _ShopPageState extends State<ShopPage> {
  TextEditingController searchController = TextEditingController();
  late Future<List<Item>> _futureItems;
  List<Item>? allProducts; // Cache of all products to filter

  @override
  void initState() {
    super.initState();
    _futureItems = ItemController.getAllItems();
    _futureItems.then((items) {
      allProducts = items; // Cache the original products list
    });
    searchController.addListener(filterProducts);
  }

  void filterProducts() {
    setState(() {
      if (allProducts != null) {
        final query = searchController.text.toLowerCase();
        final filtered = allProducts!
            .where((product) => product.name.toLowerCase().contains(query))
            .toList();
        _futureItems = Future.value(filtered); // Update the future
      }
    });
  }

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Nasze produkty")),
      body: Column(
        children: [
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
            child: FutureBuilder<List<Item>>(
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
                  final items = snapshot.data!;
                  return ListView(
                    children: items.map((item) {
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ProductTile(
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          imagePath: item.imageUrl,
                          category: item.category,
                          description: item.description,
                        ),
                      );
                    }).toList(),
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}

class ProductTile extends StatelessWidget {
  final String id;
  final String name;
  final double price;
  final String imagePath;
  final String category;
  final String description;

  ProductTile(
      {required this.id,
      required this.name,
      required this.price,
      required this.imagePath,
      required this.category,
      required this.description});

  void _addToCart(BuildContext context) {
    final item = Item(
        id: id,
        name: name,
        price: price,
        category: category,
        description: description,
        imageUrl: imagePath);
    Provider.of<ItemProvider>(context, listen: false).addItemToCart(item);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Dodano $name do koszyka'),
        duration: Duration(seconds: 2),
        backgroundColor: Color.fromARGB(255, 50, 196, 55),
      ),
    );
  }

  void _addToFavorite(BuildContext context) {
    final item = Item(
        id: id,
        name: name,
        price: price,
        category: category,
        description: description,
        imageUrl: imagePath);
    Provider.of<WishListProvider>(context, listen: false)
        .addItemToWishList(item);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Dodano $name do ulubionych'),
        duration: Duration(seconds: 2),
        backgroundColor: const Color.fromARGB(255, 241, 91, 154),
      ),
    );
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
            Image.network(
              imagePath,
              width: 100,
              height: 100,
              fit: BoxFit.cover,
            ),
            const SizedBox(width: 16),
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.5,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Text(truncateText(name)),
                  // Text(price.toStringAsFixed(2)),
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
                  onPressed: () => _addToCart(context),
                  icon: const Icon(Icons.shopping_cart_sharp,
                      color: Colors.green),
                ),
                IconButton(
                  onPressed: () => _addToFavorite(context),
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
