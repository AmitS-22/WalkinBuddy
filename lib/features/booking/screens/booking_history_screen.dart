import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../services/booking_service.dart';

class BookingHistoryScreen extends StatefulWidget {
  const BookingHistoryScreen({super.key});

  @override
  State<BookingHistoryScreen> createState() =>
      _BookingHistoryScreenState();
}

class _BookingHistoryScreenState
    extends State<BookingHistoryScreen> {

  final BookingService bookingService =
      BookingService();

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("My Bookings"),
        centerTitle: true,
      ),

      body: StreamBuilder<QuerySnapshot>(

        stream: bookingService.getBookings(),

        builder: (context, snapshot) {

          if (snapshot.connectionState ==
              ConnectionState.waiting) {

            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (snapshot.hasError) {

            return const Center(
              child: Text("Something went wrong"),
            );
          }

          if (!snapshot.hasData ||
              snapshot.data!.docs.isEmpty) {

            return const Center(
              child: Text(
                "No Bookings Yet",
                style: TextStyle(
                  fontSize: 18,
                ),
              ),
            );
          }

          final bookings =
              snapshot.data!.docs;

          return ListView.builder(

            padding: const EdgeInsets.all(16),

            itemCount: bookings.length,

            itemBuilder: (context, index) {

              final booking = bookings[index];

              final data =
                  booking.data()
                      as Map<String, dynamic>;
                                    return Card(
                margin: const EdgeInsets.only(bottom: 15),
                elevation: 3,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment:
                        CrossAxisAlignment.start,
                    children: [

                      Row(
                        children: [

                          Expanded(
                            child: Text(
                              data["hotelName"],
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight:
                                    FontWeight.bold,
                              ),
                            ),
                          ),

                          IconButton(
                            onPressed: () async {

                              await bookingService
                                  .deleteBooking(
                                      booking.id);

                            },
                            icon: const Icon(
                              Icons.delete,
                              color: Colors.red,
                            ),
                          ),

                        ],
                      ),

                      const SizedBox(height: 10),

                      Row(
                        children: [

                          const Icon(
                            Icons.location_on,
                            color: Colors.red,
                            size: 18,
                          ),

                          const SizedBox(width: 5),

                          Expanded(
                            child: Text(
                              data["location"],
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 10),

                      Row(
                        children: [

                          const Icon(
                            Icons.hotel,
                            color: Colors.blue,
                          ),

                          const SizedBox(width: 5),

                          Text(
                            data["roomType"],
                          ),
                        ],
                      ),

                      const SizedBox(height: 10),

                      Row(
                        children: [

                          const Icon(
                            Icons.people,
                            color: Colors.green,
                          ),

                          const SizedBox(width: 5),

                          Text(
                            "${data["guests"]} Guests",
                          ),
                        ],
                      ),

                      const SizedBox(height: 10),

                      Row(
                        children: [

                          const Icon(
                            Icons.calendar_month,
                            color: Colors.orange,
                          ),

                          const SizedBox(width: 5),

                          Expanded(
                            child: Text(
                              "${(data["checkIn"] as Timestamp).toDate().day}/${(data["checkIn"] as Timestamp).toDate().month}/${(data["checkIn"] as Timestamp).toDate().year}"
                              "  →  "
                              "${(data["checkOut"] as Timestamp).toDate().day}/${(data["checkOut"] as Timestamp).toDate().month}/${(data["checkOut"] as Timestamp).toDate().year}",
                            ),
                          ),

                        ],
                      ),

                      const SizedBox(height: 15),

                      Text(
                        data["price"],
                        style: const TextStyle(
                          fontSize: 22,
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                    ],
                  ),
                ),
              );

            },
          );
        },
      ),
    );
  }
}