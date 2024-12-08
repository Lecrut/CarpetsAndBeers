import 'package:flutter/material.dart';

Widget buildStepIndicator(String title, bool isActive) {
  return Column(
    children: [
      CircleAvatar(
        radius: 15,
        backgroundColor: isActive ? Colors.green : Colors.grey,
        child: Icon(
          Icons.check,
          color: Colors.white,
          size: 15,
        ),
      ),
      const SizedBox(height: 5),
      Text(
        title,
        style: TextStyle(
          color: isActive ? Colors.green : Colors.grey,
          fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
        ),
      ),
    ],
  );
}
