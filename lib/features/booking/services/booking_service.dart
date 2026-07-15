import 'package:cloud_firestore/cloud_firestore.dart';

class BookingService {
  final FirebaseFirestore firestore =
      FirebaseFirestore.instance;

  Future<void> bookHotel({
    required String hotelName,
    required String location,
    required String roomType,
    required String price,
    required int guests,
    required DateTime checkIn,
    required DateTime checkOut,
  }) async {

    await firestore.collection("bookings").add({

      "hotelName": hotelName,

      "location": location,

      "roomType": roomType,

      "price": price,

      "guests": guests,

      "checkIn": Timestamp.fromDate(checkIn),

      "checkOut": Timestamp.fromDate(checkOut),

      "createdAt":
          FieldValue.serverTimestamp(),

    });
  }
    Future<void> deleteBooking(
    String bookingId,
  ) async {
    await firestore
        .collection("bookings")
        .doc(bookingId)
        .delete();
  }

  Stream<QuerySnapshot> getBookings() {
    return firestore
        .collection("bookings")
        .orderBy(
          "createdAt",
          descending: true,
        )
        .snapshots();
  }

  Future<void> updateBooking({
    required String bookingId,
    required String roomType,
    required int guests,
    required DateTime checkIn,
    required DateTime checkOut,
  }) async {
    await firestore
        .collection("bookings")
        .doc(bookingId)
        .update({
      "roomType": roomType,
      "guests": guests,
      "checkIn": Timestamp.fromDate(checkIn),
      "checkOut": Timestamp.fromDate(checkOut),
    });
  }
}