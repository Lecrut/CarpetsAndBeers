import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String pageTitle;

  const MyAppBar({super.key, required this.pageTitle});

  @override
  Widget build(BuildContext context) {
    return PreferredSize(
      preferredSize: const Size.fromHeight(kToolbarHeight),
      child: AppBar(
        title: Column(
          children: [
            Text(
              pageTitle,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: Colors.green,
                fontSize: 42.0,
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 30.0),
              child: Divider(
                color: Colors.green,
                thickness: 4.0,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
