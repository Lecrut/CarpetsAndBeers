import 'package:app/navigation/app_bar.dart';
import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class AddressPage extends StatefulWidget {
  const AddressPage({super.key});

  @override
  State<AddressPage> createState() => _AddressPageState();
}

class _AddressPageState extends State<AddressPage> {
  final streetController = TextEditingController();
  final houseNumController = TextEditingController();
  final apartmentNumController = TextEditingController();
  final cityController = TextEditingController();
  final zipCodeController = TextEditingController();

  final ValueNotifier<bool> isFormValid = ValueNotifier(false);

  @override
  void initState() {
    super.initState();
    streetController.addListener(_validateForm);
    houseNumController.addListener(_validateForm);
    cityController.addListener(_validateForm);
    zipCodeController.addListener(_validateForm);
  }

  void _validateForm() {
    isFormValid.value = streetController.text.isNotEmpty &&
        houseNumController.text.isNotEmpty &&
        cityController.text.isNotEmpty &&
        zipCodeController.text.isNotEmpty;
  }

  @override
  void dispose() {
    streetController.dispose();
    houseNumController.dispose();
    apartmentNumController.dispose();
    cityController.dispose();
    zipCodeController.dispose();
    isFormValid.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isKeyboardVisible = MediaQuery.of(context).viewInsets.bottom != 0;

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsets.only(left: 50.0),
              child: Text(
                "Finalizacja",
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.green,
                  fontSize: 32.0,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(0, 0, 42, 0),
              child: Divider(
                color: Colors.green,
                thickness: 4.0,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            minHeight: MediaQuery.of(context).size.height - kToolbarHeight,
          ),
          child: IntrinsicHeight(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: SizedBox(
                    width: double.infinity,
                    child: TextField(
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        hintText: 'Ulica',
                      ),
                      textAlign: TextAlign.left,
                      controller: streetController,
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: TextField(
                    decoration: InputDecoration(
                      border: const OutlineInputBorder(),
                      hintText: "Numer domu",
                    ),
                    keyboardType: TextInputType.visiblePassword,
                    textInputAction: TextInputAction.done,
                    textAlign: TextAlign.left,
                    controller: houseNumController,
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: TextField(
                    decoration: InputDecoration(
                      border: const OutlineInputBorder(),
                      hintText: "Numer mieszkania (opcjonalnie)",
                    ),
                    keyboardType: TextInputType.visiblePassword,
                    textInputAction: TextInputAction.done,
                    textAlign: TextAlign.left,
                    controller: apartmentNumController,
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: TextField(
                    decoration: InputDecoration(
                      border: const OutlineInputBorder(),
                      hintText: "Miasto",
                    ),
                    keyboardType: TextInputType.visiblePassword,
                    textInputAction: TextInputAction.done,
                    textAlign: TextAlign.left,
                    controller: cityController,
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: TextField(
                    decoration: InputDecoration(
                      border: const OutlineInputBorder(),
                      hintText: "Kod pocztowy",
                    ),
                    keyboardType: TextInputType.visiblePassword,
                    textInputAction: TextInputAction.done,
                    textAlign: TextAlign.left,
                    controller: zipCodeController,
                  ),
                ),
                if (!isKeyboardVisible) const Spacer(),
                ValueListenableBuilder<bool>(
                  valueListenable: isFormValid,
                  builder: (context, isValid, child) {
                    return Container(
                      width: 300,
                      height: 48,
                      margin: const EdgeInsets.only(top: 30.0, bottom: 30.0),
                      child: ElevatedButton(
                        onPressed: isValid ? () {} : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          foregroundColor: Colors.white,
                        ),
                        child: Text("Następny krok"),
                      ),
                    );
                  },
                ),
                const Spacer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
