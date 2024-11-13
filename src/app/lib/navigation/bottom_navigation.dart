import 'package:flutter/material.dart';

class BottomMenu extends StatefulWidget {
  const BottomMenu({super.key});

  @override
  _BottomMenuState createState() => _BottomMenuState();
}

class _BottomMenuState extends State<BottomMenu> {
  int _selectedIndex = 0;
  static const List<String> routes = ['/', '/cart', '/wish-list', '/profile'];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _updateSelectedIndex();
  }

  void _onItemTapped(int index) {
    String currentRoute = ModalRoute.of(context)?.settings.name ?? '';
    if (currentRoute != routes[index]) {
      setState(() {
        _selectedIndex = index;
      });
      Navigator.of(context).pushReplacementNamed(routes[index]).then((_) {
        _updateSelectedIndex();
      });
    }
  }

  void _updateSelectedIndex() {
    String currentRoute = ModalRoute.of(context)?.settings.name ?? '';
    int newIndex = routes.indexOf(currentRoute);
    if (newIndex != -1) {
      setState(() {
        _selectedIndex = newIndex;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Strona Główna',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.shopping_cart),
          label: 'Koszyk',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.favorite),
          label: 'Lista życzeń',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profil',
        ),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.green,
      unselectedItemColor: Colors.grey,
      backgroundColor: Colors.yellowAccent,
      onTap: _onItemTapped,
    );
  }
}
