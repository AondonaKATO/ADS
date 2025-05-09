
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  let paymentAmount = 100000; // Default

  document.addEventListener("DOMContentLoaded", function () {
    const courseName = getQueryParam("course") || "No course selected";
    const price = parseFloat(getQueryParam("price")) || 100000;

    paymentAmount = price;

    document.getElementById("course").value = courseName;
    document.getElementById("amountText").textContent = `Amount: ₦${price.toLocaleString()}`;
  });

  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('signup').style.display = 'none';
    document.getElementById('payment').style.display = 'block';
  });

  document.getElementById('monnifyPaymentButton').addEventListener('click', function () {
    MonnifySDK.initialize({
      amount: paymentAmount,
      currency: "NGN",
      reference: "REF" + Math.floor(Math.random() * 1000000000),
      customerName: document.getElementById('name').value,
      customerEmail: document.getElementById('email').value,
      apiKey: "MK_TEST_H8TSJGZFDN",
      contractCode: "2100482480",   
      paymentDescription: "Course Payment",
      onComplete: function (response) {
        if (response.paymentReference) {
          alert('Payment successful! Reference: ' + response.paymentReference);
          document.getElementById('payment').style.display = 'none';
          document.getElementById('confirmation').style.display = 'block';
          document.getElementById('groupLinkContainer').innerHTML =
          '<a href="https://example.com/learning-group" target="_blank">Join Learning Group</a>';
        } else {
          alert('Payment not completed. Please try again.');
        }
      },
      onClose: function () {
        alert('Payment window closed.');
      }
    });
  });


  // Paystack Payment Integration
  document.getElementById('paystackPaymentButton').addEventListener('click', function() {
            var handler = PaystackPop.setup({
                key: 'pk_live_7f19625c635acb208369ad30633503152c8b4855', // Replace with your Paystack public key
                email: document.getElementById('email').value, // Customer's email
                amount: 10000000, // Amount in kobo (e.g., 100 NGN = 10000 kobo)
                currency: 'NGN',
                callback: function(response) {
                    alert('Payment successful! Transaction reference: ' + response.reference);
                    document.getElementById('payment').style.display = 'none';
                    document.getElementById('confirmation').style.display = 'block';
                    document.getElementById('groupLinkContainer').innerHTML =
  '<a href="https://example.com/learning-group" target="_blank">Join Learning Group</a>';

                },
                onClose: function() {
                    alert('Payment window closed. Payment not completed.');
                }
            });
            handler.openIframe();
        });

  function printReceipt() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const receiptContent = `
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { text-align: center; font-family: Arial, sans-serif; }
          .watermark {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.2;
            z-index: -1;
          }
        </style>
      </head>
      <body>
        <img src="assets/img/log.png" class="watermark" width="300" height="300" />
        <h2>Payment Receipt</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Amount Paid:</strong> ₦${paymentAmount.toLocaleString()}</p>
        <p>Thank you for your payment!</p>
      </body>
      </html>
    `;
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  }
