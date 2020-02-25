const router = require('express').Router();
let Donation = require('../models/donation.model');

router.route('/').get((req, res) => {
  Donation.find()
    .then(donations => res.json(donations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/queue').get((req, res) => {
  Donation.find({played: false})
    .then(donations => res.json(donations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const message = req.body.message;
  const amount = Number(req.body.amount);
  const media_url = req.body.media_url;
  const start_time = Number(req.body.start_time);

  const newDonation = new Donation({
    username,
    message,
    amount,
    media_url,
    start_time
  });

  newDonation.save()
  .then(() => res.json('Donation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Donation.findById(req.params.id)
    .then(donation => res.json(donation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Donation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Donation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Donation.findById(req.params.id)
    .then(donation => {

      donation.username = req.body.username;
      donation.message = req.body.message;
      donation.amount = Number(req.body.amount);
      donation.media_url = req.body.media_url;
      donation.start_time = Number(req.body.start_time);
      donation.played = req.body.played;


      donation.save()
        .then(() => res.json('Donation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;