import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FavoriteService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> addFavorite({
    required String hotelId,
    required String hotelName,
    required String image,
    required String location,
    required String price,
    required double rating,
  }) async {
    final user = _auth.currentUser;

    if (user == null) return;

    await _firestore
        .collection("favorites")
        .doc(user.uid)
        .collection("hotels")
        .doc(hotelId)
        .set({
      "hotelName": hotelName,
      "image": image,
      "location": location,
      "price": price,
      "rating": rating,
      "createdAt": FieldValue.serverTimestamp(),
    });
  }

  Stream<QuerySnapshot> getFavorites() {
    final user = _auth.currentUser;

    if (user == null) {
      return const Stream.empty();
    }

    return _firestore
        .collection("favorites")
        .doc(user.uid)
        .collection("hotels")
        .orderBy(
          "createdAt",
          descending: true,
        )
        .snapshots();
  }

  Future<bool> isFavorite(String hotelId) async {
    final user = _auth.currentUser;

    if (user == null) return false;

    final doc = await _firestore
        .collection("favorites")
        .doc(user.uid)
        .collection("hotels")
        .doc(hotelId)
        .get();

    return doc.exists;
  }

  Future<void> removeFavorite(String hotelId) async {
    final user = _auth.currentUser;

    if (user == null) return;

    await _firestore
        .collection("favorites")
        .doc(user.uid)
        .collection("hotels")
        .doc(hotelId)
        .delete();
  }
}