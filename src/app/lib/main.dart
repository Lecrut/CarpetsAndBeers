import 'package:app/cart/cart_page.dart';
import 'package:app/landing_page.dart';
import 'package:app/profile_page.dart';
import 'package:app/wish_list_page.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MaterialApp(
    title: "CarpetsAndBeers",
    initialRoute: '/',
    routes: {
      '/': (context) => LandingPage(),
      '/cart': (context) => const CartPage(),
      '/profile': (context) => ProfilePage(),
      '/wish-list': (context) => const WishListPage(),
      // Add other routes here
    },
  ));
}
