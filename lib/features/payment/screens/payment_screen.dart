import 'package:flutter/material.dart';

import '../../booking/services/booking_service.dart';
import '../services/payment_service.dart';
import 'payment_success_screen.dart';

class PaymentScreen extends StatefulWidget {
  final String hotelName;
  final String location;
  final String roomType;
  final String amount;
  final int guests;
  final DateTime checkIn;
  final DateTime checkOut;

  const PaymentScreen({
    super.key,
    required this.hotelName,
    required this.location,
    required this.roomType,
    required this.amount,
    required this.guests,
    required this.checkIn,
    required this.checkOut,
  });

  @override
  State<PaymentScreen> createState() =>
      _PaymentScreenState();
}

class _PaymentScreenState
    extends State<PaymentScreen> {
  final PaymentService paymentService =
      PaymentService();

  final BookingService bookingService =
      BookingService();

  bool loading = false;

  String paymentMethod = "UPI";

  final List<String> methods = [
    "UPI",
    "Credit Card",
    "Debit Card",
    "Net Banking",
    "Wallet",
    "Pay at Hotel",
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Payment"),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment:
              CrossAxisAlignment.start,
          children: [

            const Text(
              "Booking Summary",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 20),

            Card(
              elevation: 3,
              child: Padding(
                padding: const EdgeInsets.all(15),
                child: Column(
                  children: [

                    ListTile(
                      leading: const Icon(Icons.hotel),
                      title: Text(widget.hotelName),
                      subtitle: Text(widget.location),
                    ),

                    const Divider(),

                    ListTile(
                      leading: const Icon(Icons.bed),
                      title: Text(widget.roomType),
                    ),

                    const Divider(),

                    ListTile(
                      leading: const Icon(Icons.people),
                      title: Text(
                        "${widget.guests} Guests",
                      ),
                    ),

                    const Divider(),

                    ListTile(
                      leading: const Icon(Icons.date_range),
                      title: Text(
                        "${widget.checkIn.day}/${widget.checkIn.month}/${widget.checkIn.year}",
                      ),
                      subtitle: Text(
                        "${widget.checkOut.day}/${widget.checkOut.month}/${widget.checkOut.year}",
                      ),
                    ),

                    const Divider(),

                    ListTile(
                      leading: const Icon(
                        Icons.currency_rupee,
                      ),
                      title: Text(
                        widget.amount,
                        style: const TextStyle(
                          fontWeight:
                              FontWeight.bold,
                          fontSize: 22,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 25),

            const Text(
              "Select Payment Method",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            Expanded(
              child: ListView.builder(
                itemCount: methods.length,
                itemBuilder: (context, index) {
                  return Card(
                    child: RadioListTile<String>(
                      value: methods[index],
                      groupValue: paymentMethod,
                      title: Text(
                        methods[index],
                      ),
                      onChanged: (value) {
                        setState(() {
                          paymentMethod =
                              value!;
                        });
                      },
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 20),

            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton.icon(
                icon: loading
                    ? const SizedBox(
                        width: 22,
                        height: 22,
                        child:
                            CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2,
                        ),
                      )
                    : const Icon(Icons.lock),

                label: Text(
                  loading
                      ? "Processing..."
                      : "Pay Now",
                ),

                onPressed: loading
                    ? null
                    : () async {
                        setState(() {
                          loading = true;
                        });

                        try {

                          await paymentService.makePayment(
                            bookingId: DateTime.now()
                                .millisecondsSinceEpoch
                                .toString(),
                            hotelName:
                                widget.hotelName,
                            amount: widget.amount,
                            paymentMethod:
                                paymentMethod,
                          );

                          await bookingService.bookHotel(
                            hotelName:
                                widget.hotelName,
                            location:
                                widget.location,
                            roomType:
                                widget.roomType,
                            price:
                                widget.amount,
                            guests:
                                widget.guests,
                            checkIn:
                                widget.checkIn,
                            checkOut:
                                widget.checkOut,
                          );

                          if (!mounted) return;

                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (_) =>
                                  PaymentSuccessScreen(
                                hotelName:
                                    widget.hotelName,
                                amount:
                                    widget.amount,
                                paymentMethod:
                                    paymentMethod,
                              ),
                            ),
                          );

                        } catch (e) {

                          if (!mounted) return;

                          ScaffoldMessenger.of(
                            context,
                          ).showSnackBar(
                            SnackBar(
                              content: Text(
                                e.toString(),
                              ),
                            ),
                          );
                        }

                        if (mounted) {
                          setState(() {
                            loading = false;
                          });
                        }
                      },
              ),
            ),

            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}