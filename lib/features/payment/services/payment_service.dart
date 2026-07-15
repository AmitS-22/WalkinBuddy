import 'package:cloud_firestore/cloud_firestore.dart';

class PaymentService {
  final FirebaseFirestore firestore =
      FirebaseFirestore.instance;

  Future<void> deletePayment(
    String paymentId,
  ) async {
    await firestore
        .collection("payments")
        .doc(paymentId)
        .delete();
  }

  Stream<QuerySnapshot> getPayments() {
    return firestore
        .collection("payments")
        .orderBy(
          "createdAt",
          descending: true,
        )
        .snapshots();
  }

  Future<void> makePayment({
    required String bookingId,
    required String hotelName,
    required String amount,
    required String paymentMethod,
  }) async {
    await firestore.collection("payments").add({
      "bookingId": bookingId,
      "hotelName": hotelName,
      "amount": amount,
      "paymentMethod": paymentMethod,
      "status": "Success",
      "createdAt": FieldValue.serverTimestamp(),
      
      
    });
  }
}