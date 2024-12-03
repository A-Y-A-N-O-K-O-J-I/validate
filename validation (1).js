const express = require('express');
const PhoneNumber = require('awesome-phonenumber');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Validation endpoint
app.post('/validate', (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({
      valid: false,
      message: 'Phone number is required.',
    });
  }

  const pn = new PhoneNumber(number);
  if (pn.isValid()) {
    return res.json({
      valid: true,
      formatted: pn.getNumber('international'),
    });
  } else {
    return res.json({
      valid: false,
      message: 'Invalid phone number. Ensure it starts with "+" and includes the correct country code.',
    });
  }
});

const PORT = process.env.PORT || 4000; // Use a different port to avoid conflict
app.listen(PORT, () => {
  console.log(`Validation service running on port ${PORT}`);
});