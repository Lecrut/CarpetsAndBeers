import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class FinalOrderPage extends StatelessWidget {
  const FinalOrderPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: MyAppBar(pageTitle: "Finalizacja"),
      body: Center(
        child: Text(
          "Finalizacja",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ),
      bottomNavigationBar: BottomMenu(),
    );
  }
}
