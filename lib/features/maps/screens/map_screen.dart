import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {

  GoogleMapController? mapController;

  LatLng currentLocation = const LatLng(
    30.3165,
    78.0322,
  );

  bool loading = true;

  final Set<Marker> markers = {};

  @override
  Widget build(BuildContext context) {

    if (loading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(

      appBar: AppBar(
        title: const Text("Nearby Hotels"),
        centerTitle: true,
      ),

      body: GoogleMap(

        initialCameraPosition: CameraPosition(
          target: currentLocation,
          zoom: 15,
        ),

        myLocationEnabled: true,

        myLocationButtonEnabled: true,

        zoomControlsEnabled: false,

        markers: markers,

        onMapCreated: (controller) {
          mapController = controller;
        },
              ),

      floatingActionButton: FloatingActionButton(
        onPressed: () async {

          Position position =
              await Geolocator.getCurrentPosition(
            desiredAccuracy: LocationAccuracy.high,
          );

          mapController?.animateCamera(
            CameraUpdate.newCameraPosition(
              CameraPosition(
                target: LatLng(
                  position.latitude,
                  position.longitude,
                ),
                zoom: 16,
              ),
            ),
          );
        },

        child: const Icon(
          Icons.my_location,
        ),
      ),
    );
  }

  Future<void> getCurrentLocation() async {

    LocationPermission permission =
        await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission =
          await Geolocator.requestPermission();
    }

    Position position =
        await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );

    currentLocation = LatLng(
      position.latitude,
      position.longitude,
    );

    markers.clear();

    markers.add(
      Marker(
        markerId: const MarkerId("me"),
        position: currentLocation,
        infoWindow: const InfoWindow(
          title: "You are here",
        ),
      ),
    );

    markers.add(
      const Marker(
        markerId: MarkerId("hotel1"),
        position: LatLng(
          30.4598,
          78.0644,
        ),
        infoWindow: InfoWindow(
          title: "Luxury Resort",
          snippet: "Mussoorie",
        ),
      ),
    );

    setState(() {
      loading = false;
    });

    mapController?.animateCamera(
      CameraUpdate.newLatLngZoom(
        currentLocation,
        15,
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    getCurrentLocation();
  }
}