import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class LandingPage extends StatefulWidget {
  @override
  _LandingPageState createState() => _LandingPageState();
}

class _LandingPageState extends State<LandingPage> {
  @override
  void initState() {
    super.initState();
    // final itemStore = Provider.of<ItemStore>(context, listen: false);
    // itemStore.fetchItems();
  }

  @override
  Widget build(BuildContext context) {
    // final itemStore = Provider.of<ItemStore>(context);
    // final items = itemStore.items;

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(top: 20, left: 16, right: 16),
            ),
            const SizedBox(height: 20),
            const Text(
              'Polecane produkty',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            // GridView.builder(
            //     shrinkWrap: true,
            //     physics: NeverScrollableScrollPhysics(),
            //     padding: EdgeInsets.all(16),
            //     gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            //       crossAxisCount: 2, // adjust according to your design
            //       crossAxisSpacing: 16,
            //       mainAxisSpacing: 16,
            //       childAspectRatio: 0.7, // adjust according to your design
            //     )),
          ],
        ),
      ),
      bottomNavigationBar: BottomMenu(),
    );
  }
}
