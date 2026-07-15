import 'dart:async';

import 'package:flutter/material.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(

        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,

          children: [

            Icon(
              Icons.hotel_rounded,
              size: 90,
              color: Colors.blue,
            ),

            SizedBox(height: 20),

            Text(
              "WalkinBuddy",
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
              ),
            ),

            SizedBox(height: 8),

            Text(
              "Smart Hospitality & Safety",
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),

          ],
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();

    Timer(
      const Duration(seconds: 2),
      () {

        // Next Screen
        // Navigator.pushReplacement(...);

      },
    );
  }
}