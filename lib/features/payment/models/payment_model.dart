class PaymentModel {
  final String bookingId;
  final String hotelName;
  final String amount;
  final String paymentMethod;
  final String status;
  final DateTime createdAt;

  PaymentModel({
    required this.bookingId,
    required this.hotelName,
    required this.amount,
    required this.paymentMethod,
    required this.status,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      "bookingId": bookingId,
      "hotelName": hotelName,
      "amount": amount,
      "paymentMethod": paymentMethod,
      "status": status,
      "createdAt": createdAt,
    };
  }
}