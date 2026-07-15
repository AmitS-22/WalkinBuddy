import 'package:flutter/material.dart';

class PaymentSuccessScreen extends StatelessWidget {
  final String hotelName;
  final String amount;
  final String paymentMethod;

  const PaymentSuccessScreen({
    super.key,
    required this.hotelName,
    required this.amount,
    required this.paymentMethod,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Payment Success"),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.check_circle,
                color: Colors.green,
                size: 120,
              ),

              const SizedBox(height: 20),

              const Text(
                "Payment Successful!",
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 30),

              Card(
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      ListTile(
                        leading: const Icon(Icons.hotel),
                        title: Text(hotelName),
                      ),

                      ListTile(
                        leading: const Icon(Icons.currency_rupee),
                        title: Text(amount),
                      ),

                      ListTile(
                        leading: const Icon(Icons.payment),
                        title: Text(paymentMethod),
                      ),
                    ],
                  ),
                ),
              ),

              const SizedBox(height: 30),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.popUntil(
                      context,
                      (route) => route.isFirst,
                    );
                  },
                  child: const Text(
                    "Back to Home",
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}