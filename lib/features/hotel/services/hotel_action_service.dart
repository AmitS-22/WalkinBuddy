import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';

class HotelActionService {
  Future<void> callHotel(String phone) async {
    final Uri uri = Uri.parse("tel:$phone");

    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  Future<void> openMaps(String location) async {
    final Uri uri = Uri.parse(
      "https://www.google.com/maps/search/?api=1&query=$location",
    );

    if (await canLaunchUrl(uri)) {
      await launchUrl(
        uri,
        mode: LaunchMode.externalApplication,
      );
    }
  }

  Future<void> shareHotel({
    required String hotelName,
    required String location,
    required String price,
  }) async {
    await SharePlus.instance.share(
      ShareParams(
        text:
            "🏨 $hotelName\n📍 $location\n💰 Starting From $price\n\nBooked using WalkinBuddy",
      ),
    );
  }
}