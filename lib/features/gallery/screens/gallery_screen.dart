import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';

class GalleryScreen extends StatelessWidget {
  final List<String> images;

  const GalleryScreen({
    super.key,
    required this.images,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
      ),
      body: PageView.builder(
        itemCount: images.length,
        itemBuilder: (context, index) {
          return PhotoView(
            imageProvider: NetworkImage(
              images[index],
            ),
          );
        },
      ),
    );
  }
}