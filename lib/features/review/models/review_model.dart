class ReviewModel {
  final String id;
  final String userName;
  final String review;
  final double rating;
  final DateTime createdAt;

  ReviewModel({
    required this.id,
    required this.userName,
    required this.review,
    required this.rating,
    required this.createdAt,
  });

  factory ReviewModel.fromMap(
    Map<String, dynamic> map,
    String id,
  ) {
    return ReviewModel(
      id: id,
      userName: map["userName"] ?? "",
      review: map["review"] ?? "",
      rating: (map["rating"] ?? 0).toDouble(),
      createdAt: map["createdAt"]?.toDate() ??
          DateTime.now(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      "userName": userName,
      "review": review,
      "rating": rating,
      "createdAt": createdAt,
    };
  }
}