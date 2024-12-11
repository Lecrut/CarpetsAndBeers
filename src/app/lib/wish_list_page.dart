import 'package:app/model/Item.dart';
import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:app/providers/ItemProvider.dart';
import 'package:app/providers/WishListProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class WishListPage extends StatefulWidget {
  const WishListPage({super.key});

  @override
  _WishListPageState createState() => _WishListPageState();
}

class _WishListPageState extends State<WishListPage> {
  // final List<Map<String, dynamic>> products = [
  //   {'name': 'Dywan Perski', 'price': 150.00, 'imagePath': 'images/dywan.jpg'},
  //   {'name': 'Piwo Corona', 'price': 6.99, 'imagePath': 'images/corona.png'},
  //   {'name': 'Piwo Lech', 'price': 5.99, 'imagePath': 'images/lech.jpg'},
  // ];
  var _wishList = [];

  @override
  void initState() {
    super.initState();
    var wishListProvider =
        Provider.of<WishListProvider>(context, listen: false);
    _wishList = wishListProvider.wishList;
  }

  void removeProduct(int index) {
    setState(() {
      Item itemToDelete = _wishList[index];
      Provider.of<WishListProvider>(context, listen: false)
          .removeItemFromWishList(itemToDelete);
      _wishList.removeAt(index);
    });
  }

  String truncateText(String text) {
    if (text.length > 20) {
      return '${text.substring(0, 20)}...';
    } else {
      return text;
    }
  }

  void _addToCart(BuildContext context, String name, Item item) {
    Provider.of<ItemProvider>(context, listen: false).addItemToCart(item);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Dodano $name do koszyka'),
        duration: const Duration(seconds: 2),
        backgroundColor: const Color.fromARGB(255, 50, 196, 55),
      ),
    );
  }

  void _deleteFromFavorite(BuildContext context, String name) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Usunięto $name z ulubionych'),
        duration: const Duration(seconds: 2),
        backgroundColor: const Color.fromARGB(255, 241, 91, 154),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    var wishListProvider = Provider.of<WishListProvider>(context);
    var products = wishListProvider.wishList;
    _wishList = products;

    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Lista życzeń"),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          final product = products[index];
          return Card(
            margin: const EdgeInsets.symmetric(vertical: 8.0),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Image.network(
                    product.imageUrl,
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
                          truncateText(product.name),
                          style: const TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          '${product.price.toStringAsFixed(2)} PLN',
                          style:
                              const TextStyle(fontSize: 14, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    children: [
                      IconButton(
                        onPressed: () =>
                            _addToCart(context, product.name, product),
                        icon: const Icon(Icons.shopping_cart_sharp,
                            color: Colors.green),
                      ),
                      IconButton(
                        onPressed: () => {
                          removeProduct(index),
                          _deleteFromFavorite(context, product.name),
                        },
                        icon: const Icon(Icons.delete, color: Colors.red),
                      ),
                    ],
                  )
                ],
              ),
            ),
          );
        },
      ),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}
