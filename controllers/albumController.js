const Album = require('../models/Album');

// Get all albums
exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find({}, {
      id: 1,
      name: 1,
      description: 1,
      coverUrl: 1,
      imageCount: 1,
      createdAt: 1,
      _id: 0
    });
    res.status(200).json(albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ message: 'Error fetching albums', error: error.message });
  }
};

// Get album by ID
exports.getAlbumById = async (req, res) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findOne({ id: albumId }, { _id: 0, __v: 0 });
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    res.status(200).json(album);
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).json({ message: 'Error fetching album', error: error.message });
  }
};

// Create a new album
exports.createAlbum = async (req, res) => {
  try {
    const albumData = req.body;
    
    // Check if album with this ID already exists
    const existingAlbum = await Album.findOne({ id: albumData.id });
    if (existingAlbum) {
      return res.status(400).json({ message: 'Album with this ID already exists' });
    }
    
    // Find the cover image and set coverUrl
    if (albumData.images && albumData.images.length > 0 && albumData.coverId) {
      const coverImage = albumData.images.find(img => img.id === albumData.coverId);
      if (coverImage) {
        albumData.coverUrl = coverImage.url;
      }
    }
    
    // Set imageCount
    if (albumData.images) {
      albumData.imageCount = albumData.images.length;
    }
    
    const newAlbum = new Album(albumData);
    await newAlbum.save();
    
    res.status(201).json(newAlbum);
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).json({ message: 'Error creating album', error: error.message });
  }
};

// Update an album
exports.updateAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const updateData = req.body;
    
    const album = await Album.findOne({ id: albumId });
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    // Update the album
    const updatedAlbum = await Album.findOneAndUpdate(
      { id: albumId },
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedAlbum);
  } catch (error) {
    console.error('Error updating album:', error);
    res.status(500).json({ message: 'Error updating album', error: error.message });
  }
};

// Delete an album
exports.deleteAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    
    const album = await Album.findOne({ id: albumId });
    
    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }
    
    await Album.findOneAndDelete({ id: albumId });
    
    res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ message: 'Error deleting album', error: error.message });
  }
}; 