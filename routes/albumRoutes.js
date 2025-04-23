const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

// Get all albums
router.get('/', albumController.getAlbums);

// Get album by ID
router.get('/:albumId', albumController.getAlbumById);

// Create a new album
router.post('/', albumController.createAlbum);

// Update an album
router.put('/:albumId', albumController.updateAlbum);

// Delete an album
router.delete('/:albumId', albumController.deleteAlbum);

module.exports = router; 