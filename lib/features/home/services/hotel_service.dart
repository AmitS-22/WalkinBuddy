import 'package:cloud_firestore/cloud_firestore.dart';

import '../models/hotel_model.dart';

class HotelService {
  final FirebaseFirestore firestore =
      FirebaseFirestore.instance;

  Stream<List<HotelModel>> getHotels() {
    return firestore
        .collection("hotels2")
        .snapshots()
        .map((snapshot) {
      return snapshot.docs.map((doc) {
        return HotelModel.fromMap(
          doc.data(),
          doc.id,
        );
      }).toList();
    });
  }
  
}