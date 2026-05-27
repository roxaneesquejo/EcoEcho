import 'package:flutter/material.dart';
import 'package:frontend/core/theme/app_theme.dart';
import 'package:frontend/features/auth/presentation/login_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EcoEcho',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      // Pointing the home property to the newly created LoginScreen
      home: const LoginScreen(),
    );
  }
}