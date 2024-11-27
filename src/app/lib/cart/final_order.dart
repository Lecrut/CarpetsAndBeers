import 'package:app/navigation/bottom_navigation.dart';
import 'package:flutter/material.dart';

class FinalOrderPage extends StatefulWidget {
  @override
  _FinalOrderPageState createState() => _FinalOrderPageState();
}

class _FinalOrderPageState extends State<FinalOrderPage> {
  int _currentStep = 0;
  bool _isComplete = false;
  final _addressController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  void _nextStep() {
    if (_currentStep < 2) {
      setState(() {
        _currentStep += 1;
      });
    } else {
      setState(() {
        _isComplete = true;
      });
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      setState(() {
        _currentStep -= 1;
      });
    }
  }

  void _submitOrder() {
    if (_formKey.currentState!.validate()) {
      // Perform payment processing (e.g., integration with PayPal)
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Order Confirmed'),
            content: Text('Your order has been placed successfully!'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  setState(() {
                    _isComplete = false;
                    _currentStep = 0;
                  });
                },
                child: Text('OK'),
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ZŁóż zamówienie'),
        automaticallyImplyLeading: false,
      ),
      body: _isComplete
          ? Center(
              child: Text(
                'Thank you for your order!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            )
          : Stepper(
              currentStep: _currentStep,
              onStepContinue: _nextStep,
              onStepCancel: _previousStep,
              steps: [
                Step(
                  title: Text('Enter Address'),
                  content: Form(
                    key: _formKey,
                    child: TextFormField(
                      controller: _addressController,
                      decoration: InputDecoration(
                        labelText: 'Address',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your address';
                        }
                        return null;
                      },
                    ),
                  ),
                  isActive: _currentStep == 0,
                  state:
                      _currentStep > 0 ? StepState.complete : StepState.indexed,
                ),
                Step(
                  title: Text('Review Order'),
                  content: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Address: ${_addressController.text}'),
                      // Add other order details here
                    ],
                  ),
                  isActive: _currentStep == 1,
                  state:
                      _currentStep > 1 ? StepState.complete : StepState.indexed,
                ),
                Step(
                  title: Text('Payment'),
                  content: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ElevatedButton(
                        onPressed: _submitOrder,
                        child: Text('Pay with PayPal'),
                      ),
                    ],
                  ),
                  isActive: _currentStep == 2,
                  state: _currentStep == 2
                      ? StepState.indexed
                      : StepState.disabled,
                ),
              ],
            ),
      bottomNavigationBar: const BottomMenu(),
    );
  }
}
