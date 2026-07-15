import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../services/review_service.dart';

class AddReviewScreen extends StatefulWidget {
  final String hotelId;

  const AddReviewScreen({
    super.key,
    required this.hotelId,
  });

  @override
  State<AddReviewScreen> createState() =>
      _AddReviewScreenState();
}

class _AddReviewScreenState
    extends State<AddReviewScreen> {

  final ReviewService reviewService =
      ReviewService();

  final TextEditingController reviewController =
      TextEditingController();

  double rating = 5;

  bool loading = false;

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      appBar: AppBar(
        title: const Text("Write Review"),
        centerTitle: true,
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),

        child: Column(
          crossAxisAlignment:
              CrossAxisAlignment.start,

          children: [

            const Text(
              "Rate this Hotel",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 20),

            Slider(
              value: rating,
              min: 1,
              max: 5,
              divisions: 4,
              label: rating.toString(),

              onChanged: (value) {
                setState(() {
                  rating = value;
                });
              },
            ),

            Center(
              child: Text(
                "${rating.toStringAsFixed(1)} ⭐",
                style: const TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            const SizedBox(height: 30),

            TextField(
              controller: reviewController,
              maxLines: 5,
              decoration: const InputDecoration(
                hintText:
                    "Write your review...",
                border: OutlineInputBorder(),
              ),
            ),

            const Spacer(),

            SizedBox(
              width: double.infinity,
              height: 55,

              child: ElevatedButton(

                onPressed: loading
                    ? null
                    : () async {

                        if (reviewController.text
                            .trim()
                            .isEmpty) {
                          return;
                        }

                        setState(() {
                          loading = true;
                        });

                        final user =
                            FirebaseAuth
                                .instance
                                .currentUser;

                        await reviewService.addReview(
                          hotelId: widget.hotelId,
                          userName:
                              user?.displayName ??
                                  "Anonymous",
                          review:
                              reviewController.text
                                  .trim(),
                          rating: rating,
                        );

                        if (!mounted) return;

                        Navigator.pop(context);
                      },

                child: loading
                    ? const CircularProgressIndicator(
                        color: Colors.white,
                      )
                    : const Text(
                        "Submit Review",
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}