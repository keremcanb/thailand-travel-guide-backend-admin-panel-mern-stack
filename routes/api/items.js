const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Location = require('../../models/Location');
const Category = require('../../models/Category');
const Place = require('../../models/Place');

// @route    GET api/items
// @desc     Get all items
// @access   Public
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/items/:id
// @desc     Get item by ID
// @access   Public
router.get('/locations/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/places/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    res.json(place);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/items
// @desc     Create an item
// @access   Private
router.post(
  '/locations',
  auth,
  [check('title', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newLocation = new Location(req.body);
      const location = await newLocation.save();
      res.json(location);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post('/categories', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/places', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newPlace = new Place(req.body);
    const place = await newPlace.save();
    res.json(place);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PATCH api/items/:id
// @desc     Patch item by ID
// @access   Private
router.patch('/locations/:id', auth, async (req, res) => {
  try {
    await Location.findByIdAndUpdate(req.params.id, req.body);
    res.json('Location updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.patch('/categories/:id', auth, async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json('Category updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.patch('/places/:id', auth, async (req, res) => {
  try {
    await Place.findByIdAndUpdate(req.params.id, req.body);
    res.json('Place updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/items/:id
// @desc     Delete an item
// @access   Private
router.delete('/locations/:id', auth, async (req, res) => {
  try {
    await Location.findByIdAndRemove(req.params.id);
    res.status(200).json('Location deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/categories/:id', auth, async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).json('Category deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/places/:id', auth, async (req, res) => {
  try {
    await Place.findByIdAndRemove(req.params.id);
    res.status(200).json('Place deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
