import 'package:app/model/Item.dart';
import 'package:app/ordering/address_page.dart';
import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:app/providers/ItemProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  _CartPageState createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  List<Map<String, dynamic>> _cartProducts = [];

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () async {
      final itemProvider = Provider.of<ItemProvider>(context, listen: false);
      await itemProvider.loadCartItems();
      setState(() {
        _cartProducts = itemProvider.cartItems.map((item) {
          return {
            'item': item,
            'quantity': 1,
          };
        }).toList();
      });
    });
  }

  void removeProduct(int index) {
    setState(() {
      Item itemToDelete = _cartProducts[index]['item'];
      Provider.of<ItemProvider>(context, listen: false)
          .removeItemFromCart(itemToDelete);
      _cartProducts.removeAt(index);
    });
  }

  void updateQuantity(int index, int quantity) {
    setState(() {
      if (quantity <= 0) {
        Item itemToDelete = _cartProducts[index]['item'];
        Provider.of<ItemProvider>(context, listen: false)
            .removeItemFromCart(itemToDelete);
        _cartProducts.removeAt(index);
      } else {
        _cartProducts[index]['quantity'] = quantity;
      }
    });
  }

  double calculateTotalPrice() {
    return _cartProducts.fold(0.0, (total, product) {
      return total + product['item'].price * product['quantity'];
    });
  }

  String truncateText(String text) {
    if (text.length > 20) {
      return '${text.substring(0, 20)}...';
    } else {
      return text;
    }
  }

  void _finalizeOrder(BuildContext context) {
    final products = _cartProducts.map((product) {
      return {
        'item': product['item'],
        'quantity': product['quantity'],
      };
    }).toList();
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AddressPage(products: products),
      ),
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
            itemCount: _cartProducts.length,
            itemBuilder: (context, index) {
              final product = _cartProducts[index];
              final item = product['item'] as Item;
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8.0),
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    children: [
                      Image.network(
                        item.imageUrl,
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
                              truncateText(item.name),
                              style: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 5),
                            Text(
                              '${item.price.toStringAsFixed(2)} PLN',
                              style: const TextStyle(
                                  fontSize: 14, color: Colors.grey),
                            ),
                            const SizedBox(height: 5),
                            Row(
                              children: [
                                IconButton(
                                  icon: const Icon(Icons.remove_circle),
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
                        onPressed: () => setState(() {
                          removeProduct(index);
                        }),
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
