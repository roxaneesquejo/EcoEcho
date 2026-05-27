import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAF5), // surface color
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 60),
              // Brand Identity
              Center(
                child: Image.asset(
                  'assets/images/logo.png',
                  height: 100,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'EcoEcho',
                style: theme.textTheme.displayLarge?.copyWith(
                  fontFamily: 'Be Vietnam Pro', // Heading font
                  color: const Color(0xFF154212), // Primary Forest Green
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                'Join the movement for a greener planet',
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontFamily: 'Inter', // Body font
                  color: const Color(0xFF42493E), // on-surface-variant
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),
              
              // Input Fields
              const Text(
                'Email',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                  color: Color(0xFF191C1A),
                ),
              ),
              const SizedBox(height: 8),
              const TextField(
                decoration: InputDecoration(
                  hintText: 'name@example.com',
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 20),
              const Text(
                'Password',
                style: TextStyle(
                  fontFamily: 'Inter',
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                  color: Color(0xFF191C1A),
                ),
              ),
              const SizedBox(height: 8),
              const TextField(
                obscureText: true,
                decoration: InputDecoration(
                  hintText: 'Enter your password',
                ),
              ),
              
              const SizedBox(height: 32),
              
              // Action Button
              ElevatedButton(
                onPressed: () {
                  // Logic for Auth BLoC connection (Issue #2)
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF154212), // Forest Green
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8), // 0.5rem radius
                  ),
                ),
                child: const Text('SIGN IN'),
              ),
              
              const SizedBox(height: 24),
              
              // Social Auth Placeholder
              Row(
                children: [
                  const Expanded(child: Divider(color: Color(0xFFC2C9BB))),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text('OR', style: theme.textTheme.bodySmall),
                  ),
                  const Expanded(child: Divider(color: Color(0xFFC2C9BB))),
                ],
              ),
              
              const SizedBox(height: 24),
              
              OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.g_mobiledata, size: 28),
                label: const Text('Continue with Google'),
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Color(0xFF72796E)), // Outline color
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
              
              const SizedBox(height: 40),
              
              // Navigation to Signup
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Don't have an account? "),
                  GestureDetector(
                    onTap: () {
                      // Navigate to Signup
                    },
                    child: const Text(
                      'Sign Up',
                      style: TextStyle(
                        color: Color(0xFF154212),
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}