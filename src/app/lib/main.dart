import 'package:app/landing_page.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MaterialApp(
    title: "CarpetsAndBeers",
    initialRoute: '/',
    routes: {
      '/': (context) => const LandingPage(),
      // Add other routes here
    },
  ));
}