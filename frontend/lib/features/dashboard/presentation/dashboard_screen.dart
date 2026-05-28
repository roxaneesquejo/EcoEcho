import 'package:flutter/material.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    Center(
      child: Text(
        'Home Placeholder',
        style: TextStyle(fontSize: 24, fontFamily: 'Inter', color: Color(0xFF154212)),
      ),
    ),
    Center(
      child: Text(
        'Community Placeholder',
        style: TextStyle(fontSize: 24, fontFamily: 'Inter', color: Color(0xFF154212)),
      ),
    ),
    Center(
      child: Text(
        'Leaderboard Placeholder',
        style: TextStyle(fontSize: 24, fontFamily: 'Inter', color: Color(0xFF154212)),
      ),
    ),
    Center(
      child: Text(
        'Profile Placeholder',
        style: TextStyle(fontSize: 24, fontFamily: 'Inter', color: Color(0xFF154212)),
      ),
    ),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAF5),
      appBar: AppBar(
        title: const Text('EcoEcho', style: TextStyle(fontFamily: 'Be Vietnam Pro', fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF154212),
        elevation: 0,
      ),
      body: _widgetOptions.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people_outline),
            activeIcon: Icon(Icons.people),
            label: 'Community',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.leaderboard_outlined),
            activeIcon: Icon(Icons.leaderboard),
            label: 'Leaderboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: const Color(0xFF154212),
        unselectedItemColor: const Color(0xFF72796E),
        showUnselectedLabels: true,
        type: BottomNavigationBarType.fixed,
        onTap: _onItemTapped,
      ),
    );
  }
}