import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class WishListPage extends StatelessWidget {
  const WishListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(pageTitle: "Lista życzeń"),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(top: 20, left: 16, right: 16),
            ),
            const SizedBox(height: 20),
            const Text(
              'Wish List',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}
