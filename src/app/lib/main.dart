import 'package:app/cart/cart_page.dart';
import 'package:app/landing_page.dart';
import 'package:app/profile_page.dart';
import 'package:app/wish_list_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
// import 'package:flutter/services.dart' show rootBundle;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // // Load the .env file from assets
  // final envString = await rootBundle.loadString('.env');
  await dotenv.load(fileName: "../../.env");

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
