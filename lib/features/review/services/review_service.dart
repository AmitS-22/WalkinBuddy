import 'package:cloud_firestore/cloud_firestore.dart';

import '../models/review_model.dart';

class ReviewService {
  final FirebaseFirestore firestore =
      FirebaseFirestore.instance;

  /// Add Review
  Future<void> addReview({
    required String hotelId,
    required String userName,
    required String review,
    required double rating,
  }) async {
    await firestore
        .collection("reviews")
        .doc(hotelId)
        .collection("userReviews")
        .add({
      "userName": userName,
      "review": review,
      "rating": rating,
      "createdAt": FieldValue.serverTimestamp(),
    });
  }

  /// Delete Review
  Future<void> deleteReview({
    required String hotelId,
    required String reviewId,
  }) async {
    await firestore
        .collection("reviews")
        .doc(hotelId)
        .collection("userReviews")
        .doc(reviewId)
        .delete();
  }

  /// Get Reviews
  Stream<List<ReviewModel>> getReviews(
    String hotelId,
  ) {
    return firestore
        .collection("reviews")
        .doc(hotelId)
        .collection("userReviews")
        .orderBy(
          "createdAt",
          descending: true,
        )
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map(
                (doc) => ReviewModel.fromMap(
                  doc.data(),
                  doc.id,
                ),
              )
              .toList(),
        );
  }
}