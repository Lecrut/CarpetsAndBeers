import 'package:app/cart/cart_page.dart';
import 'package:app/landing_page.dart';
import 'package:app/profile_page.dart';
import 'package:app/providers/UserProvider.dart';
import 'package:app/providers/ItemProvider.dart';
import 'package:app/providers/WishListProvider.dart';
import 'package:app/wish_list_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(fileName: ".env");

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => UserProvider()),
        ChangeNotifierProvider(create: (_) => ItemProvider()),
        ChangeNotifierProvider(create: (_) => WishListProvider()),
      ],
      child: MaterialApp(
        title: "CarpetsAndBeers",
        initialRoute: '/',
        routes: {
          '/': (context) => LandingPage(),
          '/cart': (context) => const CartPage(),
          '/profile': (context) => ProfilePage(),
          '/wish-list': (context) => const WishListPage(),
        },
      ),
    ),
  );
}
